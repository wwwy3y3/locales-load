var path= require('path');
var express= require('express');
var should= require('should');
var request= require('supertest');
var cookieParser = require('cookie-parser');
var Locales= require('../');
Locales.configure({ 
	dict: path.resolve(__dirname,'./locales'), 
	langs: ['en', 'zh'], 
	defaultLang: 'en',
	session: 'locale'
})

describe('API', function(){
	it('should get en dict', function (done) {
		var app = express();

		app.use(function(req, res){
			Locales.load('index_out')(req, res, function() {
				res.locals.lang.should.be.equal('en');
				res.end();
			})
		});

		request(app)
			.get('/')
			.set('Accept-Language', 'en;q=.5, en-us')
			.expect(200, done);
		
	})

	it('should get zh dict', function (done) {
		var app = express();

		app.use(function(req, res){
			Locales.load('index_out')(req, res, function() {
				res.locals.lang.should.be.equal('zh');
				res.end();
			})
		});

		request(app)
			.get('/')
			.set('Accept-Language', 'zh;q=.8, en-us;q=.6')
			.expect(200, done);
		
	})

	it('should fallback to defaultLang- en', function (done) {
		var app = express();

		app.use(function(req, res){
			Locales.load('index_out')(req, res, function() {
				res.locals.lang.should.be.equal('en');
				res.end();
			})
		});

		request(app)
			.get('/')
			.set('Accept-Language', 'ja;q=.8, fr;q=.6')
			.expect(200, done);
		
	})

	it('should use session settings', function (done) {
		var app = express();
		var session = require('express-session');

		app.use(session({ 
		    cookie:{ path: '/', httpOnly: true, maxAge: null}, 
		    secret: "xyz123", 
		    key: 'express.sid'
		}));
		app.use(cookieParser());


		app.get('/setSession', function (req, res) {
			req.session.locale= 'zh';
			res.end();
		})

		app.get('/locales', function(req, res){
			Locales.load('index_out')(req, res, function() {
				res.locals.lang.should.be.equal('zh');
				res.end();
			})
		});

		var agent = request.agent(app);

		agent.get('/setSession')
			.expect(200, function () {
				agent.get('/locales')
					.set('Accept-Language', 'ja;q=.8, fr;q=.6')
					.expect(200, done);
			});
		
	})

})
