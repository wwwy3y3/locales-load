var Locales= function () {
	// init
}

Locales.prototype.configure = function(params) {
	var self= this;
	for(key in params)
		self[key]= params[key];
};

module.exports= Locales;