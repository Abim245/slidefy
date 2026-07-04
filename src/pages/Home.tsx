import { useState } from "react";
import Create from "./Create";
import Capture from "./Capture";
import Collectible from "./Collectible";
function Home(){
    const [activeTab, setActiveTab] = useState("create")
    return (
        <div>
            <h1>Slidefy</h1>
            <button onClick={() => setActiveTab("create")}>Create</button>
            <button onClick={() => setActiveTab("capture")}>Capture</button>
            <button onClick={() => setActiveTab("collections")}>Collections</button>
            {activeTab === "create" && (<> <Create/> </>)}
            {activeTab === "capture" && (<> <Capture/> </>)}
             {activeTab === "collections" && (<> <Collectible/> </>)}
            <p>open in workspace</p>
            
        </div>
    )
}

export default Home;