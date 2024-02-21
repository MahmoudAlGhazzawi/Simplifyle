import React from 'react';
import './styles.css';
import find from 'lang-codes'

const Settings = () => {

    const [isChecked, setIsChecked] = React.useState(true);

    const handleToggle = () => {
        setIsChecked(!isChecked);
    };

    console.log(find())

    return (
        <div className="container">

            <div className="picture-container"></div>

            <div className="select-container">
                <p><i className="bi bi-globe"></i></p>
                <select name="languages" id="languages">
                    <option value="">Choose a language</option>
                    {find().map((obj) => {
                        return <option value={obj.name} key={obj.name} >{obj.name}</option>
                    })}
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
