// craco.config.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      // Remove the existing HtmlWebpackPlugin instances
      webpackConfig.plugins = webpackConfig.plugins.filter(
        (plugin) => !(plugin instanceof HtmlWebpackPlugin)
      );

      // Add language-specific HtmlWebpackPlugins
      const languages = ['en', 'ar'];

      languages.forEach((lang) => {
        webpackConfig.plugins.push(
          new HtmlWebpackPlugin({
            inject: true,
            template: path.resolve(__dirname, `public_langs/${lang}/index.html`),
            filename: `${lang}/index.html`,
            chunks: ['main'],
          })
        );
      });

      // Adjust output
      webpackConfig.output.publicPath = '/';

      return webpackConfig;
    },
  },
  devServer: {
    historyApiFallback: false, // Disable default history API fallback

    // Add custom middleware using onBeforeSetupMiddleware
    onBeforeSetupMiddleware: function (devServer) {
      devServer.app.get('/:lang(en|ar)', (req, res, next) => {
        const lang = req.params.lang;
        const filename = path.join(devServer.compiler.outputPath, `${lang}/index.html`);
        devServer.compiler.outputFileSystem.readFile(filename, (err, result) => {
          if (err) {
            return next(err);
          }
          res.set('content-type', 'text/html');
          res.send(result);
          res.end();
        });
      });

      devServer.app.get('/:lang(en|ar)/*', (req, res, next) => {
        const lang = req.params.lang;
        const filename = path.join(devServer.compiler.outputPath, `${lang}/index.html`);
        devServer.compiler.outputFileSystem.readFile(filename, (err, result) => {
          if (err) {
            return next(err);
          }
          res.set('content-type', 'text/html');
          res.send(result);
          res.end();
        });
      });

      // Redirect root to /en
      devServer.app.get('/', (req, res) => {
        res.redirect('/en');
      });
    },
  },
};
