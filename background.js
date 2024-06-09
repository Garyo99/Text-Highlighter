chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "highlight",
        title: "ハイライトを追加",
        contexts: ["selection"],
    });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "highlight") {
        highlightText(tab);
    }
});

chrome.commands.onCommand.addListener((command) => {
    if (command === "highlight") {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            highlightText(tabs[0]);
        });
    }
});

function highlightText(tab) {
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: addHighlight,
    });
}

function addHighlight() {
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const span = document.createElement("span");
        span.style.backgroundColor = "#FFFF00";
        span.textContent = range.toString();
        range.deleteContents();
        range.insertNode(span);
    }
}
