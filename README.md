# junnic.github.io

一个现代的学术主页与笔记门户。

## 笔记门户使用说明

- 入口页面：`note.html`
- 路由：通过查询参数 `?note=slug` 打开笔记，例如 `note.html?note=sample`。
- 左栏：笔记卡片列表、搜索框、标签 chips、分页。
- 右栏：标题、元信息、目录（自动生成）、正文区域。
- 渲染：支持 Markdown（marked.js）、代码高亮与行号（Prism.js）、数学公式（KaTeX）。
- 交互：支持 `js-run` 与 `py-run` 交互单元，点击“运行”即可在页面输出结果；Python 首次运行自动加载 Pyodide。
 - 交互：支持 `js-run` 与 `py-run` 交互单元，点击“运行”即可在页面输出结果；Python 首次运行自动加载 Pyodide。
 - JS 交互增强：
	 - 支持 `await`（内部以 `AsyncFunction` 执行）。
	 - 自动返回最后表达式：结尾为表达式时无需写 `return` 即可展示结果。
	 - 若已往 `RUN_CTX.out` 插入图表/DOM，文本结果不会覆盖该输出。

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

  - 结尾表达式会被自动 `return`，例如：

	```
	```js-run
	const Ts = [1,2,3];
	Ts.map(x => x*x) // 将显示 [1,4,9]
	```
	```

  - JS 单元可使用 `await`：

	```js
	await new Promise(r => setTimeout(r, 300));
	'done after await'
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
	// 显示加载状态 + 绘制图表
	RUN_CTX.out.textContent = 'Loading Plotly…';
	async function ensurePlotly(){
		if(!window.Plotly){
			await new Promise(resolve => {
				const s = document.createElement('script');
				s.src = 'https://cdn.plot.ly/plotly-2.27.0.min.js';
				s.onload = resolve;
				s.onerror = resolve;
				document.body.appendChild(s);
			});
		}
	}
	await ensurePlotly();
	RUN_CTX.out.textContent = 'Rendering chart…';
	const el = document.createElement('div');
	RUN_CTX.out.innerHTML = '';
	RUN_CTX.out.appendChild(el);
	await Plotly.newPlot(el, [{x:[1,2], y:[3,4]}], {margin:{t:10}});
	'Plotly chart ready';
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
npm install
node server.js
```

然后用浏览器访问 `http://localhost:3000/note.html`，受限的笔记可放在 `notes/secure/` 目录，并在服务器中配置访问保护。
 
 环境变量：
 
 - `PORT`：服务器端口，默认 `3000`
 - `NOTES_USER` 与 `NOTES_PASS`：Basic Auth 用户名与密码，默认 `user`/`pass123`

> 注意：若继续使用 GitHub Pages 托管静态站点，受限内容无法通过“服务端”保护。请改用上述托管或接入 Cloudflare Access。

## 开发与自测

- 直接用浏览器打开 `index.html` 与 `note.html` 进行自测。
- 若本地文件协议有跨域限制，或需完整交互（Pyodide、Plotly 等 CDN 脚本加载），可通过上面的 Express 服务器进行预览：

	```bash
	cd server && npm install && node server.js
	# 打开 http://localhost:3000/note.html?note=sample
	```

 已知限制与提示：
 
 - 第三方 CDN 资源加载失败会导致部分功能不可用（如数学、Python、图表）。
 - JS 自动返回仅针对“最后一行是表达式”的常见场景，复杂控制流仍需手动 `return`。
 - 若 JS 单元往 `RUN_CTX.out` 插入了 DOM，文本结果不会再覆盖该输出。

## 常见问题（FAQ）

- **CDN 加载失败**: 数学、Python 或图表不显示，常见于网络受限。
	- 解决: 刷新页面；确认能访问 `cdn.jsdelivr.net` / `cdn.plot.ly`；在本地用 Express 服务器预览；必要时替换备用 CDN。
- **JS 自动返回的限制**: 仅当“最后一行是表达式”时会自动 `return`。
	- 复杂控制流（如 `if/for/try` 等）需显式 `return`；否则将显示“完成，无返回值”。
- **JS await 支持**: `js-run` 支持 `await`，执行器为 `AsyncFunction`。
	- 建议: 异步流程结束后保留一个表达式或使用 `return`，或直接将结果写入 `RUN_CTX.out`。
- **结果显示优先级**: 若代码向 `RUN_CTX.out` 插入了图表/DOM，则不会再用文本覆盖输出。
	- 需要文本结果时，请在完成 DOM 操作后再保留返回表达式或手动 `return`。
- **Pyodide 首次较慢**: 第一次运行 `py-run` 会下载 Pyodide。
	- 解决: 等待加载完成；后续运行会更快。
- **Plotly 图表不显示**: 常见原因是未 `await` Plotly 的加载或输出容器未使用 `RUN_CTX.out`。
	- 解决: 按 README 的 `ensurePlotly()` 示例加载后，再调用 `Plotly.newPlot(RUN_CTX.out, ...)`。

## 许可证

站点内容为个人作品；所用库遵循各自的开源许可证（marked.js、Prism.js、KaTeX、Pyodide、Plotly）。
