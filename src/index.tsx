import React, { Component } from "react";
import PropTypes from "prop-types";

import type {
  NiceAvatarProps,
  GestureName,
  LookingDirection,
  EmoteFxName,
  LookAtMode,
  AvatarRefHandle,
} from "./types";

import { genConfig, defaultOptions } from "./utils";
import { applyExpression, getFeatureOffsets } from "./expression";
import { ensureAnimationStyles, motionAllowed } from "./animations";
import { addPercent } from "./feature";

import Face from "./face";
import Hair from "./hair";
import Hat from "./hat";
import Ear from "./ear";
import Eyebrow from "./eyebrow";
import Eye from "./eyes";
import Glasses from "./glasses";
import Nose from "./nose";
import Mouth from "./mouth";
import Shirt from "./shirt";
import EmoteFx from "./fx";

type SleepStage = "awake" | "drowsy" | "asleep";

/** A temporary expression override, optionally with a head pose. */
type Flash = { expression: string; pose?: "yawn" | "startle" } | null;

type LifeState = {
  gesture: GestureName | null;
  looking: LookingDirection;
  /** Normalized pointer position (-1..1) while tracking. */
  pointer: { x: number; y: number } | null;
  flash: Flash;
  sleep: SleepStage;
  /** Briefly true after a startle/excitement; speeds up the idle sway. */
  aroused: boolean;
  /** Talking state driven by the ref `talk(ms)` method. */
  talking: boolean;
  /** Active comic / anime emote overlay badge. */
  activeFx: EmoteFxName | null;
};

type Timeout = ReturnType<typeof setTimeout>;

const safeClearTimeout = (timer?: Timeout | null) => {
  if (timer) clearTimeout(timer);
};

/** Inline animation durations, mirrored for the animationend fallback below. */
const GESTURE_DURATIONS: Record<GestureName, number> = {
  nod: 950,
  shake: 720,
  sneeze: 1150,
  squash: 560,
};

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

