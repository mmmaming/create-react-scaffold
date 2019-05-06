const webpack = require('webpack');
const path = require('path');
const webpackDevMiddleware = require("webpack-dev-middleware")
const webpackHotMiddleware = require("webpack-hot-middleware");
const jsonServer = require('json-server')
const config = require('./webpack.config.js');
const app = jsonServer.create()
const router = jsonServer.router(path.join(__dirname, '/mock', 'db.json'))
const middlewares = jsonServer.defaults()
const compiler = webpack(config);
const port = 9527;

app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
  noInfo: true
}));

app.use(webpackHotMiddleware(compiler));

app.use(middlewares);

app.use(router);

app.listen(port, err => {
	if (err) {
		console.log(err);
		return;
	}

	console.log(`Listening at http://localhost:${port}`);
});