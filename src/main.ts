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
        buildUtterance(input, true),
        buildUtterance(output, false),
      ])
      .join(separator),
    buildUtterance(input, true),
    buildRole(false),
  ].join(separator) + "\n";

const buildUtterance = (data: string, user: boolean) =>
  `
${buildRole(user)}
${data}
`.trim();

const buildRole = (user: boolean): string =>
  `"""${(user ? "user" : "bot").toUpperCase()}`;
