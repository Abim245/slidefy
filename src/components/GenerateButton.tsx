import { useState } from "react"

function GenerateButton(){
    const [isLoading , setIsLoading] = useState(false);
    return (
        <div>
            
            <button
            onClick = {() => setIsLoading(true)} disabled={isLoading}> {isLoading ? "Generating" : "Generate"} </button>
            </div>)};

export default GenerateButton;