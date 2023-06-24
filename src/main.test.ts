import { toArray } from "@raviqqe/hidash/promise";
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
  it("parses an empty stream", async () => {
    expect(await toArray(parseOutputStream((async function* () {})()))).toEqual(
      []
    );
  });

  it("parses a word", async () => {
    expect(
      await toArray(
        parseOutputStream(
          (async function* () {
            yield "foo";
          })()
        )
      )
    ).toEqual(["foo"]);
  });

  it("parses a wrapped word", async () => {
    expect(
      await toArray(
        parseOutputStream(
          (async function* () {
            yield '"""';
            yield "\n";
            yield "foo";
            yield '"""';
            yield "\n";
          })()
        )
      )
    ).toEqual(["foo"]);
  });

  it("parses wrapped words", async () => {
    expect(
      await toArray(
        parseOutputStream(
          (async function* () {
            yield '"""';
            yield "\n";
            yield "foo";
            yield "bar";
            yield '"""';
            yield "\n";
          })()
        )
      )
    ).toEqual(["foo", "bar"]);
  });
});
