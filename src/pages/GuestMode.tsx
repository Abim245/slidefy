import { useState , useEffect} from "react";
import generatePresentation from "../utils/generatePresentation";
function GuestMode(){
const [step, setStep] = useState("create")
const [topic, setTopic] = useState("")
const [progressStep, setProgressStep] = useState(0)
console.log("GuestMode rendered")
useEffect(() => {
    const handleMessage = (message: any, _sender: chrome.runtime.MessageSender, _sendResponse: (response?: any) => void) => {
    if (message.type === "SLIDES_READY") {
        setStep("claim")
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
            {step === "create" && (
            <>
             <h1>Slidefy</h1>
            <button>Create</button>
            <button>Account</button>
            <input type="text" placeholder="what is your presentation about?" value = {topic} onChange = {(e) =>{ setTopic(e.target.value)}}/>
            <button type="button" onClick={() => { setStep("processing") 
            setTimeout(() => { setProgressStep(1) }, 1000)
            setTimeout(() => { setProgressStep(2) }, 2000)
            setTimeout(() => { setProgressStep(3) }, 3000)
            chrome.runtime.sendMessage({ type: "GENERATE_SLIDES", text: topic })
            }}>Generate slide</button>
            </>)}
            {step === "processing" && (
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
            {step === "claim" &&(
                <>
                <h1>claim your presentation</h1>
                <p>Sign up to save {topic} and access from any device. It only takes 10 seconds</p>
                <button>Continue with Google</button>
                <button>Continue with Email</button>
                <p>Maybe later, let me keep exploring</p>
                </>
            )}
        </div>
    )
}

export default GuestMode;