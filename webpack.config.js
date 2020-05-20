module.exports ={
    module:{

        rules:[
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use:{
                    loader:"babel-loader"
                },
            },
            {
                test:/\.css$/,
                use:['style-loader', 'css-loader']
            },
            {
                test:/\.(png|jpg)$/,
                use:[{
                    options:{
                        limit:8000,
                    },
                    loader: "url-loader"
                }]

            }
        ],

    }
}