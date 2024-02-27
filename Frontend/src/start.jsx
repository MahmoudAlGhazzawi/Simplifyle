import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles.css'
import { Link } from 'react-router-dom';



const Start = () => {
    return (
        <div className="container">
            <h1>Bureaucratic documents made understandable!</h1>
            <h2>Translate any document to an understandable language of your choice</h2>
            <Link to="/input"><button>Start</button></Link>
        </div>
    );
}

export default Start;