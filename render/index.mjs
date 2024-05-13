import NiceAvatar from "@nice-avatar-svg/preact";
import { renderToStringAsync } from "preact-render-to-string";

/**
 * @param {import('@nice-avatar-svg/shared/model.mjs').AvatarConfiguration} props
 */
export default function render(props) {
  return renderToStringAsync(NiceAvatar(props));
}
