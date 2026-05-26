import GenerateButton from "./GenerateButton";
import SettingPanel from "./SettingPanel";
import StatusIndicator from "./StatusIndicator";
import { useState } from "react";

function Popup (){
    const [status, setStatus] = useState("idle");
    return (
        <div>
            <img src="{null}" alt="logo" />
            <StatusIndicator status={status} />
            <SettingPanel />
            <GenerateButton/>
        </div>
    )
}

export default Popup;