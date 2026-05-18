function SettingPanel(){
    return (
        <div>
            <select name="Length" id="">
                <h2>Length</h2>
                <option value="">short(5-8 slides)</option>
                <option value="">medium(8-15 slides)</option>
                <option value="">long(20+ slides)
                </option>
            </select>
            <select name="style" id="">
                <h2>Style</h2>
                <option value="">simple</option>
                <option value="">minimal</option>
                <option value="">professional</option>
                <option value="">creative</option>
            </select>
            <select name="Audience" id="">
                <h2>Audience</h2>
                <option value="">student</option>
                <option value="">marketers</option>
                <option value="">developers</option>
                <option value="">general</option>
                <option value="">executives</option>
            </select>
        </div>
    )
}

export default SettingPanel;