class Counter {
  value: number = 0;

  get next() {
    return ++this.value;
  }
}

export const counter = new Counter();