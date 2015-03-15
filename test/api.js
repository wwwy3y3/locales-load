var path= require('path');
var express= require('express');
var request= require('supertest');
var Locales= require('../');
Locales.configure({ 
	dict: path.resolve(__dirname,'./locales'), 
	langs: ['en', 'zh'], 
	defaultLang: 'en'  
})

describe('API', function(){
	it('store write dict set in res.locals', function (done) {
		var app = express();

		app.use(function(req, res){
			Locales.load('index_out')(req, res, function() {
				console.log(res.locals);
				res.end();
			})
		});

		request(app)
			.get('/')
			.set('Accept-Language', 'en;q=.5, en-us')
			.expect(200, done);
		
	})
})
