export interface ICommand {
  matches(command: string): boolean;
  execute(command: string): void;
}
