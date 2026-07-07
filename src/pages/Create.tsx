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
    
    <textarea placeholder="Start with an idea or paste text..." value={topic} onChange={(e) => { setTopic(e.target.value) }} />
    <label className="upload-zone">
    ↑ Upload PDF / DOCX
    <input type="file" style={{display: "none"}} />
</label>
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
    <div className="processing-container">
        
    <h2 className="processing-title">Designing your slide</h2>
    <p className="processing-topic">{topic}</p>
   <div className="checklist">
        <p><span className={progressStep >= 1 ? "check-done" : "check-pending"}>
        {progressStep >= 1 ? "✓" : "○"}
        </span> Analyse raw input</p>           
         <p><span className={progressStep >= 2 ? "check-done" : "check-pending"}>
            {progressStep >= 2 ? "✓" : "○"}
            </span> Generate slides narrative</p>
            <p><span className={progressStep >= 3 ? "check-done" : "check-pending"}>
                {progressStep >= 3 ? "✓" : "○"}
                </span> Applying premium layout</p>
        </div>
    <p className="powered-by">POWERED BY GROQ</p>
    </div>
    </>
)}

{process === "ready" && (
    <>
    <div className="claim-container">
        <div className="claim-checkmark">✓</div>
        <h1 className="claim-title">Presentation Ready</h1>
    <p className="claim-subtitle" >8 premium slides generated in 3.2s</p>
    <button>Open in workspace</button>
    <p>or open link to share</p>
    </div>
    
    </>
 
)}
        </div>
    )
}

export default Create 