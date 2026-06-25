import { GROQ_API_KEY } from './config.js'
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
   if (message.type === "GENERATE_SLIDES"){
    console.log(message.text) 
 fetch("https://api.groq.com/openai/v1/chat/completions", {
     method: "POST",
    headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + GROQ_API_KEY
        },
   body: JSON.stringify({
    model: "llama-3.3-70b-versatile",
    messages: [{ role: "user", content: message.text }]
    })
      
}).then(response => response.json())
    .then(data => console.log(data.choices[0].message.content))}
   
})