export default class ReactNiceAvatar
  extends Component<NiceAvatarProps, LifeState>
  implements AvatarRefHandle
{
  static propTypes = {
    id: PropTypes.string,
    className: PropTypes.string,
    style: PropTypes.object,
    shape: PropTypes.oneOf(["circle", "rounded", "square"]),
    sex: PropTypes.oneOf(defaultOptions.sex),
    faceColor: PropTypes.string,
    earSize: PropTypes.oneOf(defaultOptions.earSize),
    hairColor: PropTypes.string,
    hairStyle: PropTypes.oneOf(
      (defaultOptions.hairStyleMan as string[]).concat(defaultOptions.hairStyleWoman as string[]),
    ),
    hatColor: PropTypes.string,
    hatStyle: PropTypes.oneOf(defaultOptions.hatStyle),
    hairColorRandom: PropTypes.bool,
    eyeStyle: PropTypes.oneOf(defaultOptions.eyeStyle),
    glassesStyle: PropTypes.oneOf(defaultOptions.glassesStyle),
    noseStyle: PropTypes.oneOf(defaultOptions.noseStyle),
    mouthStyle: PropTypes.oneOf(defaultOptions.mouthStyle),
    shirtStyle: PropTypes.oneOf(defaultOptions.shirtStyle),
    shirtColor: PropTypes.string,
    bgColor: PropTypes.string,
    isGradient: PropTypes.bool,
    expression: PropTypes.oneOf([
      "neutral",
      "happy",
      "excited",
      "surprised",
      "sad",
      "disappointed",
      "exhausted",
      "angry",
      "shy",
      "sleepy",
      "focused",
    ]),
    animated: PropTypes.bool,
    idle: PropTypes.bool,
    gesture: PropTypes.oneOf(["nod", "shake", "sneeze", "squash"]),
    lookAt: PropTypes.oneOf(["none", "hover", "global", "center"]),
    lookAtCursor: PropTypes.bool,
    agentState: PropTypes.oneOf([
      "idle",
      "listening",
      "thinking",
      "speaking",
      "celebrating",
      "confused",
      "error",
      "focused",
      "executing",
      "tool_call",
    ]),
    sentiment: PropTypes.oneOf([
      "neutral",
      "joy",
      "curiosity",
      "confusion",
      "concern",
      "amusement",
      "surprise",
    ]),
    fx: PropTypes.oneOf([
      "idea",
      "zzz",
      "sweat",
      "sparkle",
      "anger",
      "question",
      "exclamation",
      "heart",
      "gear",
    ]),
    secondaryMotion: PropTypes.bool,
    talking: PropTypes.bool,
    sleepAfter: PropTypes.number,
  };

  private containerRef = React.createRef<HTMLDivElement>();

  state: LifeState = {
    gesture: null,
    looking: "center",
    pointer: null,
    flash: null,
    sleep: "awake",
    aroused: false,
    talking: false,
    activeFx: null,
  };

  // Handles for the setTimeout chains driving the life behaviors, so
  // unmounting (or a new gesture) can cancel whatever is pending.
  private sleepTimer: Timeout | null = null;
  private flashTimer: Timeout | null = null;
  private arousalTimer: Timeout | null = null;
  private talkTimer: Timeout | null = null;
  private fxTimer: Timeout | null = null;
  private pointerSettleTimer: Timeout | null = null;
  private sneezeTimers: Timeout[] = [];
  private doubleTakeTimers: Timeout[] = [];
  private gestureFallbackTimer: Timeout | null = null;
  private lastPointerUpdate = 0;

  componentDidMount() {
    if (this.props.gesture) {
      this.playGesture(this.props.gesture);
    }
    if (this.props.fx) {
      this.setState({ activeFx: this.props.fx });
    }
    // Notice when the user comes back to the tab (attention behavior).
    document.addEventListener("visibilitychange", this.handleVisibilityChange);
    this.armSleepTimer();

    if (this.effectiveLookAt() === "global") {
      this.bindGlobalPointer();
    }
  }

  componentDidUpdate(prevProps: NiceAvatarProps) {
    if (this.props.gesture && this.props.gesture !== prevProps.gesture) {
      this.playGesture(this.props.gesture);
    }
    if (this.props.fx !== prevProps.fx) {
      this.setState({ activeFx: this.props.fx ?? null });
    }
    const hadPulse = prevProps.animated || prevProps.idle;
    const hasPulse = this.props.animated || this.props.idle;
    if (hasPulse !== hadPulse) {
      if (hasPulse) {
        this.armSleepTimer();
      } else {
        safeClearTimeout(this.sleepTimer);
        if (this.state.sleep !== "awake") this.setState({ sleep: "awake" });
      }
    }

    const prevLook = prevProps.lookAt ?? (prevProps.lookAtCursor ? "hover" : "none");
    const currLook = this.effectiveLookAt();
    if (prevLook !== currLook) {
      if (currLook === "global") {
        this.bindGlobalPointer();
      } else {
        this.unbindGlobalPointer();
      }
    }
  }

  componentWillUnmount() {
    document.removeEventListener("visibilitychange", this.handleVisibilityChange);
    this.unbindGlobalPointer();
    safeClearTimeout(this.sleepTimer);
    safeClearTimeout(this.flashTimer);
    safeClearTimeout(this.arousalTimer);
    safeClearTimeout(this.talkTimer);
    safeClearTimeout(this.fxTimer);
    safeClearTimeout(this.pointerSettleTimer);
    this.sneezeTimers.forEach(safeClearTimeout);
    this.doubleTakeTimers.forEach(safeClearTimeout);
    safeClearTimeout(this.gestureFallbackTimer);
  }

  private effectiveLookAt(): LookAtMode {
    if (this.props.lookAt) return this.props.lookAt;
    if (this.props.lookAtCursor) return "hover";
    return "none";
  }

  private bindGlobalPointer() {
    if (typeof window !== "undefined") {
      window.addEventListener("pointermove", this.handleGlobalPointerMove, { passive: true });
    }
  }

  private unbindGlobalPointer() {
    if (typeof window !== "undefined") {
      window.removeEventListener("pointermove", this.handleGlobalPointerMove);
    }
  }

  private handleGlobalPointerMove = (e: PointerEvent) => {
    if (this.effectiveLookAt() !== "global") return;
    const now = Date.now();
    if (now - this.lastPointerUpdate < 40) return;
    this.lastPointerUpdate = now;

    const node = this.containerRef.current;
    if (!node) return;

    const rect = node.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    const halfW = Math.max(window.innerWidth / 2, 200);
    const halfH = Math.max(window.innerHeight / 2, 200);

    const x = clamp((e.clientX - cx) / halfW, -1, 1);
    const y = clamp((e.clientY - cy) / halfH, -1, 1);

    this.bumpActivity();
    this.setState({ pointer: { x, y } });

    // Smoothly settle gaze back to center after 3.5s of no pointer movement
    safeClearTimeout(this.pointerSettleTimer);
    this.pointerSettleTimer = setTimeout(() => {
      this.setState({ pointer: { x: 0, y: 0 } });
    }, 3500);
  };

  /** Play a one-shot nod. Available via ref: `<NiceAvatar ref={ref} />` → `ref.current.nod()`. */
  nod = () => this.playGesture("nod");

  /** Play a one-shot head shake. Available via ref: `ref.current.shake()`. */
  shake = () => this.playGesture("shake");

  /** A full sneeze: a squinting wind-up, then a sharp burst. */
  sneeze = () => {
    this.playGesture("sneeze");
    this.sneezeTimers.forEach(safeClearTimeout);
    this.sneezeTimers = [];
    this.flash("sneezing", 480);
    this.sneezeTimers.push(setTimeout(() => this.flash("yawn", 420), 480));
  };

  /** Squash-and-stretch: the whole body compresses and springs back. */
  squash = () => this.playGesture("squash");

  /** Glance away, then snap back to center like something just registered. */
  doubleTake = () => {
    this.doubleTakeTimers.forEach(safeClearTimeout);
    this.doubleTakeTimers = [];
    this.setState({ looking: "left" });
    this.doubleTakeTimers.push(
      setTimeout(() => {
        this.setState({ looking: "center" });
        this.flash("surprised", 620, "startle");
      }, 380),
    );
  };

  /** Babble for a while: the mouth cycles speech-like shapes irregularly. */
  talk = (duration = 3200) => {
    safeClearTimeout(this.talkTimer);
    if (duration <= 0) {
      this.setState({ talking: false });
      return;
    }
    this.setState({ talking: true });
    this.talkTimer = setTimeout(() => this.setState({ talking: false }), duration);
  };

  stopTalking = () => {
    safeClearTimeout(this.talkTimer);
    if (this.state.talking) this.setState({ talking: false });
  };

  /**
   * Hold a head turn until called again; `turn()` or `turn("center")` releases
   * it. The eyes lead the turn slightly, the head follows.
   */
  turn = (direction: LookingDirection = "center") => this.setState({ looking: direction });

  /** Trigger an animated comic / anime emote overlay badge. */
  showFx = (fx: EmoteFxName, duration = 2500) => {
    safeClearTimeout(this.fxTimer);
    this.setState({ activeFx: fx });
    if (duration > 0) {
      this.fxTimer = setTimeout(() => this.setState({ activeFx: null }), duration);
    }
  };

  clearFx = () => {
    safeClearTimeout(this.fxTimer);
    this.setState({ activeFx: null });
  };

  wake = () => {
    this.bumpActivity();
  };

  sleep = () => {
    safeClearTimeout(this.sleepTimer);
    this.setState({ sleep: "asleep" });
  };

  private playGesture(gesture: GestureName) {
    this.bumpActivity();
    safeClearTimeout(this.gestureFallbackTimer);
    this.setState({ gesture: null }, () => {
      this.setState({ gesture });
      this.gestureFallbackTimer = setTimeout(() => {
        if (this.state.gesture === gesture) this.completeGesture(gesture);
      }, GESTURE_DURATIONS[gesture] + 250);
    });
  }

  private completeGesture(gesture: GestureName) {
    safeClearTimeout(this.gestureFallbackTimer);
    this.setState({ gesture: null });
    if (!motionAllowed()) return;
    if (gesture === "nod" && Math.random() < 0.3) {
      this.flash("happy", 800);
    } else if (gesture === "shake" && Math.random() < 0.4) {
      this.flash("disappointed", 900);
    } else if (gesture === "sneeze") {
      this.flash("exhausted", 700);
    }
  }

  private handleAnimationEnd = (e: React.AnimationEvent<HTMLDivElement>) => {
    if (e.animationName === "rna-nod") {
      this.completeGesture("nod");
    } else if (e.animationName === "rna-shake") {
      this.completeGesture("shake");
    } else if (e.animationName === "rna-sneeze") {
      this.completeGesture("sneeze");
    } else if (e.animationName === "rna-squash") {
      this.completeGesture("squash");
    }
  };

  private bumpActivity = () => {
    this.armSleepTimer();
    if (this.state.sleep !== "awake") {
      this.setState({ sleep: "awake" });
      this.flash("surprised", 900, "startle");
      this.arouse();
    }
  };

  private handleVisibilityChange = () => {
    if (document.visibilityState === "visible" && (this.props.idle || this.props.animated)) {
      this.bumpActivity();
    }
  };

  private handlePointerMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (this.effectiveLookAt() !== "hover") return;
    const now = Date.now();
    if (now - this.lastPointerUpdate < 60) return;
    this.lastPointerUpdate = now;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = clamp(((e.clientX - rect.left) / rect.width) * 2 - 1, -1, 1);
    const y = clamp(((e.clientY - rect.top) / rect.height) * 2 - 1, -1, 1);
    this.bumpActivity();
    const prev = this.state.pointer;
    if (!prev || Math.abs(prev.x - x) > 0.02 || Math.abs(prev.y - y) > 0.02) {
      this.setState({ pointer: { x, y } });
    }
  };

  private handlePointerLeave = () => {
    if (this.effectiveLookAt() === "hover") {
      this.bumpActivity();
      if (this.state.pointer !== null) this.setState({ pointer: null });
    }
  };

  private armSleepTimer() {
    safeClearTimeout(this.sleepTimer);
    if (!(this.props.idle || this.props.animated)) return;
    const delay = this.props.sleepAfter ?? 60000;
    this.sleepTimer = setTimeout(() => {
      this.setState({ sleep: "drowsy" });
      this.flash("yawn", 1100, "yawn");
      this.sleepTimer = setTimeout(() => {
        this.setState({ sleep: "asleep" });
        this.flash("yawn", 1100, "yawn");
      }, 20000);
    }, delay);
  }

  private flash(expression: string, duration: number, pose?: "yawn" | "startle") {
    safeClearTimeout(this.flashTimer);
    this.setState({ flash: { expression, pose } });
    this.flashTimer = setTimeout(() => this.setState({ flash: null }), duration);
  }

  private arouse() {
    safeClearTimeout(this.arousalTimer);
    this.setState({ aroused: true });
    this.arousalTimer = setTimeout(() => this.setState({ aroused: false }), 3800);
  }

  render() {
    const {
      id,
      className,
      style,
      shape = "circle",
      hairColorRandom = false,
      animated = false,
      idle = false,
      agentState = "idle",
      sentiment = "neutral",
      secondaryMotion = true,
    } = this.props;

    const { gesture, looking, pointer, flash, sleep, aroused, activeFx } = this.state;
    // An explicit `talking` prop wins; otherwise the mouth talks while the
    // agent is speaking or while a `talk(ms)` call is in flight.
    const talking = this.props.talking ?? (this.state.talking || agentState === "speaking");

    const base = genConfig(this.props) as any;

    // Sentiment to expression mapping
    let sentimentExpression: string | null = null;
    if (sentiment === "joy" || sentiment === "amusement") {
      sentimentExpression = "happy";
    } else if (sentiment === "curiosity") {
      sentimentExpression = "excited";
    } else if (sentiment === "confusion" || sentiment === "surprise") {
      sentimentExpression = "surprised";
    } else if (sentiment === "concern") {
      sentimentExpression = "sad";
    }

    // Agent state to expression mapping
    let agentExpression: string | null = null;
    if (agentState === "thinking") {
      agentExpression = "neutral";
    } else if (agentState === "listening") {
      agentExpression = "happy";
    } else if (agentState === "celebrating") {
      agentExpression = "happy";
    } else if (agentState === "confused") {
      agentExpression = "surprised";
    } else if (agentState === "error") {
      agentExpression = "disappointed";
    } else if (
      agentState === "focused" ||
      agentState === "executing" ||
      agentState === "tool_call"
    ) {
      agentExpression = "focused";
    }

    // Reaction flash > sleep cycle > sentiment > agentState > configured expression
    const shownExpression =
      flash?.expression ??
      (sleep === "asleep"
        ? "sleepy"
        : sleep === "drowsy"
          ? "drowsy"
          : (sentimentExpression ?? agentExpression ?? base.expression));

    const config = applyExpression({ ...base, expression: shownExpression });
    const offsets = getFeatureOffsets(shownExpression);
    const isFocused =
      agentState === "focused" ||
      agentState === "executing" ||
      agentState === "tool_call" ||
      shownExpression === "focused";

    const breathe = animated || idle;
    if (breathe || gesture || activeFx || this.props.fx || agentState !== "idle") {
      ensureAnimationStyles();
    }

    // Background shape
    let borderRadius;
    switch (shape) {
      case "circle": {
        borderRadius = "100%";
        break;
      }
      case "rounded": {
        borderRadius = "6px";
        break;
      }
      case "square": {
        borderRadius = 0;
        break;
      }
    }

    // Where the eyes look:
    // If agent is thinking, shift eyes upward and to the right
    let eyeShift = "0%";
    let eyeShiftY: string | undefined = undefined;
    let browShift = "0%";

    if (agentState === "thinking") {
      eyeShift = "2.4%";
      eyeShiftY = "-2.2%";
      browShift = "1.2%";
    } else if (
      agentState === "focused" ||
      agentState === "executing" ||
      agentState === "tool_call"
    ) {
      eyeShift = "0%";
      eyeShiftY = "1.8%";
      browShift = "0%";
    } else if (pointer) {
      eyeShift = `${(pointer.x * 2.2).toFixed(2)}%`;
      eyeShiftY = `${(pointer.y * 1.2).toFixed(2)}%`;
      browShift = `${(pointer.x * 1.3).toFixed(2)}%`;
    } else if (looking === "left") {
      eyeShift = "-2.2%";
      browShift = "-1.3%";
    } else if (looking === "right") {
      eyeShift = "2.2%";
      browShift = "1.3%";
    }

    const headStyle: React.CSSProperties = {
      position: "absolute",
      left: 0,
      top: 0,
      width: "100%",
      height: "100%",
      transformOrigin: "50% 88%",
      transition: "transform 480ms cubic-bezier(0.34, 1.3, 0.64, 1)",
    };

    if (gesture === "nod") {
      headStyle.animation = "rna-nod 950ms ease-in-out";
    } else if (gesture === "shake") {
      headStyle.animation = "rna-shake 720ms ease-in-out";
    } else if (gesture === "sneeze") {
      headStyle.animation = "rna-sneeze 1150ms ease-in-out";
    } else if (agentState === "listening") {
      headStyle.animation = "rna-listening-nod 4.2s ease-in-out infinite";
      headStyle.transform = "translateY(-0.6%) rotate(1.2deg)";
    } else if (agentState === "speaking") {
      headStyle.animation = "rna-speech-bob 1.4s ease-in-out infinite";
    } else if (agentState === "thinking") {
      headStyle.transform = "translateY(-1.2%) rotate(-3.5deg) translateX(1%)";
    } else if (
      agentState === "focused" ||
      agentState === "executing" ||
      agentState === "tool_call"
    ) {
      headStyle.transform = "translateY(1.4%) rotate(-0.8deg)";
    } else if (agentState === "confused") {
      headStyle.transform = "rotate(6deg) translateY(0.5%)";
    } else if (flash?.pose === "yawn") {
      headStyle.transform = "translateY(-0.7%) rotate(-1.5deg)";
    } else if (flash?.pose === "startle") {
      headStyle.transform = "translateY(-0.9%)";
    } else if (sleep === "asleep") {
      headStyle.transform = "translateY(1.6%) rotate(2.5deg)";
    } else if (sleep === "drowsy") {
      headStyle.transform = "translateY(0.8%) rotate(1.5deg)";
    } else if (pointer) {
      headStyle.transform = `rotate(${(pointer.x * 4).toFixed(2)}deg) translate(${(
        pointer.x * 1.2
      ).toFixed(2)}%, ${(pointer.y * 0.9).toFixed(2)}%)`;
    } else if (looking === "left") {
      headStyle.transform = "rotate(-5deg) translateX(-1.6%)";
    } else if (looking === "right") {
      headStyle.transform = "rotate(5deg) translateX(1.6%)";
    }

    // Breathing tempo reacts to state:
    const swayDuration =
      sleep === "asleep"
        ? "11s"
        : sleep === "drowsy"
          ? "8s"
          : agentState === "thinking"
            ? "7.2s"
            : agentState === "focused" || agentState === "executing" || agentState === "tool_call"
              ? "4.5s"
              : aroused || agentState === "speaking"
                ? "3.2s"
                : "5.6s";

    const squashStyle: React.CSSProperties = {
      position: "relative",
      width: "100%",
      height: "100%",
      transformOrigin: "50% 96%",
      ...(gesture === "squash" || agentState === "celebrating"
        ? { animation: "rna-squash 560ms ease-in-out" }
        : {}),
    };

    // Hair secondary motion
    const hairContainerStyle: React.CSSProperties = {
      position: "absolute",
      left: 0,
      top: 0,
      width: "100%",
      height: "100%",
      transformOrigin: "50% 12%",
      transition: "transform 480ms cubic-bezier(0.34, 1.4, 0.64, 1)",
    };
    if (secondaryMotion) {
      if (gesture === "nod") {
        hairContainerStyle.animation = "rna-hair-nod 950ms ease-in-out";
      } else if (gesture === "shake") {
        hairContainerStyle.animation = "rna-hair-shake 720ms ease-in-out";
      } else if (gesture === "sneeze") {
        hairContainerStyle.animation = "rna-hair-sneeze 1150ms ease-in-out";
      } else if (breathe) {
        hairContainerStyle.animation = `rna-hair-sway ${swayDuration} ease-in-out infinite`;
      }
    }

    // Effective emote FX badge
    const effectiveFx =
      this.props.fx ??
      activeFx ??
      (sleep === "asleep" || sleep === "drowsy"
        ? "zzz"
        : agentState === "thinking"
          ? "idea"
          : agentState === "focused" || agentState === "executing" || agentState === "tool_call"
            ? "gear"
            : agentState === "confused"
              ? "question"
              : agentState === "error"
                ? "exclamation"
                : agentState === "celebrating"
                  ? "sparkle"
                  : null);

    return (
      <div
        id={id}
        ref={this.containerRef}
        className={className}
        style={{
          background: config.bgColor,
          overflow: "hidden",
          borderRadius,
          ...style,
        }}
        onMouseMove={this.handlePointerMove}
        onMouseLeave={this.handlePointerLeave}
        onClick={this.bumpActivity}
      >
        {/* Squash wrapper: a dedicated layer so poke physics never fight the
            sway or turn animations running on the layers inside it. */}
        <div style={squashStyle} onAnimationEnd={this.handleAnimationEnd}>
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "100%",
              ...(breathe
                ? {
                    animation: `rna-sway ${swayDuration} ease-in-out infinite`,
                    transformOrigin: "50% 92%",
                  }
                : {}),
            }}
          >
            <div
              style={{
                position: "absolute",
                bottom: 0,
                width: "100%",
                height: "90%",
                ...(animated ? { animation: "rna-turn 7.4s ease-in-out infinite" } : {}),
              }}
            >
              {/* Head group: everything above the shoulders gestures together;
                  the shirt below stays still. */}
              <div style={headStyle} onAnimationEnd={this.handleAnimationEnd}>
                <Face color={config.faceColor} />
                <Hat color={config.hatColor} style={config.hatStyle} />
                {config.hatStyle === "none" && (
                  <div style={hairContainerStyle}>
                    <Hair
                      color={config.hairColor}
                      style={config.hairStyle}
                      colorRandom={hairColorRandom}
                    />
                  </div>
                )}

                {/* Face detail */}
                <div
                  style={{
                    position: "absolute",
                    right: "-3%",
                    top: "30%",
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Eyebrow
                    style={config.eyeBrowStyle}
                    offsetY={offsets.eyebrow}
                    offsetX={browShift}
                  />
                  <Eye
                    style={config.eyeStyle}
                    offsetY={addPercent(offsets.eye, eyeShiftY)}
                    offsetX={eyeShift}
                    blink={breathe}
                    sleepy={sleep === "drowsy"}
                    saccade={
                      breathe &&
                      sleep === "awake" &&
                      !pointer &&
                      agentState !== "thinking" &&
                      !isFocused
                    }
                    scan={isFocused && breathe}
                  />
                  <Glasses style={config.glassesStyle} />
                  <Ear color={config.faceColor} size={config.earSize} />
                  <Nose style={config.noseStyle} />
                  <Mouth
                    style={config.mouthStyle}
                    offsetY={offsets.mouth}
                    move={animated && !talking}
                    talking={talking}
                  />
                </div>

                {/* Comic / Anime Emote FX Overlay */}
                <EmoteFx type={effectiveFx} />
              </div>

              <Shirt color={config.shirtColor} style={config.shirtStyle} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export { genConfig, defaultOptions } from "./utils";
export { useAvatarController } from "./useAvatarController";
export * from "./types";
