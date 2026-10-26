import React, { useEffect, useRef, useState } from "react";
import Avatar, { genConfig, useAvatarController } from "../../src";
import "./styles.css";

const EXPRESSIONS = [
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
];

const AGENT_STATES = [
  "idle",
  "listening",
  "thinking",
  "speaking",
  "focused",
  "celebrating",
  "confused",
  "error",
];

const EMOTE_FX = [
  { id: "idea", label: "💡 Idea" },
  { id: "gear", label: "⚙️ Tool Call" },
  { id: "zzz", label: "💤 Zzz" },
  { id: "sweat", label: "💧 Sweat" },
  { id: "sparkle", label: "✨ Sparkle" },
  { id: "anger", label: "💢 Anger" },
  { id: "question", label: "❓ Question" },
  { id: "exclamation", label: "❗️ Alert" },
  { id: "heart", label: "❤️ Heart" },
];

const CAPTIONS = {
  neutral: "Resting face. Blinks on request.",
  happy: "Smile eyes, smile mouth. Harmless.",
  excited: "Brows up, eyes wide, mouth open.",
  surprised: "Brows launched. Jaw follows.",
  sad: "Everything droops a little.",
  disappointed: "A flat line. In every sense.",
  exhausted: "Eyes closed. Do not disturb.",
  angry: "Brows down, teeth showing.",
  shy: "Squinty grin. Hiding something.",
  sleepy: "Half a blink from checked out.",
  focused: "Determined flat brow, scanning oval eyes. In the zone.",
};

const CURATED = {
  neutral: {
    sex: "man",
    faceColor: "#F9C9B6",
    hairColor: "#000000",
    hairStyle: "normal",
    bgColor: "#6BD9E9",
    shirtColor: "#F4D150",
  },
  happy: {
    sex: "woman",
    faceColor: "#AC6651",
    hairColor: "#77311D",
    hairStyle: "womanShort",
    bgColor: "#F4D150",
    shirtColor: "#FC909F",
  },
  excited: {
    sex: "man",
    faceColor: "#F9C9B6",
    hairColor: "#506AF4",
    hairStyle: "mohawk",
    bgColor: "#FFEBA4",
    shirtColor: "#6BD9E9",
  },
  surprised: {
    sex: "woman",
    faceColor: "#F9C9B6",
    hairColor: "#000000",
    hairStyle: "womanShort",
    bgColor: "#9287FF",
    shirtColor: "#F4D150",
  },
  sad: {
    sex: "man",
    faceColor: "#AC6651",
    hairColor: "#000000",
    hairStyle: "normal",
    bgColor: "#D2EFF3",
    shirtColor: "#9287FF",
  },
  disappointed: {
    sex: "woman",
    faceColor: "#F9C9B6",
    hairColor: "#FC909F",
    hairStyle: "womanShort",
    glassesStyle: "round",
    bgColor: "#506AF4",
    shirtColor: "#6BD9E9",
  },
  exhausted: {
    sex: "man",
    faceColor: "#F9C9B6",
    hairColor: "#77311D",
    hairStyle: "normal",
    bgColor: "#F48150",
    shirtColor: "#9287FF",
  },
  angry: {
    sex: "man",
    faceColor: "#AC6651",
    hairColor: "#000000",
    hairStyle: "mohawk",
    bgColor: "#FFEDEF",
    shirtColor: "#6BD9E9",
  },
  shy: {
    sex: "woman",
    faceColor: "#F9C9B6",
    hairColor: "#506AF4",
    hairStyle: "womanShort",
    bgColor: "#74D153",
    shirtColor: "#F4D150",
  },
  sleepy: {
    sex: "man",
    faceColor: "#AC6651",
    hairColor: "#000000",
    hairStyle: "normal",
    bgColor: "#E0DDFF",
    shirtColor: "#FC909F",
  },
  focused: {
    sex: "woman",
    faceColor: "#F9C9B6",
    hairColor: "#000000",
    hairStyle: "normal",
    glassesStyle: "square",
    bgColor: "#FFEBA4",
    shirtColor: "#506AF4",
  },
};

const CURATED_BASE = {
  hatStyle: "none",
  glassesStyle: "none",
  noseStyle: "round",
  earSize: "small",
  shirtStyle: "hoody",
};

const heroConfig = genConfig({
  sex: "woman",
  faceColor: "#F9C9B6",
  hairColor: "#000000",
  hairStyle: "womanLong",
  ...CURATED_BASE,
  shirtColor: "#F4D150",
  bgColor: "#9287FF",
});

