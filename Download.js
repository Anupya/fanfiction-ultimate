
/* using window.print */


storyDiv = document.createElement('div');
storyDiv.setAttribute('id', 'FullStoryDiv');

StartRetrieving();

function fetchPage(callback, url, chapter) {
    //Update display percentage

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

function StartRetrieving() {
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

function FinishStory() {
    var title = document.title;

    if (title.indexOf("Chapter") != -1) {
        title = title.substring(0, title.indexOf("Chapter"));
    }

    /* Dear Cas - 59 chapters */
    /* var story = "<h1>" + title + " - " + storyChapters.length + " chapters</h1><br />"; */
    var story = "<br /><br /><br /><h1>" + title + "</h1>";
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

    storyDiv.innerHTML += story;
    storyDiv.innerHTML += "<br /><br /><br /><br /><br /><br /><br /><center>Thank you for using FanfictionUltimate! <br /> \
    Leave a review on Chrome Web Store if you liked it.</center>";
    DownloadPDF(title);
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
            storyDiv.innerHTML = "";

            FinishStory();
        } 
        else {
            fetchPage(ParseStoryContent, targetLocation.replace("t('.'t)", completedChapters + 1), completedChapters);
        }
    }
}

function DownloadPDF(title) {
  var mywindow = window.open('', 'PRINT', 'height= 800, width=800');
  mywindow.document.write(storyDiv.innerHTML);
  mywindow.document.title =  title;
  mywindow.focus();
  mywindow.print();
  mywindow.close();
  return true;
}