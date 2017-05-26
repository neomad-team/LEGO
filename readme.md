# LEGO: Modern Web Components layer

LEGO (Light Embedded Gluten-free Objects) is a thin layer to build bricks for your browser that are easy to digest.

It comes along the [WebComponentsJS polyfill](https://github.com/webcomponents/webcomponentsjs) to create more readable Web Components.

## Create your element

```html
<my-component>Content of my component</my-component>
<script src=./src/lego.js></script>
<script>
  // Create your own class
  class MyComponent extends Component {}
  // Enable <my-component> HTML element
  customElements.define('my-component', MyComponent)
</script>
```

Not much happening, but you have a custom web component!


## Just a thin layer

When extending `Component`, you basically add some shortcuts to native HTMLElement.

It's still fully compatible with native _custom elements_. No magic behind the scene,
no complexity, just a couple of useful methods to write native web components easier.


## Available methods

**watch()**: should return the _array_ of names of attributes to watch for a change.
When the attribute is changed, the component is re-`render`ed.

**defaults()**: should return an object with the name of the attributes and their matching
default values. If the attribute is not declared, this value will be taken.

**value(attributeName)**: a method to retrieve the attribute value. If the attribute
has no value, the default value will be taken.

**render()**: should return a string which is the HTML content of the component.
If `<slot></slot>` is in the string, it will be replaced by the children of your custom element. 
