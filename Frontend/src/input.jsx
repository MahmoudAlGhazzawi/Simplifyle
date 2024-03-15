import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles.css'



const Input = ({ onImageSelect, onPdfSelect }) => {

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = (e) => {

            const result = e.target.result;
            if (file.type.includes('image')) {
                onImageSelect({ file, result });
            } else {
                onPdfSelect({ file, result });
            }
        };
        reader.readAsDataURL(file);
    };



    return (
        <div className="container">

            <h2>What do you want to translate?</h2>
            <h3>Take a photo with your camera or upload a picture file from your camera roll or folder</h3>

            <label htmlFor="camera-button" className="input-button-label">
                <i className="bi bi-camera-fill"></i>Take photo
                <input className="input-button" type="file" accept="image/*" capture="camera" id="camera-button" onChange={handleImageChange} />
            </label>

            <label htmlFor="upload-button" className="input-button-label">
                <i className="bi bi-upload"></i>Upload file
                <input className="input-button" type="file" accept="image/*" id="upload-button" onChange={handleImageChange} />
                {/* <input className="input-button" type="file" accept="image/*, application/pdf" id="upload-button" onChange={handleImageChange} /> */}
            </label>


        </div>
    );
};

export default Input;