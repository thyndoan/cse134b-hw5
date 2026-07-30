class CatWidget extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttribute() {
    return ["count"];
  }

  connectedCallback() {
    this.setAttribute("state", "loading");
    const count = this.getAttribute("count") || 3;

    fetch(`https://api.thecatapi.com/v1/images/search?limit=${count}`)
      .then((response) => response.json())
      .then((cats) => {
        this.render(cats);
        this.setAttribute("state", "success");
      });
  }

  render(cats) {
    const list = this.querySelector(".cat-list");
    const template = this.querySelector("#cat-item-template");
    list.innerHTML = "";
    cats.forEach((cat) => {
      const clone = template.content.cloneNode(true);
      clone.querySelector("img").src = cat.url;
      list.appendChild(clone);
    });
    list.hidden = false;
    this.querySelector(".fallback").hidden = true;
  }

  disconnectedCallback() {}
}
customElements.define("cat-widget", CatWidget);
