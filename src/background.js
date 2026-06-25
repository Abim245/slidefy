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
   messages: [{ role: "user", content: `You are a presentation generator. Based on the following content, create slides. Respond only with valid JSON, structured as an array of objects, each with a title and an array of bullet points. Content: ${message.text}` }]
    })
      
}).then(response => response.json())
    .then(data => console.log(data.choices[0].message.content))}
   
})