export class TMailOptional {
  to: string;
  subject: string;
  context: {
    [name: string]: string;
  };
  template: string;
}
