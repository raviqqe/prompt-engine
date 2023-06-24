import { describe, expect, it } from "vitest";
import { buildPrompt, parseOutputStream } from "./main.js";

describe(buildPrompt.name, () => {
  it("builds a prompt", () => {
    expect(
      buildPrompt("foo", [{ input: "bar", output: "baz" }], "qux")
    ).toMatchSnapshot();
  });

  it("builds a prompt with two examples", () => {
    expect(
      buildPrompt(
        "foo",
        [
          { input: "bar", output: "baz" },
          { input: "answer", output: "42" },
        ],
        "qux"
      )
    ).toMatchSnapshot();
  });
});

describe(parseOutputStream.name, () => {
  it("parses an empty stream", () => {
    expect(parseOutputStream((async function* () {})())).toMatchSnapshot();
  });

  it("builds a prompt with two examples", () => {
    expect(
      buildPrompt(
        "foo",
        [
          { input: "bar", output: "baz" },
          { input: "answer", output: "42" },
        ],
        "qux"
      )
    ).toMatchSnapshot();
  });
});
