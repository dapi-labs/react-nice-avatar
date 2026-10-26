import React, { createRef } from "react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vite-plus/test";
import { render, act, fireEvent } from "@testing-library/react";
import ReactNiceAvatar, { genConfig, useAvatarController } from "../src";

describe("ReactNiceAvatar Component", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
  });

  it("renders with default generated config", () => {
    const config = genConfig();
    const { container } = render(<ReactNiceAvatar {...config} id="test-avatar" />);
    const avatar = container.querySelector("#test-avatar");
    expect(avatar).toBeTruthy();
  });

  it("renders with different shapes: circle, rounded, square", () => {
    const config = genConfig();
    const { container: c1 } = render(<ReactNiceAvatar {...config} shape="circle" id="av-circle" />);
    const { container: c2 } = render(
      <ReactNiceAvatar {...config} shape="rounded" id="av-rounded" />,
    );
    const { container: c3 } = render(<ReactNiceAvatar {...config} shape="square" id="av-square" />);

    expect(c1.querySelector("#av-circle")?.getAttribute("style")).toContain("border-radius: 100%");
    expect(c2.querySelector("#av-rounded")?.getAttribute("style")).toContain("border-radius: 6px");
    expect(c3.querySelector("#av-square")?.getAttribute("style")).toContain("border-radius: 0");
  });

  it("renders with expressions (happy, sad, excited, angry)", () => {
    const expressions = ["happy", "sad", "excited", "angry", "surprised", "neutral"] as const;
    expressions.forEach((expr) => {
      const { container } = render(<ReactNiceAvatar expression={expr} id={`av-${expr}`} />);
      expect(container.querySelector(`#av-${expr}`)).toBeTruthy();
    });
  });

  it("supports ref handle methods", () => {
    const ref = createRef<ReactNiceAvatar>();
    render(<ReactNiceAvatar ref={ref} animated id="ref-avatar" />);

    expect(ref.current).not.toBeNull();
    expect(typeof ref.current?.nod).toBe("function");
    expect(typeof ref.current?.shake).toBe("function");
    expect(typeof ref.current?.sneeze).toBe("function");
    expect(typeof ref.current?.squash).toBe("function");
    expect(typeof ref.current?.doubleTake).toBe("function");
    expect(typeof ref.current?.talk).toBe("function");
    expect(typeof ref.current?.stopTalking).toBe("function");
    expect(typeof ref.current?.turn).toBe("function");
    expect(typeof ref.current?.showFx).toBe("function");
    expect(typeof ref.current?.clearFx).toBe("function");
    expect(typeof ref.current?.wake).toBe("function");
    expect(typeof ref.current?.sleep).toBe("function");

    act(() => {
      ref.current?.nod();
      ref.current?.talk(500);
      ref.current?.showFx("sparkle", 1000);
      ref.current?.turn("left");
    });

    act(() => {
      vi.advanceTimersByTime(600);
    });

    act(() => {
      ref.current?.stopTalking();
      ref.current?.clearFx();
      ref.current?.turn("center");
    });
  });

  it("interacts with mouse events: hover, leave, click", () => {
    const { container } = render(
      <ReactNiceAvatar animated lookAt="hover" id="interactive-avatar" />,
    );
    const avatar = container.querySelector("#interactive-avatar")!;

    act(() => {
      fireEvent.mouseMove(avatar, { clientX: 50, clientY: 50 });
      fireEvent.click(avatar);
      fireEvent.mouseLeave(avatar);
    });

    expect(avatar).toBeTruthy();
  });
});

describe("useAvatarController hook", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
  });

  function TestCompanion() {
    const { avatarProps, controller } = useAvatarController({
      agentState: "idle",
      sentiment: "neutral",
      animated: false,
    });

    return (
      <div>
        <ReactNiceAvatar id="companion-avatar" {...avatarProps} />
        <button onClick={() => controller.setAgentState("thinking")}>Think</button>
        <button onClick={() => controller.setSentiment("joy")}>Joy</button>
        <button onClick={() => controller.showFx("idea")}>Idea</button>
        <button onClick={() => controller.speak("Hello world")}>Speak</button>
        <button onClick={() => controller.nod()}>Nod</button>
      </div>
    );
  }

  it("manages agent state and sentiment transitions", () => {
    const { container, getByText, unmount } = render(<TestCompanion />);
    expect(container.querySelector("#companion-avatar")).toBeTruthy();

    act(() => {
      getByText("Think").click();
    });

    act(() => {
      getByText("Joy").click();
    });

    act(() => {
      getByText("Idea").click();
    });

    act(() => {
      getByText("Speak").click();
    });

    act(() => {
      getByText("Nod").click();
    });

    act(() => {
      vi.advanceTimersByTime(3000);
      unmount();
    });
  });

  it("runs async tool via runTool method", async () => {
    let controllerInstance: any;
    function ToolCompanion() {
      const { controller, avatarProps } = useAvatarController({ animated: false });
      controllerInstance = controller;
      return <ReactNiceAvatar {...avatarProps} />;
    }

    const { unmount } = render(<ToolCompanion />);
    expect(controllerInstance).toBeDefined();

    const mockTool = vi.fn().mockResolvedValue("success-result");
    let result: string | undefined;

    await act(async () => {
      result = await controllerInstance.runTool(mockTool);
    });

    expect(mockTool).toHaveBeenCalledTimes(1);
    expect(result).toBe("success-result");

    act(() => {
      unmount();
    });
  });
});

describe("talking mouth", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
  });

  /** The mouth is the last svg inside the vertical face-detail stack. */
  function getMouth(container: HTMLElement): Element | null {
    const faceDetail = container.querySelector<HTMLDivElement>(
      'div[style*="flex-direction: column"]',
    );
    return faceDetail?.querySelector("svg:last-child") ?? null;
  }

  function collectMouthShapes(container: HTMLElement, samples = 20): Set<string> {
    const shapes = new Set<string>();
    for (let i = 0; i < samples; i++) {
      act(() => {
        vi.advanceTimersByTime(200);
      });
      shapes.add(getMouth(container)?.innerHTML ?? "");
    }
    return shapes;
  }

  it("cycles mouth shapes while the agent is speaking", () => {
    const { container } = render(
      <ReactNiceAvatar id="speaking-avatar" agentState="speaking" mouthStyle="peace" />,
    );

    expect(collectMouthShapes(container).size).toBeGreaterThan(1);
  });

  it("keeps the mouth still when the agent is not speaking", () => {
    const { container } = render(
      <ReactNiceAvatar id="idle-avatar" agentState="idle" mouthStyle="peace" />,
    );

    expect(collectMouthShapes(container).size).toBe(1);
  });

  it("honours an explicit talking prop over the agent state", () => {
    const { container } = render(
      <ReactNiceAvatar id="talking-prop" agentState="idle" talking={false} mouthStyle="peace" />,
    );

    expect(collectMouthShapes(container).size).toBe(1);
  });
});
