
<div align="center">
  <img width="200" height="200"
    src="https://worldvectorlogo.com/logos/html5.svg">
  <a href="https://github.com/webpack/webpack">
    <img width="200" height="200" vspace="" hspace="25"
      src="https://worldvectorlogo.com/logos/webpack.svg">
  </a>
  <h1>HTML 加载器</h1>
  <p>处理页面里的img等资源引用，scss操作及typescript操作<p>
</div>

<h2>安装</h2>

```bash
npm install -save-dev html-style-loader
```

```html
无法与html-loader共同使用
```


<h2>使用</h2>

配置如下:

```js
{
  test: /\.html$/,
  use: {
    loader: 'html-style-loader'
  }
}
```


可选项

```js
{
  test: /\.html$/,
  use: {
    loader: 'html-style-loader',
    options: {
      cssmin: true,               //是否启用css压缩
      jsmin: true,                //是否启用js压缩
      ts: {                       //ts转换目标es5
        enabled: true,            //是否启用ts转换
        noImplicitAny: false,     //是否为严格模式
        options: options          //ts参数
      }
    }
  }
}
```

公共部分引用

```html

html引用
<!--#include file="./template/text1.html" -->
css引用
/*#include file='./template/a.scss'  */
js引用
/*#include file="./template/a.js" */

```

typescript资源引用

```js

<script type="text/javascript">

	import { * as create, template } from './entry/create';
	import icon1 from 'img/CM-card.png';
	import userList from 'json/user.json';

	var json = require("json/user.json");
	var bg_img = require("img/CM-cardbg.png");


	let hello: string = 'hello,world';
	console.log(create)
	console.log(template)
	console.log(icon1)
	console.log(userList)
	console.log(bg_img)

</script>
```

html使用

```html
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<title>Hello, webpack</title>
	<style type="text/css">
		#container{
			width: 1000px;height: 100px;margin: 0 auto;
			&>img{
				border-radius: 50%;
			}
		}
	</style>
</head>
<body>
	<div id="container">
		<img src='favicon.png' alt="">
	</div>
</body>
<script type="text/javascript">

	import userList from './json/user.json';

	interface ConsoleInterface{
	    log(...msg: any[]): any;
	}

	class _Console implements ConsoleInterface{
	    constructor(){}
	    log(...msg: any[]): any{
	        console.log(msg.join(','))
	    }
	}

	let $console = new _Console();

	$console.log('hello','typescript');

	let img = new Image();
	img.src = require('./img/CM-cardbg.png');
	

	for(let user of userList){
		console.log(`姓名:${user.name},年龄:${user.age},性别:${user.gender}`)	
	}

</script>
</html>
```

email:[maskletter@outlook.com](mailto:maskletter@outlook.com)