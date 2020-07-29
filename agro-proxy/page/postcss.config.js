module.exports = ({ file, options, env }) => {
    console.log('process.env.NODE_ENV', process.env.NODE_ENV);
    console.log('env', env);

    if (process.env.NODE_ENV != 'production')
        return {};

    return {
        plugins: (loader) => {
            'autoprefixer',
            'cssnano'
            // 'postcss-import': { root: file.dirname },
            // 'postcss-preset-env': options['postcss-preset-env'] ? options['postcss-preset-env'] : false,
        }
    };
};