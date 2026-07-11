
import Home from "../pages/Home";

function Popup() {
   

    return (
        <div>
            <Home/>
        </div>
    )
}

export default Popup
// import GenerateButton from "./GenerateButton";
// import SettingPanel from "./SettingPanel";
// import StatusIndicator from "./StatusIndicator";
// import { useState, useEffect } from "react";
// import generatePresentation from "../utils/generatePresentation";

// function extractContent() {

//     const article = document.querySelector('article')
//     const main = document.querySelector('main')
//     const roleMain = document.querySelector('[role="main"]')

//     let contentArea ;
//     if (article) { contentArea = article }
//     else if (main) { contentArea = main }
//     else if (roleMain) { contentArea = roleMain }
//     else { contentArea = null }

//     if (contentArea) {
//         // strip noise here
//         const navs = contentArea.querySelectorAll('nav')
//         navs.forEach(el => el.remove())

//         const footers = contentArea.querySelectorAll('footer')
//         footers.forEach(el => el.remove())

//         const headers = contentArea.querySelectorAll('header')
//         headers.forEach(el => el.remove())

//         const scripts = contentArea.querySelectorAll('script')
//         scripts.forEach(el => el.remove())

//         const asides = contentArea.querySelectorAll('aside')
//         asides.forEach(el => el.remove())

//         const styles = contentArea.querySelectorAll('style')
//         styles.forEach(el => el.remove())


// const extractedText = (contentArea as HTMLElement).innerText.trim()       
//  if (extractedText) {
//         return extractedText
//         } else{
//             return "No content found"
//            }   }
//}
// function HandleGenerate(){
//     chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//         const tabId = tabs[0].id
//         if (tabId === undefined) return
//     chrome.scripting.executeScript({
//        target: { tabId: tabId },
//         func: extractContent,
//     })
//     .then((results) => {
//     console.log("got results:", results)
//     chrome.runtime.sendMessage({type: "GENERATE_SLIDES" , text: results[0].result})

// }) })
// }

// function Popup (){
//     //const [status, _setStatus] = useState("idle");
//     const [_slides, setSlides] = useState([])
//     useEffect(() => {
//     chrome.runtime.onMessage.addListener((message, _sender, _sendResponse) => {
//         if (message.type === "SLIDES_READY") {
//             setSlides(message.slides)
//             generatePresentation(message.slides)
//         }
//     })
//     }, [])
//  return (
//         <div>
//             <GuestMode/>
//             {/* <StatusIndicator status={status} />
//             <SettingPanel />
//             <GenerateButton onClick={HandleGenerate}/> */}
//         </div>
//     )
// }


// export default Popup;