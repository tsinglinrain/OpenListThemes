/**
 * OpenListThemes 主题配置脚本
 * 使用方法：在 OpenList 自定义头部中引入此文件，并在引入前定义配置
 * 
 * 示例：
 * <script>
 *   window.OpenListThemeConfig = {
 *     lightBg: "你的白天背景图URL",
 *     darkBg: "你的夜间背景图URL",
 *     // 更多配置...
 *   };
 * </script>
 * <script src="https://cdn.jsdelivr.net/gh/你的用户名/OpenListThemes@main/dist/theme.js"></script>
 */

(function() {
    // 默认配置
    const defaultConfig = {
        // 背景图片
        lightBg: '',
        darkBg: '',
        // 透明度配置 (0-1)
        lightOpacity: 0.8,
        darkOpacity: 0.5,
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

    // 初始化评论系统
    function initGiscus() {
        if (!config.enableComment || !config.giscusRepo) return;
        
        const giscusContainer = document.getElementById('giscus');
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

    // 页面加载完成后初始化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    function init() {
        injectStyles();
        initMusicPlayer();
        
        // 等待页面完全加载后初始化评论
        let interval = setInterval(() => {
            if (document.querySelector(".footer")) {
                initGiscus();
                clearInterval(interval);
            }
        }, 200);
    }

    // 暴露配置供调试
    window.OpenListTheme = {
        config: config,
        version: '1.0.0'
    };
})();
