export default class CommandConfigurable {
  private expectArgs: boolean = false;

  private argsAsString: boolean = false;

  private delimiter: string | RegExp = null;

  public setExpectArgs(expectArgs: boolean): CommandConfigurable {
    this.expectArgs = expectArgs;
    return this;
  }

  public setOriginalArgs(originalArgs: boolean): CommandConfigurable {
    this.argsAsString = originalArgs;
    return this;
  }

  public setDelimiter(delimiter: string | RegExp): CommandConfigurable {
    this.delimiter = delimiter;
    return this;
  }

  public argsRequired(): boolean {
    return this.expectArgs;
  }

  public commandArgsAsString(): boolean {
    return this.argsAsString;
  }

  public getDelimiter(): string | RegExp {
    return this.delimiter;
  }
}
