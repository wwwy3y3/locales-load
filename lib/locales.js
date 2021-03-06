var path= require('path');
var Locales= function () {
	// init
}

/*
*	params
*	- dict
*	- langs
*	
*/
Locales.prototype.configure = function(params) {
	var self= this;
	self.dict= params.dict || path.resolve(process.cwd(), './locales');
	self.langs= params.langs;
	self.defaultLang= params.defaultLang || 'en';
	// load session settings first
	self.session= params.session || null;
};

Locales.prototype.load = function(url) {
	var self= this;
	return function (req, res, next) {
		// get best fit lang
		if(self.session && req.session)
			var lang= req.session[self.session] || req.acceptsLanguages(self.langs) || self.defaultLang;
		else
			var lang= req.acceptsLanguages(self.langs) || self.defaultLang;

		// load dict file
		var dict= require(path.resolve(self.dict, lang+'.js'));
		res.locals.locales= dict[url];
		res.locals.lang= lang;
		next();
	}
};

module.exports= Locales;