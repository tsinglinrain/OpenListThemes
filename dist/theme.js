/**
 * OpenListThemes 主题配置脚本
 * 使用方法：在 OpenList 自定义头部中引入此文件，并在引入前定义配置
 */

(function() {
    // 默认配置
    const defaultConfig = {
        // 背景图片
        lightBg: '',
        darkBg: '',
        // 是否启用音乐播放器
        enableMusic: false,
        musicServer: 'netease',
        musicType: 'playlist',
        musicId: '',
        // 是否启用评论
        enableComment: false,
        giscusRepo: '',
        giscusRepoId: '',
        giscusCategory: '',
        giscusCategoryId: '',
        // 是否启用一言
        enableHitokoto: true,
        // 是否启用访问统计
        enableVisitorStats: true,
        // 底部链接配置
        footerLinks: [],
        // 版权文字
        copyrightText: 'OpenList',
        copyrightLink: 'https://github.com/OpenListTeam/OpenList'
    };

    // 合并用户配置
    const config = Object.assign({}, defaultConfig, window.OpenListThemeConfig || {});

    // 生成背景样式
    function generateBackgroundStyles() {
        if (!config.lightBg && !config.darkBg) return '';
        
        let styles = '';
        
        if (config.lightBg) {
            styles += `
                .hope-ui-light {
                    background-image: url("${config.lightBg}") !important;
                    background-repeat: no-repeat;
                    background-size: cover;
                    background-attachment: fixed;
                    background-position-x: center;
                }
            `;
        }
        
        if (config.darkBg) {
            styles += `
                .hope-ui-dark {
                    background-image: url("${config.darkBg}") !important;
                    background-repeat: no-repeat;
                    background-size: cover;
                    background-attachment: fixed;
                    background-position-x: center;
                }
            `;
        }
        
        return styles;
    }

    // 注入样式
    function injectStyles() {
        const bgStyles = generateBackgroundStyles();
        if (bgStyles) {
            const style = document.createElement('style');
            style.textContent = bgStyles;
            document.head.appendChild(style);
        }
    }

    // 初始化音乐播放器
    function initMusicPlayer() {
        if (!config.enableMusic || !config.musicId) return;
        
        const musicContainer = document.createElement('meting-js');
        musicContainer.setAttribute('list-folded', 'true');
        musicContainer.setAttribute('server', config.musicServer);
        musicContainer.setAttribute('type', config.musicType);
        musicContainer.setAttribute('id', config.musicId);
        musicContainer.setAttribute('fixed', 'true');
        
        document.body.appendChild(musicContainer);
    }

    // 生成底部内容
    function generateFooterContent() {
        const customize = document.getElementById('customize');
        if (!customize) return;

        // 检查是否已有内容，如果有则不覆盖
        if (customize.innerHTML.trim()) {
            return;
        }

        let linksHtml = '';
        
        // 生成底部链接
        if (config.footerLinks && config.footerLinks.length > 0) {
            config.footerLinks.forEach((link, index) => {
                const separator = index < config.footerLinks.length - 1 ? ' |' : '';
                linksHtml += `
                    <span class="nav-item">
                        <a class="nav-link" href="${link.url}" target="_blank">
                            <i class="${link.icon}" style="color:#409EFF"></i> ${link.text}${separator}
                        </a>
                    </span>
                `;
            });
        }

        // 添加版权链接
        if (config.copyrightText) {
            linksHtml += `
                <span class="nav-item">
                    <a class="nav-link" href="${config.copyrightLink}" target="_blank">
                        <i class="fa-solid fa-copyright" style="color:#409EFF;"></i> ${config.copyrightText}
                    </a>
                </span>
            `;
        }

        // 访问统计
        let statsHtml = '';
        if (config.enableVisitorStats) {
            statsHtml = `
                <br />
                <span>
                    本站总访问量 <span id="busuanzi_value_site_pv" style="color: rgb(13, 109, 252); font-weight: bold;"></span> 次 
                    总访客数 <span id="busuanzi_value_site_uv" style="color: rgb(13, 109, 252); font-weight: bold;"></span> 人
                </span>
            `;
        }

        // 一言
        let hitokotoHtml = '';
        if (config.enableHitokoto) {
            hitokotoHtml = `
                <div style="line-height: 20px;font-size: 9pt;font-weight: bold;">
                    <span>"<span style="color: rgb(13, 109, 252); font-weight: bold;" id="hitokoto">
                        <a href="#" id="hitokoto_text">"人生如逆旅，我亦是行人。"</a>
                    </span>"</span>
                </div>
            `;
        }

        // 组装完整的底部
        customize.innerHTML = `
            <div>
                <br />
                <center class="dibu">
                    ${hitokotoHtml}
                    <div style="font-size: 13px; font-weight: bold;">
                        ${linksHtml}
                        ${statsHtml}
                    </div>
                </center>
                <br /><br />
                <center><div class="giscus" id="giscus"></div></center>
            </div>
        `;

        // 加载一言脚本
        if (config.enableHitokoto) {
            const hitokotoScript = document.createElement('script');
            hitokotoScript.src = 'https://v1.hitokoto.cn/?encode=js&select=%23hitokoto';
            hitokotoScript.defer = true;
            customize.appendChild(hitokotoScript);
        }
    }

    // 初始化评论系统
    function initGiscus() {
        if (!config.enableComment || !config.giscusRepo) return;
        
        let giscusContainer = document.getElementById('giscus');
        if (!giscusContainer) return;
        
        const script = document.createElement('script');
        script.src = 'https://giscus.app/client.js';
        script.setAttribute('data-repo', config.giscusRepo);
        script.setAttribute('data-repo-id', config.giscusRepoId);
        script.setAttribute('data-category', config.giscusCategory);
        script.setAttribute('data-category-id', config.giscusCategoryId);
        script.setAttribute('data-mapping', 'pathname');
        script.setAttribute('data-strict', '0');
        script.setAttribute('data-reactions-enabled', '1');
        script.setAttribute('data-emit-metadata', '0');
        script.setAttribute('data-input-position', 'bottom');
        script.setAttribute('data-theme', 'preferred_color_scheme');
        script.setAttribute('data-lang', 'zh-CN');
        script.crossOrigin = 'anonymous';
        script.async = true;
        
        giscusContainer.appendChild(script);
    }

    // 显示自定义内容
    function showCustomize() {
        const customize = document.querySelector("#customize");
        if (customize) {
            customize.style.display = "";
        }
    }

    // 页面加载完成后初始化
    function init() {
        injectStyles();
        initMusicPlayer();
        
        // 等待页面完全加载后初始化
        let interval = setInterval(() => {
            if (document.querySelector(".footer")) {
                generateFooterContent();
                showCustomize();
                initGiscus();
                clearInterval(interval);
            }
        }, 200);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // 暴露配置供调试
    window.OpenListTheme = {
        config: config,
        version: '1.0.0'
    };
})();
