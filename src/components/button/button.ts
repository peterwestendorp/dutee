import { h } from 'maquette';

interface IButtonConfig {
  name: string;
  action(): void;
}

export class Button {
  private name: string;
  private action: () => void;

  constructor(config: IButtonConfig) {
    this.name = config.name;
    this.action = config.action;
  }

  render() {
    return h('button', {
      bind: this,
      onclick: this.action
    }, [this.name])
  }
}