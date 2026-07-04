import { useState, useEffect } from "react";

function Collectible(){
    const [collections, setCollections] = useState({})

    useEffect(() => {
        chrome.storage.local.get("collections", (result) => {
            setCollections(result.collections || {})
        })
    }, [])

    return(
        <div>
            <input type="text" placeholder="search collections"/>
            {Object.values(collections).map((collection: any) => (
            <div key={collection.name}>
                <h2>{collection.name}</h2>
                <p><span>{collection.items.length}</span> items</p>
                <button onClick={() => {
                    const text = collection.items.join(" ")
                    chrome.runtime.sendMessage({ type: "GENERATE_SLIDES", text })
                }}>Generate</button>
            </div>
         ))}
            <div>
                <h2>create new collection</h2>
                <p>start a fresh deck</p>
            </div>
            <p>open workspace</p>
        </div>
    )
}

export default Collectible;