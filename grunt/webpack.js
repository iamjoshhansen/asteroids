var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
	'asteroids': {
		entry: './<%= app.source_dir %>/<%= app.name %>.ts',
		output: {
			path: './<%= app.build_dir %>/',
			filename: '<%= app.name %>.js'
		},
		module: {
			loaders: [
				// TypeScript
				{
					test: /\.ts$/,
					loader: 'ts-loader'
				}
				// },

				// // HTML
				// {
				// 	test: /\.html$/,
				// 	loaders: ['html']
				// },

				// // JSON
				// {
				// 	test: /\.json$/,
				// 	loaders: ['json']
				// },

				// // SCSS
				// {
				// 	test: /\.scss$/,
				// 	loader:  ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader')
				// },

				// // Fonts -- With special inclusion for icon svg font
				// {
				// 	test: /.+\.(eot|ttf|woff)$/,
				// 	loader:  'file-loader?name=fonts/[name].[ext]'
				// },

				// // Images -- With special exclusion for icon svg font
				// {
				// 	test: /.+\.(svg|png|jpg|gif)$/,
				// 	loader:  'file-loader?name=images/[name].[ext]'
				// }
			]
		},
		plugins: [
			new ExtractTextPlugin('<%= app.name %>.css')
		],
		resolve: {
			extensions: ["", ".ts"]
		}
	}
};
