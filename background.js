chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "highlight",
        title: "ハイライトを追加",
        contexts: ["selection"],
    });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "highlight") {
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: addHighlight,
            args: [info.selectionText],
        });
    }
});

function addHighlight(selectedText) {
    const range = window.getSelection().getRangeAt(0);
    const span = document.createElement("span");
    span.style.backgroundColor = "yellow";
    span.textContent = selectedText;
    range.deleteContents();
    range.insertNode(span);
}
