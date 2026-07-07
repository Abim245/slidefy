import { useState, useEffect } from "react";
import generatePresentation from "../utils/generatePresentation";

function Capture(){
    const [isGenerating, setIsGenerating] = useState(false)
    const [capturedText, setCapturedText] = useState("")
    const [selectedCollection, setSelectedCollection] = useState("My Pitch")
   useEffect(() => {
    navigator.clipboard.readText().then((text) => {
        setCapturedText(text)
    })
}, [])

useEffect(() => {
    const handleMessage = (message: any, _sender: chrome.runtime.MessageSender, _sendResponse: (response?: any) => void) => {
        if (message.type === "SLIDES_READY") {
            setIsGenerating(false)
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
            
            <p className="capture-label">selected text: </p>
            <p className="quote-box">"{capturedText}"</p>                
            <button disabled={isGenerating} className="btn-primary"
            onClick={() => {
             setIsGenerating(true)
            chrome.runtime.sendMessage({ type: "GENERATE_SLIDES", text: capturedText })
}}
          
            > 
                <h2>{isGenerating ? "Generating..." : "Generate deck from this topic"}</h2>
                <p>uses Groq AI to build slides instantly</p>
            </button>
             <div className="collection-row">
                <span style={{color: "#888", fontSize: "0.85rem"}}>Add to collection:</span>
                <select value={selectedCollection} onChange={(e) => setSelectedCollection(e.target.value)}>
                    <option value="My Pitch">My Pitch</option>
                    <option value="Lecture Notes">Lecture Notes</option>
                    <option value="Startup Idea">Startup Idea</option>
                </select>
            </div>
           <button
                className="btn-secondary"
                onClick={() => {
                    chrome.storage.local.get("collections", (result) => {
                        const collections: Record<string, any> = result.collections || {}
                        const collection = collections[selectedCollection] || { name: selectedCollection, items: [] }
                        collection.items.push(capturedText)
                        collections[selectedCollection] = collection
                        chrome.storage.local.set({ collections })
                    })
                }}
            >
                Add to collection
            </button>
            
            <p className="footer-link">Edit Highlight text</p>
        </div>
    )
}

export default Capture;