import { customElement } from "solid-element";
import NiceAvatar from "./components/NiceAvatar";

customElement("nice-avatar", (props, { element }) => {
  return <NiceAvatar {...props} />;
});
