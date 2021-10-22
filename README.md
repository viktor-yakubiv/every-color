# Every Color

_Write English, not a code._

A library, letting you write semantic CSS classes
that look like a sentences.

It derives from the common theming techniques and slang used by designers.
See examples below.

## Examples

Examples bellow assume following:

* `.box` applies some padding to make the element look nicer
* `.stack` applies vertical spacing between children
* `.a`, `.with`, `.&` are not and will never be defined

### Alert

```html
<div class="a box & stack with a danger neutral surface">
  <h3>404 Not Found</h3>
  <p>The resource you are looking for was removed or never existed.</p>
</div>
```

### Button

```html
<button class="a box with a primary surface">OK</button>
```

## License

[MIT](./LICENSE)
