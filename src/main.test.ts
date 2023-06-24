import { describe, expect, it } from "vitest";
import { buildPrompt } from "./main.js";

describe(buildPrompt.name, () => {
  it("builds a prompt", () => {
    expect(
      buildPrompt("foo", [{ input: "bar", output: "baz" }], "qux")
    ).toMatchSnapshot();
  });
});
