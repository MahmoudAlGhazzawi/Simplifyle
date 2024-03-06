import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles.css'



const Start = ({ onStartClick }) => {
    return (
        <div className="container">
            <h1>Bureaucratic documents made understandable!</h1>
            <h2>Translate any document to an understandable language of your choice</h2>
            <button className="real-button" onClick={onStartClick} >Start</button>
        </div >
    );
}

export default Start;