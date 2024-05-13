import assert from "node:assert";
import { it } from "node:test";
import render from "./index.mjs";

it("should render the avatar", async () => {
  const svg = await render({});
  assert.ok(svg.startsWith("<svg"));
});
