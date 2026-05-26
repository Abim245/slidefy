import {useState } from 'react';
function SettingPanel(){
    const [newLength, setNewLength] = useState("");
    const [newStyle, setNewStyle] = useState("");
    const [newAudience, setNewAudience] = useState("");
    return (
        <div>
            <h2>Length</h2>
            <select name="Length" id=""  value = {newLength}
                    onChange = {(e) =>{setNewLength(e.target.value)}}>
                <option value="short">short(5-8 slides)</option>
                <option value="medium">medium(8-15 slides)</option>
                <option value="long">long(20+ slides)</option>
            </select>
             <h2
            >Style</h2>
            <select name="style" id=""   value = {newStyle}
            onChange = {(e) =>{setNewStyle(e.target.value)}}>
                <option value="simple">simple</option>
                <option value="minimal">minimal</option>
                <option value="professional">professional</option>
                <option value="creative">creative</option>
            </select>
            <h2 >Audience</h2>
            <select name="Audience" id=""  value = {newAudience}
                    onChange = {(e) =>{setNewAudience(e.target.value)}}>
                <option value="student">student</option>
                <option value="marketers">marketers</option>
                <option value="developers">developers</option>
                <option value="general">general</option>
                <option value="executives">executives</option>
            </select>
        </div>
    )
}

export default SettingPanel;