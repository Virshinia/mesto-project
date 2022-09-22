export class Section {
  constructor({ items, renderer }, selector) {
    this._items = items;
    this._renderer = renderer;
    this._selector = selector;
  }

  addArrayOfElements() {
    this._cardsContainer = document.querySelector(this._selector);
    this._items.forEach((item) => {
      this._renderer(item, this._cardsContainer);
    });
  }

  addOneElement(element) {
    this._cardsContainer = document.querySelector(this._selector);
    this._renderer(element, this._cardsContainer);
  }
}
