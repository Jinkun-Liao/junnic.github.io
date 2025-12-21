# junnic.github.io

一个现代的学术主页与笔记门户。

## 笔记门户使用说明

- 入口页面：`note.html`
- 路由：通过查询参数 `?note=slug` 打开笔记，例如 `note.html?note=sample`。
- 左栏：笔记卡片列表、搜索框、标签 chips、分页。
- 右栏：标题、元信息、目录（自动生成）、正文区域。
- 渲染：支持 Markdown（marked.js）、代码高亮与行号（Prism.js）、数学公式（KaTeX）。
- 交互：支持 `js-run` 与 `py-run` 交互单元，点击“运行”即可在页面输出结果；Python 首次运行自动加载 Pyodide。

### 添加新笔记

1. 在 `notes/` 目录新增一个 Markdown 文件，如 `my-note.md`。
2. 在 `notes/index.json` 追加一条索引记录（示例）：

	 ```json
	 {
		 "title": "我的新笔记",
		 "slug": "my-note",
		 "date": "2025-12-22",
		 "tags": ["astro", "demo"],
		 "lang": "zh",
		 "summary": "一句话摘要。"
	 }
	 ```

3. 在浏览器打开 `note.html?note=my-note` 即可查看。

### 交互单元用法

- JS 单元：在 Markdown 中使用代码围栏 ` ```js-run `，示例：

	```
	```js-run
	// 使用 RUN_CTX.out 作为输出容器
	const el = document.createElement('div');
	RUN_CTX.out.innerHTML = '';
	RUN_CTX.out.appendChild(el);
	el.textContent = 'Hello JS-run!';
	```
	```

- Python 单元：使用 ` ```py-run `，示例：

	```
	```py-run
	def f(x):
			return x**2
	[ (i, f(i)) for i in range(5) ]
	```
	```

- 数学公式：行内 `$...$`，块级 `$$...$$`，KaTeX 自动渲染。

- Plotly：在 JS 单元中按需加载：

	```js
	async function ensurePlotly(){
		if(!window.Plotly){
			await new Promise(resolve => {
				const s = document.createElement('script');
				s.src = 'https://cdn.plot.ly/plotly-2.27.0.min.js';
				s.onload = resolve; document.body.appendChild(s);
			});
		}
	}
	await ensurePlotly();
	Plotly.newPlot(RUN_CTX.out, [{x:[1,2], y:[3,4]}]);
	```

### 示例笔记

- `sample.md`：原初中子星冷却的示例（数学+代码+交互）。
- `qiita-lines.md`：代码行号展示（Prism 行号、复制、语言标签）。
- `interactive-demo.md`：滑块参数、Plotly 图、可折叠练习。
- `nakasho-portal.md`：门户模式与路由机制说明。

## 样式统一

笔记门户相关样式已迁移至 `stylesheet.css`，包括列表、详情、Prism 覆盖、交互块、分页等。

## 聚合与分页

左栏列表支持搜索、标签筛选与分页（每页 10 条）。后续可扩展日期聚合（按年/月）视图。

## 受限笔记的服务端保护

GitHub Pages 不支持服务端逻辑。如果需要对部分笔记进行“服务端密码保护”，请使用以下方案之一：

- 部署到支持服务端的托管平台（如 Render、Railway、Vercel、Netlify Functions），并将受限路径（例如 `/notes/secure/`）通过中间件进行保护。
- 使用 Cloudflare Access 为特定路径添加登录门槛。

本仓库提供一个简易 Express 服务器示例（用于本地或自托管）：

```
server/server.js
```

启动示例：

```bash
cd server
npx pnpm add express basic-auth serve-static
node server.js
```

然后用浏览器访问 `http://localhost:3000/note.html`，受限的笔记可放在 `notes/secure/` 目录，并在服务器中配置访问保护。

> 注意：若继续使用 GitHub Pages 托管静态站点，受限内容无法通过“服务端”保护。请改用上述托管或接入 Cloudflare Access。

## 开发与自测

- 直接用浏览器打开 `index.html` 与 `note.html` 进行自测。
- 若本地文件协议有跨域限制，可通过一个静态服务器（如 `npx serve`）或上面的 Express 服务器进行预览。

## 许可证

站点内容为个人作品；所用库遵循各自的开源许可证（marked.js、Prism.js、KaTeX、Pyodide、Plotly）。
