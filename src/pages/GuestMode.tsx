import { useState , useEffect} from "react";
import generatePresentation from "../utils/generatePresentation";
import logo from "../assets/logo.png"
function GuestMode({ onAccountClick }: { onAccountClick: () => void }){
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
        <div className="bg-gray-900 w-full min-h-screen p-4  text-white">
            {step === "create" && (
            <>
             <h1 className="container logo" >Slidefy</h1>
            <img src={logo} alt="Slidefy Logo" className="logo-img" />
             <div className="tab-row">

            <button className="btn-primary tab-active">Create</button>
            <button  onClick={onAccountClick} className="btn-secondary tab-inactive">Account</button>
             </div>
            <input type="text" placeholder="what is your presentation about?" value = {topic} onChange = {(e) =>{ setTopic(e.target.value)}} />
            <button type="button" onClick={() => { setStep("processing") 
            setTimeout(() => { setProgressStep(1) }, 1000)
            setTimeout(() => { setProgressStep(2) }, 2000)
            setTimeout(() => { setProgressStep(3) }, 3000)
            chrome.runtime.sendMessage({ type: "GENERATE_SLIDES", text: topic })
            }} className="btn-primary">Generate slide</button>
            </>)}
            {step === "processing" && (
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
)}
            {step === "claim" && (
    <div className="claim-container">
        <div className="claim-checkmark">✓</div>
        <h1 className="claim-title">Claim your presentation</h1>
        <p className="claim-subtitle">Sign up to save {topic} and access from any device. It only takes 10 seconds</p>
        <button className="btn-google">Continue with Google</button>
        <button className="btn-email">Continue with Email</button>
        <p className="skip-link">Maybe later, let me keep exploring</p>
    </div>
)}
        </div>
    )
}

export default GuestMode;