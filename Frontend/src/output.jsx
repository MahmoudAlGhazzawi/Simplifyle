import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles.css'



const Output = () => {

    return (

        <div className="container">

            <h1>Success!</h1>
            <h2>Your file has been translated</h2>
            <h3>Copy the text to your clipboard or download pdf file</h3>

            <div className="output-container">
                { }
            </div>

            <button className="real-button">
                <i class="bi bi-copy"></i>Copy text
            </button>

            <button className="real-button">
                <i class="bi bi-download"></i>Download pdf
            </button>

            <p><i class="bi bi-arrow-clockwise"></i>Translate more documents</p>

        </div>
    );
};

export default Output;