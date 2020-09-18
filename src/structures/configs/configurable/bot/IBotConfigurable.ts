/* eslint-disable semi */
/* eslint-disable no-extra-semi */
export default interface IBotConfigurable {

  prefix: string;

  setPrefix(prefix: string): void;
  getPrefix(): string;

};
