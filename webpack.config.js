module.exports = {
    devtool: 'source-map',

    entry:  __dirname + "/index.js",
    output: {
        path: __dirname + "/",
        filename: "bundle.js"
    },

    module: {
        loaders: [
        {
            test: /\.json$/,
            loader: "json"
        },
        {
            test: /\.js$/,
            loaders: ['babel'],
            exclude: /node_modules/,
            include: path.join(process.cwd(), 'src')
        },
        {
            test: /\.css$/,
            loader: 'style!css'//添加对样式表的处理
        }
        ]
    },

    devServer: {
        contentBase: "./test/",
        port: 8888,
        colors: true,
        historyApiFallback: true,
        inline: true
    }
}
