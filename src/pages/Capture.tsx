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
            <p>selected text: </p>
            <p>"{capturedText}"</p>                
            <button disabled={isGenerating} 
            onClick={() => {
             setIsGenerating(true)
            chrome.runtime.sendMessage({ type: "GENERATE_SLIDES", text: capturedText })
}}
          
            > 
                <h2>{isGenerating ? "Generating..." : "Generate deck from this topic"}</h2>
                <p>uses Groq AI to build slides instantly</p>
            </button>
            <button
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
                Add to my collection
                <select name="" id="" value={selectedCollection} onChange={(e) => setSelectedCollection(e.target.value)}>
                <option value="My Pitch">My pitch</option>
                <option value="Lecture Note">Lecture Note</option>
                <option value="startup Idea">startup Idea</option>
                </select>
            </button>
            <p>Edit Highlight text</p>
            <p>Open in workspace</p>
        </div>
    )
}

export default Capture;