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
        <div key={collection.name} className="collection-card">
        <div className="collection-info">
            <h2>{collection.name}</h2>
            <p>{collection.items.length} items</p>
        </div>
        <button className="btn-primary" onClick={() => {
            const text = collection.items.join(" ")
            chrome.runtime.sendMessage({ type: "GENERATE_SLIDES", text })
        }}>Generate</button>
            </div>
        ))}
        <div className="create-collection">
            <span>+</span>
            <div>
                <p style={{color: "white"}}>Create new collection</p>
                <p style={{fontSize: "0.8rem"}}>Start a fresh deck</p>
            </div>
        </div>
        </div>
    )
}


export default Collectible;