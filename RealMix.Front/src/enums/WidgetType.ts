import { BaseEnum } from './baseEnum';

class Type extends BaseEnum {
  public Text = 0;
  public Chart = 1;
  public Html = 2;

  public constructor() {
    super();
    this.init(this);
  }
}

export const WidgetType = Object.freeze(new Type());
