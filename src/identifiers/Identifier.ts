export default class Identifier {

  readonly identifier: string;

  constructor(identifier: string) {
    this.identifier = identifier;
  }

  toTerraform(): string {
    return this.identifier;
  }

}
