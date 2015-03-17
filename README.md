# locales-load
load locales phrases from dictionary folder into `res.locals`

# example
``` javascript
var app = express();


var Locales= require('../');
Locales.configure({ 
	dict: path.resolve(__dirname,'./locales'), 
	langs: ['en', 'zh'], 
	defaultLang: 'en',
	session: 'locale'
})

// used in middleware
// for example index, load locales for index
app.get('/', Locales.load('index'), views.index);
```