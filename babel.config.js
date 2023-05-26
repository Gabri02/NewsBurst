module.exports = {
    presets: [
      [
        '@babel/preset-env',
        {
          targets: {
            browsers: ['last 2 versions', 'not dead', 'ie >= 11'],
            node: "current"
          },
          useBuiltIns: 'usage',
          corejs: 3,
        },
      ],
    ],
    plugins: [
      "@babel/plugin-transform-runtime"
    ]
  };
  