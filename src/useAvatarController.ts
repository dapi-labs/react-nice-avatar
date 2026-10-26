import { useRef, useState, useCallback, useEffect } from "react";
import type {
  UseAvatarControllerOptions,
  UseAvatarControllerReturn,
  AvatarController,
  AgentState,
  Sentiment,
  EmoteFxName,
  LookingDirection,
} from "./types";

export function useAvatarController(
  options: UseAvatarControllerOptions = {},
): UseAvatarControllerReturn {
  const avatarRef = useRef<any>(null);

  const [agentState, setAgentStateInternal] = useState<AgentState>(options.agentState ?? "idle");
  const [sentiment, setSentimentInternal] = useState<Sentiment>(options.sentiment ?? "neutral");
  const [activeFx, setActiveFx] = useState<EmoteFxName | null>(options.fx ?? null);

  const sentimentTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const fxTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const speechTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Sync incoming options if they change externally
  useEffect(() => {
    if (options.agentState !== undefined) {
      setAgentStateInternal(options.agentState);
    }
  }, [options.agentState]);

  useEffect(() => {
    if (options.sentiment !== undefined) {
      setSentimentInternal(options.sentiment);
    }
  }, [options.sentiment]);

  useEffect(() => {
    if (options.fx !== undefined) {
      setActiveFx(options.fx);
    }
  }, [options.fx]);

  // Clean up all timers on unmount
  useEffect(() => {
    return () => {
      if (sentimentTimer.current) clearTimeout(sentimentTimer.current);
      if (fxTimer.current) clearTimeout(fxTimer.current);
      if (speechTimer.current) clearTimeout(speechTimer.current);
    };
  }, []);

  const setAgentState = useCallback((state: AgentState) => {
    setAgentStateInternal(state);
    if (state === "speaking") {
      avatarRef.current?.talk?.(120000); // keep mouth active while speaking
    } else if (state === "celebrating") {
      avatarRef.current?.squash?.();
      setActiveFx("sparkle");
      if (fxTimer.current) clearTimeout(fxTimer.current);
      fxTimer.current = setTimeout(() => setActiveFx(null), 2400);
    } else if (state === "confused") {
      setActiveFx("question");
      if (fxTimer.current) clearTimeout(fxTimer.current);
      fxTimer.current = setTimeout(() => setActiveFx(null), 2500);
    } else if (state === "error") {
      avatarRef.current?.shake?.();
      setActiveFx("exclamation");
      if (fxTimer.current) clearTimeout(fxTimer.current);
      fxTimer.current = setTimeout(() => setActiveFx(null), 2500);
    } else if (state === "thinking") {
      avatarRef.current?.stopTalking?.();
    } else if (state === "focused" || state === "executing" || state === "tool_call") {
      avatarRef.current?.stopTalking?.();
      setActiveFx("gear");
    }
  }, []);

  const setSentiment = useCallback((newSentiment: Sentiment, duration = 2200) => {
    setSentimentInternal(newSentiment);
    if (sentimentTimer.current) clearTimeout(sentimentTimer.current);
    if (duration > 0 && newSentiment !== "neutral") {
      sentimentTimer.current = setTimeout(() => {
        setSentimentInternal("neutral");
      }, duration);
    }
  }, []);

  const showFx = useCallback((fx: EmoteFxName, duration = 2500) => {
    setActiveFx(fx);
    if (fxTimer.current) clearTimeout(fxTimer.current);
    if (duration > 0) {
      fxTimer.current = setTimeout(() => {
        setActiveFx(null);
      }, duration);
    }
  }, []);

  const clearFx = useCallback(() => {
    if (fxTimer.current) clearTimeout(fxTimer.current);
    setActiveFx(null);
  }, []);

  const nod = useCallback(() => avatarRef.current?.nod?.(), []);
  const shake = useCallback(() => avatarRef.current?.shake?.(), []);
  const sneeze = useCallback(() => avatarRef.current?.sneeze?.(), []);
  const squash = useCallback(() => avatarRef.current?.squash?.(), []);
  const doubleTake = useCallback(() => avatarRef.current?.doubleTake?.(), []);
  const turn = useCallback((dir?: LookingDirection) => avatarRef.current?.turn?.(dir), []);
  const wake = useCallback(() => avatarRef.current?.wake?.(), []);
  const sleep = useCallback(() => avatarRef.current?.sleep?.(), []);

  const speak = useCallback(
    (durationOrText: number | string = 3000, opts?: { duration?: number }) => {
      let duration = 3000;
      if (typeof durationOrText === "number") {
        duration = durationOrText;
      } else if (typeof durationOrText === "string") {
        const words = durationOrText.trim().split(/\s+/).length;
        duration = opts?.duration ?? Math.max(1600, words * 280);
      }

      setAgentStateInternal("speaking");
      avatarRef.current?.talk?.(duration);

      if (speechTimer.current) clearTimeout(speechTimer.current);
      speechTimer.current = setTimeout(() => {
        setAgentStateInternal("idle");
      }, duration);
    },
    [],
  );

  const stopSpeaking = useCallback(() => {
    if (speechTimer.current) clearTimeout(speechTimer.current);
    avatarRef.current?.stopTalking?.();
    setAgentStateInternal("idle");
  }, []);

  const runTool = useCallback(async <T>(task: () => Promise<T>): Promise<T> => {
    setAgentStateInternal("focused");
    setActiveFx("gear");
    try {
      const result = await task();
      setAgentStateInternal("idle");
      setActiveFx(null);
      return result;
    } catch (err) {
      setAgentStateInternal("error");
      avatarRef.current?.shake?.();
      setActiveFx("exclamation");
      if (fxTimer.current) clearTimeout(fxTimer.current);
      fxTimer.current = setTimeout(() => setActiveFx(null), 2500);
      throw err;
    }
  }, []);

  const controller: AvatarController = {
    setAgentState,
    setSentiment,
    showFx,
    clearFx,
    nod,
    shake,
    sneeze,
    squash,
    doubleTake,
    turn,
    speak,
    stopSpeaking,
    runTool,
    wake,
    sleep,
  };

  const avatarProps = {
    ...options,
    ref: avatarRef,
    agentState,
    sentiment,
    fx: activeFx,
    lookAt: options.lookAt ?? "hover",
    secondaryMotion: options.secondaryMotion ?? true,
    animated: options.animated ?? true,
  };

  return {
    avatarProps,
    controller,
  };
}
