/*
  Tiny, smart, single-method animation library for CSS animations - TweenMax-style.
  Returns a Promise that resolves when the transition has ended.

  Usage:
    Single element:
      AnimationService.animate(element, time, to)
      AnimationService.animate(element, time, from, to)

    Multiple elements with stagger:
      AnimationService.animate(elements, time, to, [staggerDelay])
      AnimationService.animate(elements, time, from, to, [staggerDelay])

  Example:
    // Get an array of elements
    var els = [].slice.call(document.querySelectorAll('.animated-thing'))

    // from-state
    var from = {
      opacity: 0,
      transform: 'translate3d(100px, 0, 0) rotateY(20deg)'
    }

    // to-state
    var to = {
      opacity: 1,
      transform: 'translate3d(0, 0, 0) rotateY(0)',
      ease: 'ease-out', // Custom attribute in {to} for quick ease
      delay: 100 // Custom attribute in {to} for adding delay to the start of the animation
    }

    // 50 millisecond delay between the animations of the individual elements
    var staggerDelay = 50

    // For one second
    var time = 1000

    AnimationService.animate(els, time, from, to, staggerDelay).then(() => {
      alert('Animation completed!')
    })
*/

const AnimationService = (() => {
  function setStyles(el, styles) {
    for (var prop in styles) {
      el.style[prop] = styles[prop]
    }
  }

  const controller = {
    animate(target, time, arg1, arg2, arg3) {
      var els = Array.isArray(target) ? target : [target]
      var from = typeof arg2 === 'object' ? arg1 : null
      var to = from ? arg2 : arg1
      var staggerDelay = (from ? arg3 : arg2) || 0

      els.forEach((el) => {
        el.style.transition = 'none'
        el.removeEventListener('transitionend', el.__onTransitionEnd)

        if (from) {
          setStyles(el, from)
        }
      })

      els[0].offsetWidth // trigger layout

      els.forEach((el, i) => {
        el.style.transition = 'all'
        el.style.transitionDuration = time + 'ms'
        el.style.transitionTimingFunction = to.ease ? to.ease : 'ease'
        el.style.transitionDelay = ((to.delay ? to.delay : 0) + (staggerDelay * i)) + 'ms'
        setStyles(el, to)
      })

      return new Promise((resolve) => {
        var transitionTarget = els[els.length - 1]
        transitionTarget.__onTransitionEnd = function(event) {
          if (event.target === transitionTarget) {
            event.target.removeEventListener('transitionend', event.target.__onTransitionEnd)
            resolve()
          }
        }
        transitionTarget.addEventListener('transitionend', transitionTarget.__onTransitionEnd)
      })
    }
  }

  return controller
})()

if (typeof module != 'undefined') module.exports = AnimationService
if (typeof exports != 'undefined') exports['default'] = AnimationService
