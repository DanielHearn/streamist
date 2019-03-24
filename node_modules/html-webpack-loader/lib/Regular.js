

module.exports = {

	extractAttr: ( attributes ) => {
		return new RegExp(`<${attributes[0]}\\s(.*?)${attributes[1]}=[\\'\\"](.*?)[\\'\\"](.*?)>`, 'g');
	},

	extractHtml: ( name ) => {
		return new RegExp(`<${name}\\s(.*?)>(([\\s\\S])*?)<\/${name}>`, 'g');
	},

	require: /require\((['"](.*?)['"]|_html_loader_static_single(.*?)_html_loader_static_single)\)/g,

	import: /import\s{0,}(.*?)\s{0,}from\s{0,}['"](.*?)['"](;|[\n\r])/g,

	include: (type) => {
		switch (type) {
			case 'css_js':
				return /\/\*#include\sfile=['"](.*?)['"](.*?)\*\//g;
			default:
				return /<!--#include\sfile=['"](.*?)['"](.*?)-->/g;
		}
	},

	background: /.*background[^;"]+url\(([^\)]+)\).*/g,

	url: /^(http:\/\/|https:\/\/|\/\/).*?/gi,

	format: /(\r\n)|(\n)/g,

	qm: /\"/g,

}

