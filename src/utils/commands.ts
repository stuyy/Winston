/* eslint-disable import/prefer-default-export */
/**
 * @param prefix command prefix
 * @param cmdName command name
 * @param content the content to parse
 * @param delimiter the separator to use to split content
 */
export function getCommandArguments(
  prefix: string,
  cmdName: string,
  content: string,
  delimiter: string | RegExp,
): Array<string> {
  const args = content.substring(prefix.length + cmdName.length).trim();
  return args.length === 0 ? [] : args.split(delimiter);
}

/**
 * Gets command name
 * @param prefix command prefix
 * @param content the string to parse
 * @returns the command name
 */
export function getCommandName(prefix: string, content: string): string {
  return content.substring(prefix.length).split(/\s+/).shift();
}

/**
 * Extracts after command name and trims left and right white space.
 * @param prefix
 * @param content
 * @returns after command name
 */
export function extractAfterCommandName(prefix: string, content: string): string {
  return content
    .substring(prefix.length)
    .split(/\s+/)
    .slice(1)
    .join(' ')
    .trim();
}

/**
 * Splits arguments on regex or string
 * @param content the string to split
 * @param delimiter the delimiter
 */
export function splitArgumentsOnRegex(content: string, delimiter: string | RegExp): Array<string> {
  return content.trim().split(delimiter);
}
