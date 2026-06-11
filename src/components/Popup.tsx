import GenerateButton from "./GenerateButton";
import SettingPanel from "./SettingPanel";
import StatusIndicator from "./StatusIndicator";
import { useState } from "react";

function extractContent() {

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


const extractedText = (contentArea as HTMLElement).innerText.trim()       
 if (extractedText) {
        return extractedText
        } else{
            return "No content found"
           }   }
}
function HandleGenerate(){
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const tabId = tabs[0].id
        if (tabId === undefined) return
    chrome.scripting.executeScript({
       target: { tabId: tabId },
        func: extractContent,
    })
    .then((results) => { console.log(results[0].result) })
  })
}
function Popup (){
    const [status, _setStatus] = useState("idle");
    return (
        <div>
            <StatusIndicator status={status} />
            <SettingPanel />
            <GenerateButton onClick={HandleGenerate}/>
        </div>
    )
}


export default Popup;