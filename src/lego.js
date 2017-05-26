class Component extends HTMLElement {
  constructor() {
    super()
    this.shadow = this.attachShadow({mode: 'open'})
  }

  defaults() { return {}}

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
    return ''
  }

  attributeChangedCallback(name, oldValue, value) {
    this[`${name}Changed`] && this[`${name}Changed`](value, oldValue)
    this.update()
  }
}

class TemplateComponent extends Component {
  render() {
    const style = document.currentScript.ownerDocument.querySelector('style').outerHTML
    const replaceStyle = new Function(`return \`${style}\``)
    const template = document.currentScript.ownerDocument.querySelector('template').innerHTML
    const replaceTemplate = new Function(`return \`${template}\``)

    return `
      ${replaceStyle.call(this)}
      ${replaceTemplate.call(this)}
    `
  }
}
