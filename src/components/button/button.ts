import { h } from 'maquette';

interface IButtonConfig {
  name: string;
  onclick(): void;
}

export class Button {
  private name: string;
  private onclick: () => void;

  constructor(config: IButtonConfig) {
    this.name = config.name;
    this.onclick = config.onclick;
  }

  render() {
    return h('button', {
      bind: this,
      onclick: this.onclick
    }, [this.name])
  }
}