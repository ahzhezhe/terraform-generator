export default class Argument {

  readonly argument: string | Argument;
  readonly asIs: boolean;

  constructor(argument: string | Argument, asIs = false) {
    if (!argument || (typeof argument === 'string' && !argument.trim())) {
      throw new Error('Argument cannot be empty.');
    }

    this.argument = typeof argument === 'string' ? argument.trim() : argument;
    this.asIs = asIs;
  }

  toTerraform(): string {
    let str = '';
    if (this.argument instanceof Argument) {
      str += this.argument.toTerraform();
    } else {
      str += this.argument;
    }
    return str;
  }

}
