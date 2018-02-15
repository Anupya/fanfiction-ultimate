RetrieveStory();

function fetchPage(callback, url, chapter) {
    //Update display percentage
    resultDiv.innerHTML = "<center> Loading Chapter " + (chapter + 1) + " of " + (storyChapters.length) + "...</center>";

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(data) {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    var data = xhr.responseText;
                    callback(data, chapter);
                } else {
                    callback(null, chapter);
                }
            }
        }
        // Note that any URL fetched here must be matched by a permission in
        // the manifest.json file!
    xhr.open('GET', url, true);
    xhr.send();
};

var storyChapters;
var completedChapters = 0;
var resultDiv;
var scratchDiv;
var targetLocation;


function SelectStoryText() {
    var sel = window.getSelection();
    var range = document.createRange();
    sel.removeAllRanges();
    sel.addRange(range);
}
/* 
    get a selection of text from the window
    create a range in the document
    everything in that range is contents of FullStoryShadingDiv
    remove anything selected in the window
    adds range object to selection
*/

function RetrieveStory() {
    /* creating HTML-like code */
    if (document.querySelector('#chap_select') == null) {
        return;
    }
    resultDiv = document.createElement('div');
    scratchDiv = document.createElement('div');
    resultDiv.setAttribute('id', 'FullStoryResultDiv');

    /* create a style tag using JavaScript */
    var head = document.getElementsByTagName('head')[0],
        style = document.createElement('style'),
        rules = document.createTextNode('.a2a_kit, a2a_default_style { display: none; }');

    style.type = 'text/css';

    if (style.styleSheet)
        style.styleSheet.cssText = rules.nodeValue;
    else style.appendChild(rules);
    head.appendChild(style);


    /* FullStoryResultDiv */
    resultDiv.style.cssText = [
        'background-color: white;',
        'color: black;',
        'margin: 0',
        'font: 13px Verdana;',
        'z-index: 2;',
        'position: relative;',
        'top: 0px;',
        'left: 0px;',
        'right: 0px;',
        'width: 80%;',
        'align: center;',
        'padding: 35px;',
        'border: 10px black;',
        'word-wrap: break-word;'

    ].join(' ');

    document.body.style.cssText = 'position: relative';
    document.querySelector('.storytextp').insertBefore(resultDiv, document.querySelector('#storytext'));
    document.querySelector('#storytext').style.display = 'none';
    document.querySelector("#content_wrapper_inner > div:nth-child(13)").style.display = "none";
    document.querySelector('#content_wrapper_inner > span').style.display = "none";
    /* document.body.parentElement.insertBefore(resultDiv, document.body); */


    if (document.getElementById("storytextp") == null) {
        alert("No story on this page!");
    } 
    else {
        var chaptersDropdown = document.getElementsByName("chapter");
        var chapters = 1;

        if (chaptersDropdown.length != 0) {
            chapters = chaptersDropdown[0].options.length;
        }

        var tmpLocation = self.location.href.substring(self.location.href.indexOf("fanfiction.net/s/") + 17);
        tmpLocation = tmpLocation.substring(0, tmpLocation.indexOf("/"));
        targetLocation = "https://www.fanfiction.net/s/" + tmpLocation + "/t('.'t)";

        storyChapters = new Array(chapters);
        completedChapters = 0;
        fetchPage(ParseStoryContent, targetLocation.replace("t('.'t)", 1), 0);
    }
}

function FinishStory() {
    //Fanfiction has floating bars now, which obscure our content, so move them behind us
    var floatingBars = document.getElementsByClassName('lc-wrapper');
    for (i = 0; i < floatingBars.length; i++) {
        floatingBars[i].style.zIndex = 1;
    }

    //Chapter by Chapter
    var resultClose = document.createElement('a');
    resultClose.setAttribute('href', 'javascript:void(0);');
    resultClose.setAttribute('onclick', 
        'FullStoryResultDiv.parentNode.removeChild(FullStoryResultDiv);\
        document.querySelector("#storytext").style.display = "block";\
        document.querySelector("#content_wrapper_inner > div:nth-child(13)").style.display = "block"; \
        document.querySelector("#content_wrapper_inner > span").style.display = "block";');
    resultClose.appendChild(document.createTextNode("Chapter-by-chapter"));

    //Select All
    var resultSelectAll = document.createElement('a');
    resultSelectAll.setAttribute('href', 'javascript:void(0);');
    resultSelectAll.setAttribute('onclick', 
        'javascript: selection = window.getSelection();\
        range = document.createRange();range.selectNodeContents(document.querySelector("#FullStoryResultDiv"));\
        selection.removeAllRanges();selection.addRange(range);');
    resultSelectAll.appendChild(document.createTextNode("Select All"));


    //Save as PDF
    /*
    var script = document.createElement('script');
    script.src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.3.5/jspdf.debug.js";
    script.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(script);
    */


    resultDiv.appendChild(resultClose);
    resultDiv.innerHTML += "&nbsp;&nbsp;&nbsp;&nbsp;"
    resultDiv.appendChild(resultSelectAll);
    resultDiv.innerHTML += "&nbsp;&nbsp;&nbsp;&nbsp;"

    var title = document.title;

    if (title.indexOf("Chapter") != -1) {
        title = title.substring(0, title.indexOf("Chapter"));
    }

    /* Dear Cas - 59 chapters */
    /* var story = "<h1>" + title + " - " + storyChapters.length + " chapters</h1><br />"; */
    var story = "<h1>" + title + "</h1>";
    story += "<br /><br /><br /><br />";
    /* story += "<h2>" + storyChapters.length + " chapters</h2><br />"; */

    /* Chapter 1
    blah blah blah ...
    */
    for (var i = 0; i < storyChapters.length; i++) {
        story += "<br /><br /><h3>Chapter " + (i + 1) + " </h3><br /><br />";
        story += storyChapters[i];
        story += "<br /><hr>";
    }

    resultDiv.innerHTML += story;
    resultDiv.innerHTML += "<br /><br /><br /><br /><br /><br /><br /><center>--- Thank you for using FanfictionUltimate: the ultimate \
        Chrome Extension for fanfiction.net lovers <3 ---</center>";
}

function ParseStoryContent(story, chapter) {
    completedChapters += 1;

    if (!story) {
        storyChapters[chapter] = "";
        fetchPage(ParseStoryContent, targetLocation.replace("t('.'t)", completedChapters + 1), completedChapters);
    } 
    else {
        var root = document.implementation.createHTMLDocument();
        root.body.innerHTML = story;
        storyChapters[chapter] = root.getElementById("storytextp")
            .innerHTML;
        root = null;

        if (completedChapters >= storyChapters.length) {
            resultDiv.innerHTML = "";

            console.log(storyChapters);
            FinishStory();
        } 
        else {
            fetchPage(ParseStoryContent, targetLocation.replace("t('.'t)", completedChapters + 1), completedChapters);
        }
    }
}