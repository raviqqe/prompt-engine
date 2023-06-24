export interface Example {
  input: string;
  output: string;
}

const startPattern = /"""[a-zA-Z0-9]*\s/;
const endPattern = /"""\s*$/;
const separator = "\n\n";

export const buildPrompt = (
  description: string,
  examples: [Example, ...Example[]],
  input: string
): string =>
  [
    description,
    examples
      .flatMap(({ input, output }) => [
        wrapChat(input, true),
        wrapChat(output, false),
      ])
      .join(separator),
    wrapChat(input, true),
  ].join(separator);

const wrapChat = (data: string, user: boolean) =>
  `
"""${(user ? "user" : "bot").toUpperCase()}
${data}
"""
`.trim();

export const parseOutputStream = async function* (
  deltas: AsyncIterable<string>
): AsyncIterable<string> {
  let current = "";

  for await (const delta of deltas) {
    current += delta;

    if (!current.includes('"')) {
      yield current;
      current = "";
      continue;
    }

    current = current.replace(startPattern, "");
  }

  return current.replace(endPattern, "");
};
