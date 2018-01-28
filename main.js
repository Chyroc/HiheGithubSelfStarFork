// ==UserScript==
// @name         HiheGithubSelfStarFork
// @namespace    https://github.com/Chyroc
// @version      0.1
// @description  shows how to use babel compiler
// @author       Chyroc
// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.18.2/babel.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/6.16.0/polyfill.js
// @match        https://github.com
// ==/UserScript==

/* jshint ignore:start */
var inline_src = (<><![CDATA[
    /* jshint ignore:end */
    /* jshint esnext: false */
    /* jshint esversion: 6 */
    init();
    /* jshint ignore:start */
]]></>).toString();
                  var c = Babel.transform(inline_src, { presets: [ "es2015", "es2016" ] });
eval(c.code);
/* jshint ignore:end */


function getElementByXpath(d, path) {
    return document.evaluate(path, d, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

function init(){
    var stars = document.querySelectorAll('.watch_started');
    for (var star of stars){
        var starlink = getElementByXpath(star, "div/div/div/div[2]/div/span/a").href;
        if ( starlink.startsWith('https://github.com/Chyroc')){
            star.style.display = 'none';
        }
    }

    var focks = document.querySelectorAll('.fork');
    for (var fock of focks){
        var focklink = getElementByXpath(fock, "div/div/div/div/a[3]");
        if (focklink!==null){
            if ( focklink.href.startsWith('https://github.com/Chyroc')){
                fock.style.display = 'none';
            }
        }
    }

    document.querySelector(".ajax-pagination-btn").addEventListener("click", function() {
        setTimeout(() => {
            init();
        }, 1500);
    });
}