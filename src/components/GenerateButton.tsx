import { useState } from "react"


function GenerateButton({ onClick }: { onClick: () => void }){
    const [isLoading , setIsLoading] = useState(false);
    return (
        <div>
            <button
            onClick = {() =>{ setIsLoading(true); onClick()} } disabled={isLoading}> {isLoading ? "Generating" : "Generate"} </button>
            </div>)
        }

export default GenerateButton;