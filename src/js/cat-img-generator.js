class CatWidget extends HTMLElement {
  constructor() {
    super();
    this.setAttribute("state", "idle");
  }

  static get observedAttributes() {
    return ["count"];
  }

  connectedCallback() {
    this.hasConnected = true;
    this.loadCats();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name == "count" && oldValue !== newValue && this.hasConnected) {
      this.loadCats();
    }
  }

  loadCats() {
    this.setAttribute("state", "loading");

    const count = this.getAttribute("count") || 3;
    this.controller = new AbortController();
    const timeoutId = setTimeout(() => this.controller.abort(), 8000);

    /* Add cache for every 10 minutes*/
    const cacheKey = `cat-cache:${count}`;
    const ttl = 10 * 60 * 1000;

    try {
      const cached = sessionStorage.getItem(cacheKey);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Date.now() - parsed.timestamp < ttl) {
          this.render(parsed.cats);
          this.setAttribute("state", "success");
          return;
        }
      }
    } catch (e) {}

    fetch(`https://api.thecatapi.com/v1/images/search?limit=${count}`, {
      signal: this.controller.signal,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Bad response from the server");
        } else {
          return response.json();
        }
      })
      .then((cats) => {
        clearTimeout(timeoutId);
        const trimmed = cats.slice(0, count);

        try {
          sessionStorage.setItem(
            cacheKey,
            JSON.stringify({ cats: trimmed, timestamp: Date.now() }),
          );
        } catch (e) {}

        this.render(trimmed);
        this.setAttribute("state", "success");
      })
      .catch(() => {
        clearTimeout(timeoutId);
        this.setAttribute("state", "error");
        this.showError();
      });
  }

  showError() {
    const caption = this.querySelector(".fallback figcaption");
    if (caption) {
      caption.textContent =
        "Couldn't load cat pictures right now - here is one for you anyway";
    }
  }

  render(cats) {
    const list = this.querySelector(".cat-list");
    const template = this.querySelector("#cat-item-template");
    list.replaceChildren();
    cats.forEach((cat) => {
      const clone = template.content.cloneNode(true);
      clone.querySelector("img").src = cat.url;
      list.appendChild(clone);
    });
    list.hidden = false;
    this.querySelector(".fallback").hidden = true;
  }

  disconnectedCallback() {
    if (this.controller) {
      this.controller.abort();
    }
  }
}
customElements.define("cat-widget", CatWidget);
