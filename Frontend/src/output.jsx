import React from 'react'
// import jsPDF from "jspdf";
// import html2canvas from 'html2canvas';
import ReactPDF from '@react-pdf/renderer';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import ReactDOM from 'react-dom/client'
import './styles.css'



const Output = ({ selectedImage, setSelectedImage, selectedPdf, setSelectedPdf, onMoreClick }) => {

    const [translatedText, setTranslatedText] = React.useState('');


    const handleRedoUpload = () => {
        setSelectedImage(null);
        setSelectedPdf(null);
    };

    React.useEffect(() => {
        // Fetch translated text from backend and update state
        fetch('http://localhost:3000/extractTextFromImage')
            .then(response => response.json())
            .then(data => {
                setTranslatedText(data.text);
            })
            .catch(error => {
                console.error('Error fetching translated text:', error);
            });
    }, []); // Run this effect only once, on component mount


    const handleDownloadPdf = () => {

        const pdfContent = (
            <Document>
                <Page size="A4">
                    <View>
                        <Text>{translatedText}</Text>
                    </View>
                </Page>
            </Document>
        );

        ReactPDF.render(pdfContent);

    };



    return (

        <div className="container">

            <h1>Success!</h1>
            <h2>Your file has been translated</h2>
            <h3>Copy the text to your clipboard or download pdf file</h3>

            <div className="output-container">
                <p>A string containing one or more selectors to match against. This string must be a valid CSS selector string; if it's not, a SyntaxError exception is thrown. See Locating DOM elements using selectors for more information about using selectors to identify elements. Multiple selectors may be specified by separating them using commas.
                </p>
                {translatedText && <p>{translatedText}</p>}
            </div>

            <button className="real-button" onClick={() => navigator.clipboard.writeText(translatedText)}>
                <i className="bi bi-copy"></i>Copy text
            </button>

            <button className="real-button" onClick={handleDownloadPdf} >
                <i className="bi bi-download"></i>Download pdf
            </button>

            <div className="more-container" onClick={() => {
                handleRedoUpload();
                onMoreClick();
            }} > <span ><i className="bi bi-arrow-clockwise"></i>Translate more documents</span>
            </div>
        </div>
    );
};

export default Output;