import { Component, IComponentConfig } from '../index';
import { h } from 'maquette';

interface IButtonConfig extends IComponentConfig {
  name: string;
}

export class Button extends Component {
  private name: string;

  constructor(config: IButtonConfig) {
    super(config);
    this.name = config.name;
  }

  render() {
    return h('button', {
      bind: this
    }, [this.name])
  }
}