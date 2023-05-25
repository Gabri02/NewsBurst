module.exports = {
    presets: [
      [
        '@babel/preset-env',
        {
          targets: {
            browsers: ['last 2 versions', 'not dead', 'ie >= 11'],
          },
          useBuiltIns: 'usage',
          corejs: 3,
        },
      ],
    ],
  };
  