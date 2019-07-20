import { BaseEnum } from "./BaseEnum";

class Type extends BaseEnum {
  Text = 0;
  Chart = 1;
  Html = 2;

  constructor() {
    super();
    this.init(this);
  }
}

export const WidgetType = Object.freeze(new Type());