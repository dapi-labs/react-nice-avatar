export { COLORS } from "./constants.mjs";
import { renderToStringAsync } from "solid-js/web";
import NiceAvatar from "./components/NiceAvatar";

/**
 * @param {import('./components/NiceAvatar').Props} props
 */
export default function render(props) {
  return renderToStringAsync(<NiceAvatar {...props} />);
}
