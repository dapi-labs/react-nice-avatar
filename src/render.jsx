import { renderToStringAsync } from "preact-render-to-string";
import NiceAvatar from "./components/NiceAvatar";

/**
 * @param {import('./components/NiceAvatar').Props} props
 */
export default function render(props) {
  return renderToStringAsync(<NiceAvatar {...props} />);
}

render().then(console.log).catch(console.error);
