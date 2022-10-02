export class Section {
  constructor(renderer, selector) {
    this._renderer = renderer;
    this._cardsContainer = document.querySelector(selector);
  }

  renderItems(items) {
    items.forEach((item) => {
      this._cardsContainer.prepend(this._renderer(item));
    });
  }

  addItem(item) {
    this._cardsContainer.prepend(this._renderer(item));
  }
}
