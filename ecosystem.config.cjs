module.exports = {
    apps: [
        {
            name: 'wechat-article-exporter',
            script: './.output/server/index.mjs',
            cwd: '/home/cyuan/projects/wechat-article-exporter',
            env: {
                NODE_ENV: 'production',
                HOST: '0.0.0.0',
                PORT: 3000,
                NITRO_KV_DRIVER: 'fs',
                NITRO_KV_BASE: '.data/kv',
            },
        },
    ],
};
