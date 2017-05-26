class Component extends HTMLElement {
  constructor() {
    super()
    this.shadow = this.attachShadow({mode: 'open'})
  }

  static get observedAttributes() {
    return this.prototype.watch()
  }

  connectedCallback() {
    this.update()
  }

  update() {
    this.shadow.innerHTML = this.render && this.render()
  }

  attributeChangedCallback(name, oldValue, value) {
    this[`${name}Changed`] && this[`${name}Changed`](value, oldValue)
    this.update()
  }
}
