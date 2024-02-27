import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles.css'



const Input = () => {
    return (
        <div className="container">
            <h2>What do you want to translate?</h2>
            <h3>Take a photo with your camera or upload a picture file from your camera roll or folder</h3>

            <label className="input-button-label">
                <i className="bi bi-camera-fill"></i>Take photo
                {/* File input inside the label */}
                <input className="input-button" type="file" accept="image/*" capture="camera" id="camera-button" />
            </label>

            <button><i className="bi bi-upload"></i>Upload file</button>
        </div>
    );
}

export default Input;