window.onload = function () {

    var button = document.createElement("button");
    button.innerHTML = "Entire Work";
    button.setAttribute("id", "entireWork");
    document.querySelector('#content_wrapper_inner > span').appendChild(button);

    button.style.cssText = [
        'color: #333;',
        'text-align: center;',
        'width: 110px;',
        'height: 30px;',
        'background: white;',
        'cursor: pointer;',
        'text-shadow: 0 1px 1px rgba(255,255,255,0.75);',
        'border-color: rgba(0,0,0,0.1) rgba(0,0,0,0.1) rgba (0,0,0,0.25);',
        'border-bottom-color: #b3b3b3;',
        'padding: 4px 12px;',
        /*'box-shadow: inset 0 1px 0 rgba(255,255,255,0.2), 0 1px 2px rgba(0,0,0,0.05);',*/
        'border-radius: 4px;',
        'border: 1px solid #ccc;',
        'background-image: linear-gradient(to bottom, #fff, #e6e6e6);',
        'position: relative;',
        'left: 5px;',
        'right: 10px;'

    ].join(' ');

    button.onmouseover = function () {
        button.style.cssText.boxShadow = "inset 0 2px 4px rgba(0,0,0,0.15), 0 1px 2px rgba(0,0,0,0.5)";
        /*button.style.cssText = [
            'color: #333;',
            'text-align: center;',
            'width: 110px;',
            'height: 30px;',
            'background: white;',
            'cursor: pointer;',
            'text-shadow: 0 1px 1px rgba(255,255,255,0.75);',
            'border-color: rgba(0,0,0,0.1) rgba(0,0,0,0.1) rgba (0,0,0,0.25);',
            'border-bottom-color: #b3b3b3;',
            'padding: 4px 12px;',
            'border-radius: 4px;',
            'border: 1px solid #ccc;',
            'background-image: linear-gradient(to bottom, #fff, #e6e6e6);',
            'position: relative;',
            'left: 4px;',
            'right: 10px;',     
            'box-shadow: inset 0 2px 4px rgba(0,0,0,0.15), 0 1px 2px rgba(0,0,0,0.5);'
        ].join(' ');
        */
        document.querySelector('#content_wrapper_inner > span').appendChild(button);
    };

    button.onmouseout = function () {
        button.style.cssText.boxShadow = "inset 0 1px 0 rgba(255,255,255,0.2), 0 1px 2px rgba(0,0,0,0.05);";
        /*button.style.cssText = [
            'color: #333;',
            'text-align: center;',
            'width: 110px;',
            'height: 30px;',
            'background: white;',
            'cursor: pointer;',
            'text-shadow: 0 1px 1px rgba(255,255,255,0.75);',
            'border-color: rgba(0,0,0,0.1) rgba(0,0,0,0.1) rgba (0,0,0,0.25);',
            'border-bottom-color: #b3b3b3;',
            'padding: 4px 12px;',
            'border-radius: 4px;',
            'border: 1px solid #ccc;',
            'background-image: linear-gradient(to bottom, #fff, #e6e6e6);',
            'position: relative;',
            'left: 4px;',
            'right: 10px;',     
            'box-shadow: inset 0 2px 4px rgba(0,0,0,0.15), 0 1px 2px rgba(0,0,0,0.5);'
        ].join(' ');
        */
        document.querySelector('#content_wrapper_inner > span').appendChild(button);
    };

    /* this can solve the execute script problem: https://stackoverflow.com/questions/32398709/chrome-object-or-chrome-tabs-object-not-accessible-from-script-other-than-a-back */
    button.onclick =  function () {
        chrome.runtime.sendMessage({greeting: "entireWork"});
    }

    var button = document.createElement("button");
    button.innerHTML = "Download";
    button.setAttribute("id", "download");
    document.querySelector('#content_wrapper_inner > span').appendChild(button);

    button.style.cssText = [
        'color: #333;',
        'text-align: center;',
        'width: 110px;',
        'height: 30px;',
        'background: white;',
        'cursor: pointer;',
        'text-shadow: 0 1px 1px rgba(255,255,255,0.75);',
        'border-color: rgba(0,0,0,0.1) rgba(0,0,0,0.1) rgba (0,0,0,0.25);',
        'border-bottom-color: #b3b3b3;',
        'padding: 4px 12px;',
        /*'box-shadow: inset 0 1px 0 rgba(255,255,255,0.2), 0 1px 2px rgba(0,0,0,0.05);',*/
        'border-radius: 4px;',
        'border: 1px solid #ccc;',
        'background-image: linear-gradient(to bottom, #fff, #e6e6e6);',
        'position: relative;',
        'margin-left: 5px;',
        'left: 5px;',
        'right: 10px;'

    ].join(' ');

    button.onmouseover = function () {
        button.style.cssText.boxShadow = "inset 0 2px 4px rgba(0,0,0,0.15), 0 1px 2px rgba(0,0,0,0.5)";
        document.querySelector('#content_wrapper_inner > span').appendChild(button);
    };

    button.onmouseout = function () {
        button.style.cssText.boxShadow = "inset 0 1px 0 rgba(255,255,255,0.2), 0 1px 2px rgba(0,0,0,0.05);";
        document.querySelector('#content_wrapper_inner > span').appendChild(button);
    };

    /* this can solve the execute script problem: https://stackoverflow.com/questions/32398709/chrome-object-or-chrome-tabs-object-not-accessible-from-script-other-than-a-back */
    button.onclick =  function () {
        chrome.runtime.sendMessage({greeting: "download"});
    }
}