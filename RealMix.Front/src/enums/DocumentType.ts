import { BaseEnum } from './baseEnum';

class Type extends BaseEnum {
  public Type_1 = 0;
  public Type_2 = 1;
  public Type_3 = 2;
  public Type_4 = 3;
  public Type_5 = 4;

  public constructor() {
    super();
    this.init(this);
  }
}

export const DocumentType = Object.freeze(new Type());
