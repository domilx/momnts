module.exports = function(api) {
  plugins: [
    ['transform-inline-environment-variables', {
      include: ['TAMAGUI_TARGET']
    }]
  ],
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    
  };
};
