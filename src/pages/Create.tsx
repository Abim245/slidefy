import { useState, useEffect } from "react"
import generatePresentation from "../utils/generatePresentation"

function Create(){
    const [process, setProcess] = useState("input")
    const [topic, setTopic] = useState("")
    const [progressStep, setProgressStep] = useState(0)
    useEffect(() => {
    const handleMessage = (message: any, _sender: chrome.runtime.MessageSender, _sendResponse: (response?: any) => void) => {
    if (message.type === "SLIDES_READY") {
        setProcess("ready")
        generatePresentation(message.slides)
    }
}
    chrome.runtime.onMessage.addListener(handleMessage)
    return () => {
        chrome.runtime.onMessage.removeListener(handleMessage)
    }
}, [])
    return(
        <div>
          {process === "input" && (
    <>
    <input type="text" value={topic} onChange={(e) => { setTopic(e.target.value) }}/>
    <p>or</p>
    <input type="file" name="" id="" />
    <button
    onClick={() => {
    setProcess("structuring")
    chrome.runtime.sendMessage({ type: "GENERATE_SLIDES", text: topic })
    setTimeout(() => {
        setProcess("designing")
        setTimeout(() => { setProgressStep(1) }, 1000)
        setTimeout(() => { setProgressStep(2) }, 2000)
        setTimeout(() => { setProgressStep(3) }, 3000)
    }, 1500)
}}
    >Turn your document into slides</button>
    </>
)}

{process === "structuring" && (
    <>
    <h1>structuring narrative ....</h1>
    <p>Applying {topic} framework</p>
    </>
)}

{process === "designing" && (
    <>
    <h2>Designing your slide</h2>
    <p>{topic}</p>
    <div>
        <p>{progressStep >= 1 ? "✓" : "○"} Analyse raw input</p>
        <p>{progressStep >= 2 ? "✓" : "○"} Generate slides narrative</p>
        <p>{progressStep >= 3 ? "✓" : "○"} Applying premium layout</p>
    </div>
    <p>POWERED BY GROQ</p>
    </>
)}

{process === "ready" && (
    <>
    <h1>Presentation Ready</h1>
    <p>8 premium slides generated in 3.2s</p>
    <button>Open in workspace</button>
    <p>or open link to share</p>
    </>
)}
        </div>
    )
}

export default Create 