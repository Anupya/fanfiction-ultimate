
/*

The following script adds the "Entire Work" and "Download" buttons upon loadingfanfiction

*/

document.addEventListener("DOMContentLoaded", function () {
    const buttonContainer = document.querySelector("#content_wrapper_inner > span");

    function createButton(id, text, message) {
        const button = document.createElement("button");
        button.id = id;
        button.textContent = text;
        button.className = "btn";
        button.style.cssText = "left: 5px; margin-left: 5px;";
        button.addEventListener("click", () => {
            chrome.runtime.sendMessage(message)
        });

        buttonContainer.appendChild(button);
    }

    createButton("entireWork", "Entire Work", "entireWork");
    createButton("download", "Download", "download");
});