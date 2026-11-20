# Jinkun Liao — 个人学术主页

原始中子星（proto-neutron star）冷却与超新星中微子方向的个人学术网站。纯静态 HTML / CSS / JS，无需构建，由 GitHub Pages 直接托管。

在线地址：<https://jinkun-liao.github.io/junnic.github.io/>

## 目录结构

| 路径 | 说明 |
| --- | --- |
| `index.html` | 主页（单页）：简介 · 研究 · 论文 · 学会发表 · 联系方式 |
| `note.html`、`notes/` | 笔记门户（Markdown 渲染、目录、数学公式、代码高亮） |
| `404.html` | 404 页面；旧链接（如 `publications.html`）会自动跳转到主页对应部分 |
| `assets/css/style.css` | 全站样式（颜色变量集中在文件开头，含浅色 / 深色模式） |
| `assets/css/notes.css` | 仅笔记页使用的样式 |
| `assets/js/site.js` | 语言切换、移动端菜单、导航高亮、BibTeX 展开与复制 |
| `assets/img/` | 头像、论文配图、网站图标 |

## 常见更新

内容都在 `index.html` 中，按 `<!-- ============ … ============ -->` 区块注释查找。

- **新增论文**：在 Publications 区块复制一个 `<article class="pub">`，修改标题、作者、链接与 BibTeX。BibTeX 区块的 `id` 必须唯一，并同步修改按钮的 `aria-controls` 和 `data-copy`。
- **新增学会发表**：在 Presentations 列表顶部复制一个 `<li class="talk">`（新的在上）。类型写 `data-kind="oral"`（口头）或 `data-kind="poster"`（海报），标签文字会随语言自动切换。
- **添加 CV / ORCID / researchmap / Google Scholar**：简介区 `hero-actions` 中有注释掉的示例，填入地址后取消注释即可（CV 可放在 `assets/cv.pdf`）。
- **多语言**：需要切换的文字写成三份：
  `<span class="lang-en">…</span><span class="lang-zh" lang="zh-CN">…</span><span class="lang-ja" lang="ja">…</span>`。
  论文与发表的标题、会议名保持原文，不翻译。默认语言依次为：访客上次的选择 → 浏览器语言 → 英文。

## 本地预览

```bash
python3 -m http.server 8000
```

然后打开 <http://localhost:8000>。笔记页通过 `fetch` 读取 Markdown，直接双击打开 HTML 文件时笔记无法加载。

## 部署与网址

推送到 `main` 分支后，GitHub Pages 会自动发布。

当前仓库名 `junnic.github.io` 与 GitHub 用户名 `Jinkun-Liao` 不一致，所以网站被当作“项目站点”发布在子路径 `/junnic.github.io/` 下。如果把仓库重命名为 **`Jinkun-Liao.github.io`**，网址会变为更简洁的 <https://jinkun-liao.github.io/>。重命名后，请同步修改 `index.html` 头部 `og:url`、`og:image` 以及 JSON-LD 中的绝对地址。

## 笔记

1. 在 `notes/` 中新建 Markdown 文件，例如 `my-note.md`。
2. 在 `notes/index.json` 中追加一条记录：

   ```json
   { "title": "标题", "slug": "my-note", "date": "2026-01-01", "tags": ["标签"], "lang": "zh", "summary": "一句话摘要" }
   ```

3. 访问 `note.html?note=my-note`。

支持 KaTeX 数学公式（`$…$`、`$$…$$`）、Prism 代码高亮与行号、表格放大查看，以及可在页面中运行的代码块：` ```js-run `（支持 `await`，输出容器为 `RUN_CTX.out`，最后一行表达式会自动作为结果显示）和 ` ```py-run `（首次运行时自动加载 Pyodide）。

> GitHub Pages 是纯静态托管，无法对笔记做服务端密码保护；不公开的内容请不要放在本仓库中。

## 许可

站点内容为个人作品。第三方库（marked、Prism、KaTeX、Pyodide、Font Awesome）遵循各自的开源许可。
