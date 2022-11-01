const Encore = require('@symfony/webpack-encore');

if (!Encore.isRuntimeEnvironmentConfigured()) {
  Encore.configureRuntimeEnvironment(process.env.NODE_ENV || 'dev');
}

Encore
    .setOutputPath('public/build/')
    .setPublicPath('/build')
    .addEntry('app', './assets/app.js')
    .disableSingleRuntimeChunk()
    .cleanupOutputBeforeBuild()
    .configureBabelPresetEnv((config) => {
      config.useBuiltIns = 'usage';
      config.corejs = '3.23';
    })
    .enableSassLoader()
    .enablePostCssLoader()
    .copyFiles({
      from: './assets/images',
      to: 'images/[path][name].[ext]',
    })
;

module.exports = Encore.getWebpackConfig();
