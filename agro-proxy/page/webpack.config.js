// Webpack uses this to work with directories
const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')

// This is the main configuration object.
// Here you write different options and tell Webpack what to do
module.exports = (env, argv) => {
    process.env.NODE_ENV = argv.mode;

    return {
        // Path to your entry point. From this file Webpack will begin his work
        entry: './src/entry.js',
        
        // Path and filename of your result bundle.
        // Webpack will bundle all JavaScript into this file
        output: {
            path: path.resolve(__dirname, 'dist'),
            //filename: 'bundle.js'
        },
        module: {
            rules: [
                {
                    // Apply rule for .sass, .scss or .css files
                    test: /\.(sa|sc|c)ss$/,
                
                    // Set loaders to transform files.
                    // Loaders are applying from right to left(!)
                    // The first loader will be applied after others
                    use: [
                        {
                            // After all CSS loaders we use plugin to do his work.
                            // It gets all transformed CSS and extracts it into separate
                            // single bundled file
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                // only enable hot in development
                                hmr: argv.mode === 'development',
                                // if hmr does not work, this is a forceful method.
                                reloadAll: true,
                              }
                        },
                        {
                            // This loader resolves url() and @imports inside CSS
                            loader: "css-loader",
                            options: {
                                importLoaders: 1
                            }
                        },
                        {
                            // Then we apply postCSS fixes like autoprefixer and minifying
                            loader: "postcss-loader",
                            
                        },
                        {
                            // First we transform SASS to standard CSS
                            loader: "sass-loader",
                            options: {
                                implementation: require("sass")
                            }
                        }
                    ]
                }
                
            ]
        },
        plugins: [
            new webpack.EnvironmentPlugin({
                'NODE_ENV': argv.mode
            }),
            new MiniCssExtractPlugin({
                filename: "bundle.css"
            }),
            new HtmlWebpackPlugin({
                chunks: [],
                template: "src/index.html",
                'title': 'Agro',
                //'favicon': 'favicon.ico',
                'meta': {
                    'viewport': 'width=device-width, initial-scale=1, shrink-to-fit=no',
                    'theme-color': '#4CAF50',
                }
            })
            // ,new EventHooksPlugin({
            //     'done': () => {
            //         // delete unwanted assets 
            //     }
            // })
        ],
        optimization: {
            minimizer: [new OptimizeCSSAssetsPlugin({
                cssProcessorPluginOptions: {
                    preset: ['default', { discardComments: { removeAll: true } }],
                  }
            })]
        }
    }
};