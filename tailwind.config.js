module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  purge: [],
  theme: {
    extend: {
      height: {
        '100vh': '100vh'
      },

      fontSize: {
        'extra-xss': '0.50rem',
        'extra-xs': '0.65rem'
      },

      borderWidth: {
        '1': '1px'
      },

      minWidth: {
        '26rem': '26rem',
        'screen': '100vw'
      }
    },
  },
  variants: {},
  plugins: [],
}
