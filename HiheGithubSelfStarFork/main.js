// ==UserScript==
// @name         HiheGithubSelfStarFork
// @namespace    https://github.com/Chyroc/HiheGithubSelfStarFork
// @version      0.1.3
// @description  shows how to use babel compiler
// @author       Chyroc
// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.18.2/babel.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/6.16.0/polyfill.js
// @require      https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js
// @match        https://github.com
// ==/UserScript==

function getElementByXpath(d, path) {
    return document.evaluate(path, d, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

$(document).ready(function() {
    setTimeout(function(){
        var user = document.querySelector('meta[name="user-login"]').getAttribute("content")

        var stars = document.querySelectorAll('#dashboard > div.news.column.two-thirds > div.watch_started');
        for (var star of stars){
            var h = getElementByXpath(star, "div/div/div/div/div[1]/div/a[2]")
            if (h !== null){
                if (h.href.startsWith('https://github.com/'+user)){
                    star.style.display = 'none';
                    console.log('hidden',h.href);
                }
            }
        }

        var forks = document.querySelectorAll('#dashboard > div.news.column.two-thirds > div.fork');
        for (var fork of forks){
            var f = getElementByXpath(star, "div/div/div/div/div[1]/div/a[2]")
            if (f !== null){
                console.log('f',f)
            }
        }
    }, 3000);
});
