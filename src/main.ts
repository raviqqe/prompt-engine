export interface Example {
  input: string;
  output: string;
}

const startPattern = /"""[a-zA-Z0-9]*\s/;
const endPattern = /"""\s*$/;

export const build = (
  description: string,
  examples: Example[],
  input: string
): string => {
  return [
    description,
    examples
      .map(({ input, output }) =>
        [wrapChat(input, true), wrapChat(output, false)].join("\n\n")
      )
      .join("\n\n"),
    wrapChat(input, true),
  ].join("\n\n");
};

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
