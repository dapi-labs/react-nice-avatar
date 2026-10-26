const STYLE_ID = "react-nice-avatar-animations";

/**
 * Keyframes shared by the `animated` / `idle` props, the blink system, the
 * head gestures (`nod()`, `shake()`, `sneeze()`, `squash()`), secondary motion
 * (hair, glasses inertia) and comic emote overlays. Injected once into
 * document.head on demand; safe to call during render (idempotent) and on
 * the server (no-op without a document).
 */
const KEYFRAMES = `
@keyframes rna-blink {
  0%, 91.5%, 96.5%, 100% { transform: scaleY(1); }
  94% { transform: scaleY(0.08); }
}
@keyframes rna-blink-once {
  0%, 100% { transform: scaleY(1); }
  50% { transform: scaleY(0.08); }
}
@keyframes rna-mouth {
  0%, 100% { transform: scaleY(1); }
  50% { transform: scaleY(0.62); }
}
@keyframes rna-sway {
  0% { transform: rotate(-1.3deg); }
  50% { transform: rotate(1.3deg) translateY(0.5%); }
  100% { transform: rotate(-1.3deg); }
}
@keyframes rna-turn {
  0% { transform: translateX(-1.1%) rotate(-0.5deg); }
  50% { transform: translateX(1.1%) rotate(0.5deg); }
  100% { transform: translateX(-1.1%) rotate(-0.5deg); }
}
@keyframes rna-nod {
  0% { transform: translateY(0) rotate(0deg); }
  28% { transform: translateY(3.2%) rotate(3.5deg); }
  52% { transform: translateY(0.4%) rotate(-1deg); }
  74% { transform: translateY(2%) rotate(2deg); }
  100% { transform: translateY(0) rotate(0deg); }
}
@keyframes rna-shake {
  0% { transform: translateX(0) rotate(0deg); }
  18% { transform: translateX(-1.6%) rotate(-7deg); }
  38% { transform: translateX(1.4%) rotate(6deg); }
  58% { transform: translateX(-1%) rotate(-4deg); }
  78% { transform: translateX(0.6%) rotate(2.5deg); }
  100% { transform: translateX(0) rotate(0deg); }
}
@keyframes rna-sneeze {
  0% { transform: translateY(0) rotate(0deg); }
  34% { transform: translateY(-1.4%) rotate(-1.5deg); }
  48% { transform: translateY(2.6%) rotate(8deg); }
  52% { transform: translateY(1.6%) rotate(5.5deg); }
  80% { transform: translateY(-0.5%) rotate(-2deg); }
  100% { transform: translateY(0) rotate(0deg); }
}
@keyframes rna-squash {
  0% { transform: scale(1, 1); }
  28% { transform: scale(1.05, 0.92); }
  56% { transform: scale(0.98, 1.04); }
  78% { transform: scale(1.008, 0.995); }
  100% { transform: scale(1, 1); }
}

/* Secondary Motion Keyframes */
@keyframes rna-hair-nod {
  0% { transform: translateY(0) rotate(0deg); }
  18% { transform: translateY(-0.4%) rotate(-0.6deg); }
  42% { transform: translateY(4.2%) rotate(4.2deg); }
  68% { transform: translateY(-0.6%) rotate(-1.5deg); }
  86% { transform: translateY(1.2%) rotate(0.8deg); }
  100% { transform: translateY(0) rotate(0deg); }
}
@keyframes rna-hair-shake {
  0% { transform: translateX(0) rotate(0deg); }
  22% { transform: translateX(2.4%) rotate(5deg); }
  46% { transform: translateX(-2.2%) rotate(-4deg); }
  70% { transform: translateX(1.4%) rotate(2.5deg); }
  100% { transform: translateX(0) rotate(0deg); }
}
@keyframes rna-hair-sneeze {
  0% { transform: translateY(0) rotate(0deg); }
  38% { transform: translateY(-1.2%) rotate(-2deg); }
  54% { transform: translateY(3.8%) rotate(9.5deg); }
  76% { transform: translateY(-0.8%) rotate(-2.5deg); }
  100% { transform: translateY(0) rotate(0deg); }
}
@keyframes rna-hair-sway {
  0% { transform: rotate(-0.8deg); }
  50% { transform: rotate(0.8deg) translateY(0.4%); }
  100% { transform: rotate(-0.8deg); }
}
@keyframes rna-glasses-slip {
  0% { transform: translateY(0) rotate(0deg); }
  42% { transform: translateY(3.5%) rotate(1.5deg); }
  68% { transform: translateY(0.8%) rotate(-0.5deg); }
  100% { transform: translateY(0) rotate(0deg); }
}
@keyframes rna-speech-bob {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  25% { transform: translateY(0.9%) rotate(0.6deg); }
  75% { transform: translateY(-0.4%) rotate(-0.4deg); }
}
@keyframes rna-listening-nod {
  0%, 75%, 100% { transform: translateY(0) rotate(0deg); }
  85% { transform: translateY(1.4%) rotate(1.2deg); }
  92% { transform: translateY(-0.2%) rotate(-0.4deg); }
}

/* Comic & Anime Emote FX Keyframes */
@keyframes rna-fx-pop {
  0% { transform: scale(0); opacity: 0; }
  60% { transform: scale(1.18); opacity: 1; }
  80% { transform: scale(0.95); opacity: 1; }
  100% { transform: scale(1); opacity: 1; }
}
@keyframes rna-fx-float-zzz {
  0% { transform: translate(0, 0) scale(0.7); opacity: 0; }
  25% { opacity: 0.95; }
  70% { transform: translate(12px, -24px) scale(1.1); opacity: 0.85; }
  100% { transform: translate(22px, -46px) scale(1.25); opacity: 0; }
}
@keyframes rna-fx-sweat {
  0%, 100% { transform: translateY(-3px) rotate(0deg); opacity: 0.9; }
  50% { transform: translateY(4px) rotate(3deg); opacity: 1; }
}
@keyframes rna-fx-sparkle {
  0% { transform: scale(0) rotate(0deg); opacity: 0; }
  50% { transform: scale(1.15) rotate(45deg); opacity: 1; }
  100% { transform: scale(0.85) rotate(90deg); opacity: 0; }
}
@keyframes rna-fx-anger {
  0%, 100% { transform: scale(0.92); }
  50% { transform: scale(1.14); }
}
@keyframes rna-fx-pulse {
  0%, 100% { transform: scale(1); }
  28% { transform: scale(1.2) rotate(3deg); }
  50% { transform: scale(0.96); }
  72% { transform: scale(1.15) rotate(-3deg); }
}
@keyframes rna-fx-spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
@keyframes rna-focus-scan {
  0%, 100% { transform: translateX(-1.2%); }
  50% { transform: translateX(1.2%); }
}
`;

export function ensureAnimationStyles(): void {
  if (typeof document === "undefined" || document.getElementById(STYLE_ID)) {
    return;
  }
  if (!motionAllowed()) {
    return;
  }
  const tag = document.createElement("style");
  tag.id = STYLE_ID;
  tag.textContent = KEYFRAMES;
  document.head.appendChild(tag);
}

/** False when the user prefers reduced motion (keyframes are not injected). */
export function motionAllowed(): boolean {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
    return true;
  }
  return !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
