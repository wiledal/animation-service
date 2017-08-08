# AnimationService

A tiny library for fast, smooth, and controllable CSS transitions.

### Features:
- Animate elements _to_
- Animate elements _from to_
- Animate elements _staggered to_
- Animate elements _staggered from to_
- Returns a `Promise` which resolves when the transition is finished

### Usage:
```js
// Animate single element for 800ms with nice easing
var el = document.querySelector('.some-thing')
AnimationService.animate(el, 800, {
  transform: 'translate(200px, 100px)',
  ease: ease.inOutQuad
}).then(() => {
  alert('I was animated!')
})

// Animate multiple elements for 800ms each, starting 50ms apart
// [].slice.call to turn DOMElementList to Array
var els = [].slice.call(document.querySelector('.some-things'))
AnimationService.animate(els, 800, {
  transform: 'translate(200px, 100px)',
  ease: ease.inOutQuad
}, 50).then(() => {
  alert('Last thing was animated!')
})
```

Check out the `/examples` for in-depth code examples.
