module.exports = {
  apps: [
    {
      name: 'wechat-article-exporter',
      port: '3000',
      exec_mode: 'cluster',
      instances: 'max',
      script: './.output/server/index.mjs',
      env: {
        NODE_ENV: 'production',
        PORT: '3000',
        NUXT_KV_DRIVER: 'fs',
        NUXT_KV_BASE: './.data/kv',
      },
    },
  ],
};
