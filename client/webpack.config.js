const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
// const WorkboxPlugin = require('workbox-webpack-plugin');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    // devServer: {
    //   hot: 'only',
    // },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'JATE',
      }),
      // new InjectManifest({
      //   swSrc: './src-sw.js',
      //   swDest: 'src-sw.js',
      // }),
      new WebpackPwaManifest({
        fingerprints: false,
        inject: true,
        name: 'just another text editor',
        short_name: 'just another text editor',
        description: 'just another text editor',
        background_color: '#01579b',
        theme_color: '#ffffff',
        start_url: './',
        publicPath: './',
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('assets', 'icons'),
          },
        ],
      }),
      // new WorkboxPlugin.GenerateSW({
      //   exclude: [/\.(?:png|jpg|jpeg|svg)$/],
      //   runtimeCaching: [
      //     {
      //       urlPattern: /\.(?:png|jpg|jpeg|svg)$/,
      //       handler: 'CacheFirst',
      //       options: {
      //         cacheName: 'images',
      //         expiration: {
      //           maxEntries: 10,
      //         }
      //       }
      //     }
      //   ],
      // }),

      

],

    module: {
      rules: [
        {
          //add rule for css plugin
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          //add rule for images
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
        },
        {
          // ignore node_modules
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
        }
      }
      ],
    },
  };
};
