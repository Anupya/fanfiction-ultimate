/*

The following script runs upon "Entire Work" button click

*/

var storyChapters;
var completedChapters = 0;
var resultDiv;
var targetLocation;

function entireWork() {
    let chaptersDropdown = document.getElementsByName("chapter");
    let chapters = 1;

    if (chaptersDropdown.length != 0) {
        chapters = chaptersDropdown[0].options.length;
    }

    let tmpLocation = self.location.href.substring(self.location.href.indexOf("fanfiction.net/s/") + 17);
    tmpLocation = tmpLocation.substring(0, tmpLocation.indexOf("/"));
    targetLocation = "https://www.fanfiction.net/s/" + tmpLocation + "/t('.'t)";

    storyChapters = new Array(chapters);
    completedChapters = 0;
    fetchChapter(compileChapters, targetLocation.replace("t('.'t)", 1), 0);
}

function fetchChapter(callback, url, chapter) {
    // Update display percentage
    resultDiv.innerHTML = "<center> Loading Chapter " + (chapter + 1) + " of " + (storyChapters.length) + "...</center>";

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function (data) {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                var data = xhr.responseText;
                callback(data, chapter);
            } else {
                callback(null, chapter);
            }
        }
    }
    xhr.open('GET', url, true);
    xhr.send();
};


function addChapterByChapterButton() {
    // Button to revert back to chapter-by-chapter view
    const resultClose = document.createElement('button');
    resultClose.innerHTML = "Chapter by Chapter";
    resultClose.setAttribute('class', 'btn');
    resultClose.setAttribute('id', 'chapter-by-chapter');
    resultClose.setAttribute('onclick',
        'FullStoryResultDiv.parentNode.removeChild(FullStoryResultDiv);\
        document.querySelector("#storytext").style.display = "block";\
        document.querySelector("#content_wrapper_inner > div:nth-child(13)").style.display = "block"; \
        document.querySelector("#content_wrapper_inner > span").style.display = "block";');
    resultClose.style.cssText = [
        'margin-left: 5px;',
        'float: right;',
        'right: -13%;',
        'position: relative;',
        'top: -40px;'
    ].join(' ');

    resultDiv.appendChild(resultClose);
    resultDiv.innerHTML += "&nbsp;&nbsp;&nbsp;&nbsp;"
}

function compileChaptersOnOnePage() {
    // Fanfiction has floating bars, which obscures our content, so move them to the back
    const floatingBars = document.getElementsByClassName('lc-wrapper');
    for (i = 0; i < floatingBars.length; i++) {
        floatingBars[i].style.zIndex = 1;
    }

    // Add Chapter by Chapter button
    addChapterByChapterButton();

    // Set document title
    let title = document.title;
    if (title.indexOf("Chapter") != -1) {
        title = title.substring(0, title.indexOf("Chapter"));
    }

    // Story title
    var story = "<br /><br /><br /><h1>" + title + "</h1>";
    story += "<br /><br /><br /><br />";

    // Chapter title + contents
    for (let i = 0; i < storyChapters.length; i++) {
        story += "<br /><br /><h3>Chapter " + (i + 1) + " </h3><br /><br />";
        story += storyChapters[i];
        story += "<br /><hr>";
    }
    resultDiv.innerHTML += story;

    // Promo for extension
    resultDiv.innerHTML += "<br /><br /><br /><br /><br /><br /><br /><center>--- Thank you for using FanfictionUltimate: the ultimate \
        Chrome Extension for fanfiction.net lovers <3 ---</center>";
}

function compileChapters(story, chapter) {
    completedChapters += 1;

    if (!story) {
        storyChapters[chapter] = "";
        fetchChapter(compileChapters, targetLocation.replace("t('.'t)", completedChapters + 1), completedChapters);
    }
    else {
        const root = document.implementation.createHTMLDocument();
        root.body.innerHTML = story;

        const storyContent = root.getElementById("storytextp");
        storyChapters[chapter] = storyContent ? storyContent.innerHTML : "";
    }

    // Once all chapters are fetched, compile them on one page
    if (completedChapters >= storyChapters.length) {
        resultDiv.innerHTML = "";
        compileChaptersOnOnePage();
    }
    else {
        fetchChapter(compileChapters, targetLocation.replace("t('.'t)", completedChapters + 1), completedChapters);
    }
}

function setup() {
    resultDiv = document.createElement('div');
    resultDiv.setAttribute('id', 'FullStoryResultDiv');
    resultDiv.setAttribute('class', 'storytext');

    const head = document.getElementsByTagName('head')[0];
    const style = document.createElement('style');
    const rules = document.createTextNode('.a2a_kit, a2a_default_style { display: none; }');

    if (style.styleSheet) {
        style.styleSheet.cssText = rules.nodeValue;
    }
    else {
        style.appendChild(rules);
    }
    head.appendChild(style);

    // CSS for FullStoryResultDiv
    resultDiv.style.cssText = [
        'margin: 0',
        'z-index: 100;',
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
}

function init() {
    // If fanfiction has only 1 chapter, that /is/ the "entire work"
    // So raise an alert and do nothing
    if (document.querySelector('#chap_select') == null) {
        alert('This is a one-shot!');
        return;
    }

    // Setup HTML and corresponding styles
    setup();

    if (document.getElementById("storytextp") == null) {
        alert("No story on this page!");
    }
    else {
        entireWork();
    }
}

init();