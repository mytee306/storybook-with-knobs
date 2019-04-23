module.exports = {
  mode: 'production',
  entry: './src/utils/withKnobs.ts',
  output: {
    path: __dirname,
    filename: './index.js',
  },
  module: {
    rules: [
      {
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-typescript'],
            },
          },
        ],
      },
    ],
  },
};
