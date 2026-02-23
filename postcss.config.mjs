import autoprefixer from 'autoprefixer'
import cssnano from 'cssnano'
import prefixSelector from 'postcss-prefix-selector'

export default {
  plugins: {
    "@tailwindcss/postcss": {},
    autoprefixer: {},
    cssnano: {
      preset: ['default', {
        mergeRules: false, // prevents Tailwind breakpoints from collapsing
        calc: false
      }]
    },
    "postcss-prefix-selector": {
      prefix: '#color-palette-builder',
      transform(prefix, selector) {
        if (selector === ':root' || selector === ':host') return prefix
        // keep everything else the same, but add the prefix to the beginning of the selector
        if (selector === 'body' || selector === 'html') return selector  // keep global stuff
        return selector.startsWith(prefix) ? selector : `${prefix} ${selector}`
      }
    }
  }
}
