import { useState } from "react";
import Create from "./Create";
import Capture from "./Capture";
import Collectible from "./Collectible";
import logo from "../assets/logo.png"
function Home(){
    const [activeTab, setActiveTab] = useState("create")
    return (
        <div className="container">
    <h1 className="logo">Slidefy</h1>
    <img src={logo} alt="Slidefy Logo" className="logo-img" />
    <div className="tab-row">
        <button className={activeTab === "create" ? "tab-active" : "tab-inactive"} onClick={() => setActiveTab("create")}>Create</button>
        <button className={activeTab === "capture" ? "tab-active" : "tab-inactive"} onClick={() => setActiveTab("capture")}>Capture</button>
        <button className={activeTab === "collections" ? "tab-active" : "tab-inactive"} onClick={() => setActiveTab("collections")}>Collections</button>
    </div>
    {activeTab === "create" && <Create/>}
    {activeTab === "capture" && <Capture/>}
    {activeTab === "collections" && <Collectible/>}
    <p className="footer-link">Open in Workspace ↗</p>
</div>
    )
}

export default Home;