export interface Example {
  input: string;
  output: string;
}

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
${buildRole(user)}
${data}
`.trim();

const buildRole = (user: boolean): string =>
  `"""${(user ? "user" : "bot").toUpperCase()}`;
