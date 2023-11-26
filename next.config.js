/** @type {import('next').NextConfig} */

module.exports = {
    reactStrictMode: true,
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
      config.module.rules.push({
        test: /\.(csv)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: "[path][name].[ext]",
              emitFile: true,
            },
          },
        ],
      });
  
      // Important: return the modified config
      return config;
    },
  };
  
