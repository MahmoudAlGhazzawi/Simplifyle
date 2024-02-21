import React, { useState } from 'react';
import './styles.css';

const Settings = () => {

    const [isChecked, setIsChecked] = useState(true);

    const handleToggle = () => {
        setIsChecked(!isChecked);
    };

    return (
        <div className="container">

            <div className="picture-container"></div>

            <div className="select-container">
                <p><i className="bi bi-globe"></i></p>
                <select name="languages" id="languages">
                    <option value="">Choose a language</option>
                    <option value="L1">Language 1</option>
                    <option value="L2">Language 2</option>
                    <option value="L3">Language 3</option>
                </select>
            </div>

            <div className="toggle-container" onClick={handleToggle}>
                <p>Simplify language</p>
                <label className="switch">
                    <input type="checkbox" checked={isChecked} onChange={() => { }} />
                    <span className="slider"></span>
                </label>
            </div>

            <button><i className="bi bi-caret-right-square"></i>Translate</button>
        </div>
    );
}

export default Settings;
