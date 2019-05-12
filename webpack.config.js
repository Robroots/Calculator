var path = require('path');

module.exports = {
    entry: "./js/app.js",
    output: {
        filename: "out.js",
        path: path.resolve(__dirname, 'js')
    },
    mode: 'development',
    watch: true,
    devtool: true,
    module: {
        rules: [
            {
                test: /\.js$/,
                use: ["source-map-loader"],
                enforce: "pre"
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015']
                    }
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
        ]
    }
}
