//引入html-webpack-plugin插件
const HtmlWebpackPlugin=require("html-webpack-plugin");
//引入path模块
const path=require('path');


//导出模块
module.exports={
    //入口文件
    entry:"./src/index.js",
    //打包目录及文件名
    output:{
        path:path.resolve(__dirname,"dist"),
        filename:"js/bundle.js"
    },
    //插件
    plugins:[
       new HtmlWebpackPlugin({
          filename:"index.html",
          template:"./src/index.html"
       }),
      
    ],
    module:{
		loaders:[
            {
            test:/\.css$/,
            loader:'style-loader!css-loader'
            },
            // {
            //     test:/\.less$/,
            //     loader:'style-loader!css-loader!less-loader'
            //  },
             {
                test: /\.jsx?$/,//表示要编译的文件的类型，这里要编译的是js文件
                loader: 'babel-loader',//装载的哪些模块
                exclude: /node_modules/,//标识不编译node_modules文件夹下面的内容
                query: {//具体的编译的类型，
                compact: false,//表示不压缩
                presets: ['es2015','react']//我们需要编译的是react
                   }
              },
              
               // {
               //    test:/\.(jpg|png|gif)$/,
               //    loader:'file-loader'
               // }
               {
                  test:/\.(jpg|png|gif)$/,
                  loader:'url-loader',
                  options:{
                    limit:10000,//限制小于10000字节,进行url编码,大于10000字节的图片，同file-loader
                    name:'img/[name]_[hash].[ext]'
                  }
                },
                {
                       test:/\.(eot|svg|ttf|woff|woff2)$/,
                       loader:'file-loader',
                       options:{
                           name:'fonts/[name]_[hash].[ext]'
                          }
                       }
                  
   
            
      
       ]
    },
    resolve:{
        extensions:['.jsx','.js','.css']
    },
 
   //  devServer:{//webpack-dev-server
   //    open:true,
   //    publicPath:"/"
   //  }



}