const gridConfigs = Object.fromEntries(
  EXPRESSIONS.map((expression) => [
    expression,
    genConfig({ ...CURATED_BASE, ...CURATED[expression], expression }),
  ]),
);

export default function App() {
  const [preview, setPreview] = useState("happy");
  const [motion, setMotion] = useState("animated"); // off | idle | animated
  const [trackingMode, setTrackingMode] = useState("global"); // hover | global | none
  const [secondaryMotion, setSecondaryMotion] = useState(true);
  const [cycling, setCycling] = useState(false);
  const [look, setLook] = useState("center");
  const [hovering, setHovering] = useState(false);
  const [reaction, setReaction] = useState(null);

  // Initialize unified Live Avatar Controller
  const { avatarProps, controller } = useAvatarController({
    agentState: "idle",
    lookAt: trackingMode,
    secondaryMotion,
    sleepAfter: 35000,
  });

  const [currentAgentState, setCurrentAgentState] = useState("idle");
  const [currentFx, setCurrentFx] = useState(null);
  const reactionTimer = useRef(null);

  useEffect(() => {
    if (!cycling) return undefined;
    const timer = setInterval(() => {
      setPreview((current) => EXPRESSIONS[(EXPRESSIONS.indexOf(current) + 1) % EXPRESSIONS.length]);
    }, 1400);
    return () => clearInterval(timer);
  }, [cycling]);

  useEffect(() => () => clearTimeout(reactionTimer.current), []);

  const handleStateChange = (state) => {
    setCurrentAgentState(state);
    controller.setAgentState(state);
  };

  const handleFxToggle = (fxId) => {
    if (currentFx === fxId) {
      setCurrentFx(null);
      controller.clearFx();
    } else {
      setCurrentFx(fxId);
      controller.showFx(fxId, 3000);
      setTimeout(() => setCurrentFx(null), 3000);
    }
  };

  const handleSpeakDemo = () => {
    controller.speak("I am your live avatar assistant! It is nice to meet you.", {
      duration: 4200,
    });
    setCurrentAgentState("speaking");
    setTimeout(() => setCurrentAgentState("idle"), 4200);
  };

  const poke = () => {
    controller.squash();
    setReaction("surprised");
    clearTimeout(reactionTimer.current);
    reactionTimer.current = setTimeout(() => setReaction(null), 900);
  };

  const shown = reaction || (hovering ? "excited" : preview);

  return (
    <div className="page">
      <header className="masthead">
        <span className="brand">react-nice-avatar · live interactive avatar</span>
        <h1>Alive, reactive, and expressive.</h1>
        <p className="lede">
          A lightweight SVG character featuring <strong>agent persona states</strong>,{" "}
          <strong>page-wide gaze tracking</strong>, <strong>comic & anime overlays</strong>, and{" "}
          <strong>secondary spring motion</strong> — orchestrated by{" "}
          <code>useAvatarController</code>.
        </p>
      </header>

      <section className="stage" aria-label="Preview">
        <div
          className="stage-figure"
          role="button"
          tabIndex={0}
          aria-label="Poke the avatar"
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
          onClick={poke}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              poke();
            }
          }}
        >
          <Avatar
            style={{ width: "13.5rem", height: "13.5rem" }}
            {...heroConfig}
            {...avatarProps}
            expression={shown}
            agentState={currentAgentState}
            lookAt={trackingMode}
            secondaryMotion={secondaryMotion}
            animated={motion === "animated"}
            idle={motion === "idle"}
          />
        </div>

        <div className="stage-panel">
          <div style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
            <p className="stage-kicker" style={{ margin: 0 }}>
              Now showing
            </p>
            <span className="agent-status-badge">State: {currentAgentState}</span>
          </div>

          <h2 className="stage-name">{shown}</h2>
          <p className="stage-caption">
            {shown === preview ? CAPTIONS[preview] : hovering ? "Oh — hello." : "Whoa!"}
          </p>

          {/* Motion Mode */}
          <div className="segmented" role="radiogroup" aria-label="Motion">
            {["off", "idle", "animated"].map((mode) => (
              <label className="segment" key={mode}>
                <input
                  type="radio"
                  name="motion"
                  value={mode}
                  checked={motion === mode}
                  onChange={() => setMotion(mode)}
                />
                <span>{mode}</span>
              </label>
            ))}
          </div>

          <button
            type="button"
            className={`cycle${cycling ? " is-on" : ""}`}
            aria-pressed={cycling}
            onClick={() => setCycling((c) => !c)}
          >
            {cycling ? "Pause cycle" : "Auto-cycle expressions"}
          </button>

          {/* 1. Agent States */}
          <div className="live-control-group">
            <span className="control-heading">Agent States (Copilot Persona)</span>
            <div className="fx-pills">
              {AGENT_STATES.map((state) => (
                <button
                  key={state}
                  type="button"
                  className={`fx-pill${currentAgentState === state ? " is-active" : ""}`}
                  onClick={() => handleStateChange(state)}
                >
                  {state}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Comic / Anime Emote FX Overlays */}
          <div className="live-control-group">
            <span className="control-heading">Comic / Anime Emote Overlays</span>
            <div className="fx-pills">
              {EMOTE_FX.map((fx) => (
                <button
                  key={fx.id}
                  type="button"
                  className={`fx-pill${currentFx === fx.id ? " is-active" : ""}`}
                  onClick={() => handleFxToggle(fx.id)}
                >
                  {fx.label}
                </button>
              ))}
            </div>
          </div>

          {/* 3. Page-Wide Tracking & Physics */}
          <div className="live-control-group">
            <span className="control-heading">Gaze Tracking & Physics</span>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", alignItems: "center" }}>
              <div className="segmented" role="radiogroup" aria-label="Tracking mode">
                {[
                  { id: "global", label: "Page-wide cursor" },
                  { id: "hover", label: "Hover only" },
                  { id: "none", label: "Fixed center" },
                ].map((item) => (
                  <label className="segment" key={item.id}>
                    <input
                      type="radio"
                      name="tracking"
                      value={item.id}
                      checked={trackingMode === item.id}
                      onChange={() => setTrackingMode(item.id)}
                    />
                    <span>{item.label}</span>
                  </label>
                ))}
              </div>

              <button
                type="button"
                className={`pill${secondaryMotion ? " is-active" : ""}`}
                style={{ fontWeight: secondaryMotion ? "700" : "500" }}
                onClick={() => setSecondaryMotion(!secondaryMotion)}
              >
                Hair & Glasses Inertia: {secondaryMotion ? "ON" : "OFF"}
              </button>
            </div>
          </div>

          {/* 4. One-Shot Gestures & Speech */}
          <div className="gesture-row" style={{ marginTop: "16px" }}>
            <span className="gesture-label">Actions</span>
            <button type="button" className="pill" onClick={() => controller.nod()}>
              Nod
            </button>
            <button type="button" className="pill" onClick={() => controller.shake()}>
              Shake
            </button>
            <button type="button" className="pill" onClick={() => controller.sneeze()}>
              Sneeze
            </button>
            <button type="button" className="pill" onClick={() => controller.doubleTake()}>
              Double-take
            </button>
            <button type="button" className="pill" onClick={handleSpeakDemo}>
              Speak Demo 🎙️
            </button>
            <button
              type="button"
              className="pill"
              onClick={async () => {
                setCurrentAgentState("focused");
                await controller.runTool(() => new Promise((resolve) => setTimeout(resolve, 2600)));
                setCurrentAgentState("idle");
              }}
            >
              Run Tool ⚙️
            </button>
            <div className="segmented" role="radiogroup" aria-label="Look direction">
              {["left", "center", "right"].map((dir) => (
                <label className="segment" key={dir}>
                  <input
                    type="radio"
                    name="look"
                    value={dir}
                    checked={look === dir}
                    onChange={() => {
                      setLook(dir);
                      controller.turn(dir);
                    }}
                  />
                  <span>{dir === "center" ? "ahead" : dir}</span>
                </label>
              ))}
            </div>
          </div>

          <p className="stage-hint">
            Move your cursor anywhere across the entire page to see{" "}
            <strong>global gaze tracking</strong> · toggle <strong>agent states</strong> (thinking,
            listening, speaking, celebrating) · trigger <strong>anime emote overlays</strong>.
          </p>
        </div>
      </section>

      {/* Static Expressions Grid */}
      <section className="grid" aria-label="Expressions">
        {EXPRESSIONS.map((expression) => (
          <button
            key={expression}
            type="button"
            className={`expr-card${preview === expression ? " is-selected" : ""}`}
            aria-pressed={preview === expression}
            onClick={() => {
              setPreview(expression);
              setCycling(false);
            }}
          >
            <Avatar style={{ width: "6.5rem", height: "6.5rem" }} {...gridConfigs[expression]} />
            <span className="expr-label">{expression}</span>
          </button>
        ))}
      </section>

      <footer className="foot">
        Driven by <code>useAvatarController</code>: <code>agentState</code>, <code>sentiment</code>,{" "}
        <code>lookAt="global"</code>, <code>fx</code> badges (idea, zzz, sweat, sparkle, anger),{" "}
        <code>secondaryMotion</code>, and programmatic gestures.
      </footer>
    </div>
  );
}
