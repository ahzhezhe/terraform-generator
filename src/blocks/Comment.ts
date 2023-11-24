import { Argument, Attribute } from '../arguments';
import { Block } from '.';

/**
 * @category Block
 */
export class Comment extends Block<Record<string, never>> {

  readonly comment: string;

  /**
   * Construct comment.
   *
   * @param comment comment
   */
  constructor(comment: string) {
    super('comment', [], {});

    this.comment = comment;
  }

  override toTerraform(): string {
    return `${this.comment.trim().split('\n').map(line => line.trim() ? `# ${line.trim()}` : '').join('\n')}\n\n`;
  }

  override asArgument(): Argument {
    throw new Error('Inaccessible method.');
  }

  override attr(_name: string): Attribute {
    throw new Error('Inaccessible method.');
  }

}
