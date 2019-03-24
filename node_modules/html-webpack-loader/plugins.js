function HelloWorldPlugin(options) {
  if(typeof(options) == 'string'){
  	return `\"${options}\"`;
  }else {
  	// console.log()
  	return `${JSON.stringify(options.index || options)}`;
  };
}


module.exports = HelloWorldPlugin;
