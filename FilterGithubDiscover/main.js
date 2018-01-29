// ==UserScript==
// @name         FilterGithubDiscover
// @namespace    https://github.com/Chyroc/tampermonkey-script
// @version      0.1.0
// @description  通过语言筛选Github Discover页面显示的项目
// @author       Chyroc
// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.18.2/babel.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/6.16.0/polyfill.js
// @match        https://github.com/dashboard/discover?*
// ==/UserScript==

/* jshint ignore:start */
var inline_src = (<><![CDATA[ // eslint-disable-line
    /* jshint ignore:end */
    /* jshint esnext: false */
    /* jshint esversion: 6 */
    setInterval(init, 1000);
    init();
    /* jshint ignore:start */
]]></>).toString();
var c = Babel.transform(inline_src, { presets: [ "es2015", "es2016" ] });
eval(c.code);
/* jshint ignore:end */

function getElementByXpath(d, path) {
    return document.evaluate(path, d, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function getLs(){
    var ls = getParameterByName('l').toLowerCase().split(',');
    if (ls.includes('js')){
        ls.push('javascript');
    }
    if (ls.includes('node')){
        ls.push('javascript');
    }
    if (ls.includes('py')){
        ls.push('python');
    }
    if (ls.includes('py')){
        ls.push('jupyter notebook');
    }

    return ls;
}

function init(){
    var ls = getLs();
    var repos = document.querySelectorAll('.js-repository-recommendation-and-restore');
    for (var repo of repos){
        var lang = '';
        var repoLang = getElementByXpath(repo, "div[2]/div[2]/div/div[3]/span[2]");
        if (repoLang!==null){
            lang = repoLang.innerText.trim().toLowerCase();
        }else{
            repoLang = getElementByXpath(repo, "div[2]/div[2]/div/div[4]/span[2]");
            if (repoLang!==null){
                lang = repoLang.innerText.trim().toLowerCase();
            }else{
                continue;
            }
        }

        if (!ls.includes(lang)){
            repo.style.display='none';
            console.log(lang);
        }
    }

    document.querySelector(".ajax-pagination-btn").addEventListener("click", function() {
        setTimeout(() => {
            init();
        }, 1500);
    });

    document.querySelector(".js-more-repos-link").addEventListener("click", function() {
        setTimeout(() => {
            init();
        }, 1500);
    });
}
