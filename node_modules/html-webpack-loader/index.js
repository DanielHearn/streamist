
const loaderUtils = require("loader-utils");
const tool = require('./lib/tool');
const fs = require('fs');

const htmlReplace = tool.HtmlReplace;



const _html_webpack_loader = function(content){


	(function(options){
		for(let i in options){
			tool.method.options[i] = options[i];
		}

	}(loaderUtils.getOptions(this) || {}))

	content = htmlReplace.assemble(content, this.context);
	

	var exportsString = "module.exports = ";
	
	return exportsString + JSON.stringify(content).replace(/\${mask_x_x_letter#(.*?)#mask_x_x_letter}/g, (aims, str1, str2) => {
		let data = tool.method.db.resources[aims];

		if(data.type){
			return '" + require("html-webpack-loader/plugins")(require(' + JSON.stringify('./'+data.src)+ ')) + "';
		}else return '" + require(' + JSON.stringify('./'+data)+ ') + "';

	})+ ";";
}

module.exports = _html_webpack_loader;




