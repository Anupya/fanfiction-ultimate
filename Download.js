/*

The following script runs upon "Download" button click

*/

function download() {
    const chaptersDropdown = document.getElementsByName("chapter");
    let chapters = 1;

    if (chaptersDropdown.length != 0) {
        chapters = chaptersDropdown[0].options.length;
    }

    let tmpLocation = self.location.href.substring(self.location.href.indexOf("fanfiction.net/s/") + 17)
    tmpLocation = tmpLocation.substring(0, tmpLocation.indexOf("/"));
    targetLocation = `https://www.fanfiction.net/s/${tmpLocation}/t('.'t)`;

    storyChapters = new Array(chapters);
    completedChapters = 0;
    fetchChapter(compileChapters, targetLocation.replace("t('.'t)", 1), 0);
}

function fetchChapter(callback, url, chapter) {
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

function compileChapters(story, chapter) {
    completedChapters += 1;

    if (!story) {
        storyChapters[chapter] = "";
        fetchChapter(compileChapters, targetLocation.replace("t('.'t)", completedChapters + 1), completedChapters);
    }
    else {
        var root = document.implementation.createHTMLDocument();
        root.body.innerHTML = story;
        storyChapters[chapter] = root.getElementById("storytextp")
            .innerHTML;
        root = null;

        // Once all chapters are fetched, compile them on one page
        if (completedChapters >= storyChapters.length) {
            storyDiv.innerHTML = "";

            compileChaptersInOnePage();
        }
        else {
            fetchChapter(compileChapters, targetLocation.replace("t('.'t)", completedChapters + 1), completedChapters);
        }
    }
}

function compileChaptersInOnePage() {
    let title = document.title;

    if (title.indexOf("Chapter") != -1) {
        title = title.substring(0, title.indexOf("Chapter"));
    }

    // Story title
    let story = "<br /><br /><br /><h1>" + title + "</h1>";
    story += "<br /><br />";

    // Chapter title + contents
    for (let i = 0; i < storyChapters.length; i++) {
        story += "<br /><br /><h3>Chapter " + (i + 1) + " </h3><br /><br />";
        story += storyChapters[i];
        story += "<br /><hr>";
    }
    storyDiv.innerHTML += story;

    // Promo for extension
    storyDiv.innerHTML += "<br /><br /><br /><br /><br /><br /><br /><center>Thank you for using FanfictionUltimate! <br /> \
    Leave a review on Chrome Web Store if you liked it.</center>";

    // Download the fic
    openWindow(title);
}

function openWindow(title) {
    const windowWithFullFanfiction = window.open('', 'PRINT', 'height=800, width=800');

    if (!windowWithFullFanfiction) {
        console.error("Popup blocked! Allow pop-ups for this site.");
        return false;

    }

    windowWithFullFanfiction.document.write(storyDiv.innerHTML);
    windowWithFullFanfiction.document.title = title;
    windowWithFullFanfiction.document.close();
    windowWithFullFanfiction.focus();

    setTimeout(() => {
        windowWithFullFanfiction.print();
        windowWithFullFanfiction.close();
    }, 500); // Delay print to allow rendering

    return true;
}

function init() {
    storyDiv = document.createElement('div');
    storyDiv.setAttribute('id', 'FullStoryDiv');
    download();
}

init();
