interface PropertyMap {
  [id: number]: string;
}

export class BaseEnum {
  private _map: PropertyMap = {};
  private _list: { id: number; name: string }[] = [];

  protected init(self: BaseEnum) {
    const entries = Object.entries(self).filter(([name]) => !name.startsWith('_'));
    this._map = entries.reduce<PropertyMap>((p, [name, id]) => {
      p[id] = this.nameConverter(id, name);
      return p;
    }, {});
    this._list = entries.map(([, id]) => ({ id, name: this.name(+id) }));
  }

  public name(id: number) {
    return this._map[id] != null ? this._map[id] : '???';
  }

  // You should override function in inheritor to apply custom names
  // nameConverter(id: number, name: string) {
  //   return id === this.MyField ? 'My Super Field Name' : super.nameConverter(id, name);
  // }

  protected nameConverter(id: number, name: string) {
    return name.replace(/([A-z](?=[A-Z0-9]))/g, '$1 ').replace(/([0-9](?=[A-z]))/g, '$1 ');
  }

  public get all() {
    return this._list;
  }
}
