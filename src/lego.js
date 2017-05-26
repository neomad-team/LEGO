class Component extends HTMLElement {
  constructor() {
    super()
    this.shadow = this.attachShadow({mode: 'open'})
  }

  static get observedAttributes() {
    return this.prototype.watch && this.prototype.watch()
  }

  connectedCallback() {
    this.update()
  }

  update() {
    this.shadow.innerHTML = this.render()
  }

  render() {
    return '<slot></slot>'
  }

  value(attribute) {
    if(this.hasAttribute(attribute)) {
      return this.getAttribute(attribute)
    }
    const defaults = this.defaults()
    if(attribute in defaults) {
      return defaults[attribute]
    }
  }

  attributeChangedCallback(name, oldValue, value) {
    this[`${name}Changed`] && this[`${name}Changed`](value, oldValue)
    this.update()
  }
}
