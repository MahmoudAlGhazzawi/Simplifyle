import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles.css'



const Input = ({ onImageSelect, onPdfSelect }) => {
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
            const result = e.target.result;
            // Call the onImageSelect callback with the selected image
            onImageSelect(result);
        };

        reader.readAsDataURL(file);
    };

    const handlePdfChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
            const result = e.target.result;
            // Call the onPdfSelect callback with the selected PDF
            onPdfSelect(result);
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
                <input className="input-button" type="file" accept="image/*, application/pdf" id="upload-button" onChange={handlePdfChange} />
            </label>

        </div>
    );
};

export default Input;