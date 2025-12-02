# OpenListThemes

为 [OpenList](https://github.com/OpenListTeam/OpenList) 提供的主题美化方案，让你只需要写几行代码就能美化界面！

## 🚀 快速开始

### 第一步：在 OpenList 后台的「自定义头部」中添加

```html
<!-- 公共资源 -->
<script src="https://polyfill.alicdn.com/v3/polyfill.min.js?features=String.prototype.replaceAll"></script>
<link rel="stylesheet" href="https://npm.elemecdn.com/lxgw-wenkai-webfont@1.1.0/lxgwwenkai-regular.css" />
<script async src="https://busuanzi.icodeq.com/busuanzi.pure.mini.js"></script>
<link type='text/css' rel="stylesheet" href="https://npm.elemecdn.com/font6pro@6.3.0/css/fontawesome.min.css" media='all'>
<link href="https://npm.elemecdn.com/font6pro@6.3.0/css/all.min.css" rel="stylesheet">
<link rel="stylesheet" href="https://npm.elemecdn.com/aplayer@1.10.1/dist/APlayer.min.css">
<script src="https://npm.elemecdn.com/aplayer@1.10.1/dist/APlayer.min.js"></script>
<script src="https://npm.elemecdn.com/meting2@0.0.1/js/Meting.min.js"></script>

<!-- ⭐ 引入 GitHub 托管的主题样式 -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/tsinglinrain/OpenListThemes@main/dist/styles.css">

<!-- ⭐ 配置主题（修改为你自己的配置） -->
<script>
window.OpenListThemeConfig = {
    // 背景图
    lightBg: "你的白天背景图URL",
    darkBg: "你的夜间背景图URL",
    // 音乐播放器
    enableMusic: true,
    musicServer: 'netease',
    musicType: 'playlist',
    musicId: '你的歌单ID',
    // 评论系统（需要自己配置 Giscus）
    enableComment: true,
    giscusRepo: "你的用户名/你的仓库",
    giscusRepoId: "你的RepoId",
    giscusCategory: "Announcements",
    giscusCategoryId: "你的CategoryId"
};
</script>

<!-- ⭐ 引入 GitHub 托管的主题脚本 -->
<script src="https://cdn.jsdelivr.net/gh/tsinglinrain/OpenListThemes@main/dist/theme.js"></script>
```

### 第二步：在 OpenList 后台的「自定义内容」中添加

```html
<div id="customize" style="display: none;">
    <div>
        <br />
        <center class="dibu">
            <div style="line-height: 20px;font-size: 9pt;font-weight: bold;">
                <span>"<span style="color: rgb(13, 109, 252); font-weight: bold;" id="hitokoto">
                    <a href="#" id="hitokoto_text">"我等的人他在多远的未来."</a>
                </span>"</span>
            </div>

            <div style="font-size: 13px; font-weight: bold;">
                <!-- 👇 修改成你自己的链接 -->
                <span class="nav-item">
                    <a class="nav-link" href="mailto:你的邮箱" target="_blank">
                        <i class="fa-duotone fa-envelope-open" style="color:#409EFF"></i> 邮箱 |
                    </a>
                </span>
                <span class="nav-item">
                    <a class="nav-link" href="你的博客地址" target="_blank">
                        <i class="fas fa-edit" style="color:#409EFF"></i> 博客 |
                    </a>
                </span>
                <span class="nav-item">
                    <a class="nav-link" href="/@manage" target="_blank">
                        <i class="fa-solid fa-folder-gear" style="color:#409EFF;"></i> 管理
                    </a>
                </span>
                <br />
                <span>
                    本站总访问量 <span id="busuanzi_value_site_pv" style="color: rgb(13, 109, 252); font-weight: bold;"></span> 次 
                    总访客数 <span id="busuanzi_value_site_uv" style="color: rgb(13, 109, 252); font-weight: bold;"></span> 人
                </span>
            </div>
        </center>
        <br /><br />
        <!-- 评论区容器 -->
        <center><div class="giscus" id="giscus"></div></center>
    </div>
    <script src="https://v1.hitokoto.cn/?encode=js&select=%23hitokoto" defer></script>
</div>
```

> **注意**：自定义内容中不需要写延迟加载的 JS 了，`theme.js` 会自动处理！

## 📁 项目结构

```
OpenListThemes/
├── dist/                    # 发布文件（用于 CDN 引用）
│   ├── header.html          # 公共头部资源
│   ├── styles.css           # 公共样式
│   ├── content.html         # 内容模板参考
│   └── theme.js             # 主题配置脚本
├── Ori/                     # 原始完整版本（参考用）
│   ├── header.html
│   └── content.html
└── readme.md
```

## ⚙️ 配置选项

| 配置项 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `lightBg` | string | '' | 白天模式背景图 URL |
| `darkBg` | string | '' | 夜间模式背景图 URL |
| `lightOpacity` | number | 0.8 | 白天模式透明度 |
| `darkOpacity` | number | 0.5 | 夜间模式透明度 |
| `enableMusic` | boolean | false | 是否启用音乐播放器 |
| `musicServer` | string | 'netease' | 音乐平台 (netease/tencent/kugou) |
| `musicType` | string | 'playlist' | 音乐类型 |
| `musicId` | string | '' | 歌单/歌曲 ID |
| `enableComment` | boolean | false | 是否启用评论 |
| `giscusRepo` | string | '' | Giscus 仓库名 |
| `giscusRepoId` | string | '' | Giscus 仓库 ID |
| `giscusCategory` | string | '' | Giscus 分类 |
| `giscusCategoryId` | string | '' | Giscus 分类 ID |

## 🔗 CDN 地址

本项目托管在 GitHub，通过 jsDelivr CDN 访问：

- 样式文件：`https://cdn.jsdelivr.net/gh/tsinglinrain/OpenListThemes@main/dist/styles.css`
- 脚本文件：`https://cdn.jsdelivr.net/gh/tsinglinrain/OpenListThemes@main/dist/theme.js`

如果你 Fork 了本仓库，将 `tsinglinrain` 替换成你的 GitHub 用户名即可。

## 📝 使用步骤

1. Fork 本仓库到你的 GitHub 账号
2. 修改 `dist/` 中的文件（可选）
3. 将 CDN 地址中的 `用户名` 替换成你的 GitHub 用户名
4. 在 OpenList 后台填入自定义头部和自定义内容
5. 享受美化后的界面！

## 🙏 致谢

- 原始主题来自 Tsing
- 感谢安稳的帮助

