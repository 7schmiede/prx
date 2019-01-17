export interface IStore {
  get(): any; // TODO: use explicit interfaces
  set(config: any): void;
}
