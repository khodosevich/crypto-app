const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = (argv) => {

    return {
        mode: argv.mode,
        entry: {
            main: path.resolve(__dirname, './src/Main.tsx')
        },
        output: {
            path: path.resolve(__dirname, './build'),
            filename: "bundle.js"
        },
        module:{
            rules: [
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
            ],
        },
        resolve: {
            alias: {
                components: path.resolve(__dirname, 'src/components'),
            },
             extensions: ['.tsx', '.ts', '.js'],
        },
        plugins: [
            new HtmlWebpackPlugin({
                title: 'webpack Boilerplate',
                template: path.resolve(__dirname, './public/index.html'),
                filename: 'index.html',
            }),
        ],
    }
}