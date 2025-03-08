# FanfictionUltimate
Read the whole story all on 1 page. Download as PDF. <br /><br />
The ultimate Chrome extension for the best Fanfiction.net experience. 

![Screenshot](https://github.com/Anupya/fanfiction-ultimate/blob/master/marquee.PNG)

# Installation
 Click [here](https://chrome.google.com/webstore/detail/fanfictionultimate/hbhlklehlompfbncnchjocoeabddnmjl) to download the extension: <br />
 ![Screenshot](http://static1.squarespace.com/static/4f5810d9e4b0ebbf0a1507a6/546cff26e4b08897ae07e062/55b2a832e4b051ab94b88fde/1440437069496/?format=1000w)
 
 # Development Setup
 
 1. Clone source code: git clone https://github.com/Anupya/fanfiction-ultimate.git
 2. Go to *Chrome Settings* -> *More Tools* -> *Extensions*
 3. Enable **developer mode**
 4. Click **Load unpacked extension...** and load the fanfiction-ultimate folder
 
 ## Why use `window.print()` instead of something like JSPDF for the download functionality?

 I was originally going to use JSPDF which would automatically download the full fanfiction to `Downloads` folder, like it happens in A03. Unfortunately, JSPDF does not support UTF-8 encoding. Without UTF-8 encoding, half the sentences are missing and there are some weird spacing issues.

 Given this, and that it's a better experience for the reader to be able to decide where to store the downloaded fic, I went with window.print().

 # Contributing guidelines
 
 Search through the [issues](https://github.com/Anupya/fanfiction-ultimate/issues) and feel free to make a pull request for any of them :)
 
# License

MIT - Read it [here](https://github.com/Anupya/fanfiction-ultimate/blob/master/LICENSE)
