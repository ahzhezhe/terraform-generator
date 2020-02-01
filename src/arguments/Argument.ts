export default class Argument {

  readonly argument: string;

  constructor(argument: string) {
    this.argument = argument;
  }

  toTerraform(): string {
    return this.argument;
  }

}
