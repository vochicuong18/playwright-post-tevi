
async function getClipboardContent() {
    const clipboardy = await import('clipboardy');
    let content = await clipboardy.default.read();
    console.log(content)
}
getClipboardContent()