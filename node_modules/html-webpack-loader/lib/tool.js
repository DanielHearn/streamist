
const UglifyJS = require('../rely/uglify-js/tools/node');
const tss = require('../rely/typescript-simple/index');
const fs = require('fs');
const sass = require('node-sass');
let tscofnig = require('./tscofnig.json');
const Regular = require('./regular');

function getResourcesName(){
	return '${mask_x_x_letter#'+(Math.random()+Math.random()).toFixed(10)+'#mask_x_x_letter}'
}

Object.concat = function(){
	if(arguments.length == 0) return {};
	let _object = {...arguments[0]};
	delete arguments[0];
	for(let data of arguments){
		if(data == void 0) continue;
		for(let _j in data){
			_object[_j] = data[_j];
		}
	}
	return _object;
}

class HtmlReplace{

	constructor(){}

	assemble(content, pathurl){

		content = method.include(content, pathurl);

		content = this.formatCJ( 'style', content );
		content = this.formatCJ( 'script', content );
		content = method.attributes( content );


		return content;
		
	}

	formatCJ( element, str ) {
		let $this = this;
		return str.replace(Regular.extractHtml(element), (aims, str1, str2) => {
			if(str2.replace(/\s/g,'') == '') return aims;
			let name = `#${element}:`+new Date().getTime()+(Math.random()*1000000).toFixed(0);
			let html = `${element=='script' ? 'declare const require: any;\r\n\t' : ''}`+str2;
			
			html = element == 'style' ? this.__cssTransform( html ) : this.__jsTransform( html );
			
			return `<${element} ${str1}>${html}</${element}>`;
		});
	}

	__jsTransform( html) {
		let _html = html;
		_html = method.jsTransform.import_transform(_html);
		_html = method.jsTransform.ts_js(_html);
		_html = method.jsTransform.js_uglify(_html);
		if(_html.error) return;
		_html = method.jsTransform.js_require(_html);
		return  _html;
	}

	__cssTransform( html ) {
		let styleHtml = method.cssTransform.sass_css(html);
		return method.cssTransform.background(styleHtml);
	}



}

let method = {
	options: {
		cssmin: true,
		jsmin: true,
		attributes: [ 'img:src', 'script:src', 'link:href', 'video:src', 'audio:src', 'source:src' ],
		ts:{
			enabled: true,
			options: tscofnig
		}
	},
	db: {
		resources: {},
	},
	include: ( content, pathurl ) => {
		let transfrom = function(aims, index){
			try {
				return fs.readFileSync(`${pathurl}\/${index}`,{encoding:'utf8'});
			} catch(e) {
				return e;
			}
		}
		return content.replace(Regular.include('html'), transfrom).replace(Regular.include('css_js'), transfrom);
	},
	cssTransform: {
		sass_css: ( str ) => {
			return sass.renderSync({
				data: str, outputStyle: method.options.cssmin == true ? 'compressed' : 'expanded'
			}).css.toString();
		},
		background: ( str ) => {
			return str.replace(Regular.background, (aims, str1) => {
				if(str1.search(Regular.url) == 0) return aims;
				let name = getResourcesName();
				method.db.resources[name] = str1;
				return aims.replace(str1, name);
			})
		}
	},
	jsTransform: {
		ts_js:  ( str ) => {
			let _ts = method.options.ts;
			if(_ts != false) return tss(str, _ts ? Object.concat(tscofnig, _ts) : tscofnig);
			return str;
		},
		js_uglify: ( str ) => {
			let result = method.options.jsmin == true ? UglifyJS.minify(str, { toplevel: true }) : {code: str};
			if(result.error) return result;
			return result.code;
		},
		js_require: ( str ) => {
			return str = str.replace(Regular.require, (aims, index, str1, str2, str3) => {
				let name = getResourcesName();
				method.db.resources[name] = { src: (str1 || str2), type: 'js' };
				return name;
			})
		},
		import_transform: ( str ) => {
			return str.replace(Regular.import, (aims, index, str1) => {
				if(index[0] != '{'){
					if(index.indexOf('as') != -1){
						return re(index);
					}else{
						return re('* as '+index)
					}
				}else{
					let _tem = '';
					for(let data of index.replace(/({|})/g,'').split(',')) 
						_tem += re(data)+'\r\n\t';
					return _tem;
				}
				function re(data){
					data = data.split('as').map(f => f.replace(/ /g, ''));
					if(data.length == 2) return `var ${data[1]} = require("${str1}")${data[0]=='*'?'':'.'+data[0]};`;
					else return `var ${data[0]} = require("${str1}")${data[0]=='*'?'':'.'+data[0]};`;
				}
			})
		}
	},
	attributes: ( str ) => {
		for(let data of method.options.attributes){
			str = str.replace(Regular.extractAttr(data.split(':')), (aims, str1, str2) => {
				if(str2.search(Regular.url) == 0) return aims;
				let name = getResourcesName();
				method.db.resources[name] = str2;
				return aims.replace(str2, name);
			})
		}
		return str;
	}
}

module.exports = {
	method: method,
	HtmlReplace: new HtmlReplace()
}

