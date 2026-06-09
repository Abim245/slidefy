
const article = document.querySelector('article')
const main = document.querySelector('main')
const roleMain = document.querySelector('[role="main"]')

let contentArea ;
if (article) { contentArea = article }
else if (main) { contentArea = main }
else if (roleMain) { contentArea = roleMain }
else { contentArea = null }

if (contentArea) {
    // strip noise here
    const navs = contentArea.querySelectorAll('nav')
navs.forEach(el => el.remove())

const footers = contentArea.querySelectorAll('footer')
footers.forEach(el => el.remove())

const headers = contentArea.querySelectorAll('header')
headers.forEach(el => el.remove())

const scripts = contentArea.querySelectorAll('script')
scripts.forEach(el => el.remove())

const asides = contentArea.querySelectorAll('aside')
asides.forEach(el => el.remove())

const styles = contentArea.querySelectorAll('style')
styles.forEach(el => el.remove())


const extractedText = contentArea.innerText.trim()
if (extractedText) {
    chrome.runtime.sendMessage({ type: "TEXT_EXTRACTED", text: extractedText })
}

    console.log("content area found")
} else {
    console.log("no content found")
}


