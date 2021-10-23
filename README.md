# Every Color

_Write English, not a code._

A library, letting you write semantic CSS classes
that look like a sentences.

It derives from the common theming techniques and slang used by designers.
See examples below.

## API

The library supports the following list of classes
that could be used simultaneously.

Object classes are nouns and have a controlling role.
All others are adjectives and meant to be modifiers.

### Object

* `content` — applies text and icons color on the current background
* `surface` — applies block background and defines text and icons colors
  that are suitable for the background

### Accent

The color accent could be applied either to _content_ or _surface_.
If applied to the content,
it updates the text color, relatively to the current surface.
If applied to the surface,
it sets the surface background and the surface controls the text color
based on the other modifiers.

If used with neither `.content` nor `.surface`,
it assumes to be applied to content, i.e. text and icons.

* `default`
* `primary`
* `info`
* `positive`
* `warning`
* `danger`

### Contrast

The contrast schema, relative to the current theme.

* `neutral` — blends into the background
* `vibrant` — contrasts with the background

### Emphasis

Emphasis applies to _content_ only
but for convenience could be used without `.content`.

* `major` — high emphasis
* `minor` — medium emphasis

## Examples

Examples below assume the following:

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

### Details list

<dl id="details-list">
  <dt class="minor">Update date</dt>
  <dd class="major">yesterday</dd>
</dl>

### Simple text

```html
<p>15&nbsp;<span class="minor content">KiB</span></p>
```

```html
<p>1&nbsp;<span class="minor">Mb</span></p>
```

## Playground

[Try it out](https://codepen.io/yakubiv/pen/BadQgZw?editors=1000) on CodePen.

## License

[MIT](./LICENSE)
