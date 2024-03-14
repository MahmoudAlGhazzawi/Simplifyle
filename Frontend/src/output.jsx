import React from 'react'
import BounceLoader from "react-spinners/BounceLoader";
import ReactDOM from 'react-dom/client'
import './styles.css'



const Output = ({ selectedImage, setSelectedImage, selectedPdf, setSelectedPdf, onMoreClick, translatedText, setTranslatedText }) => {

    const [isTranslating, setIsTranslating] = React.useState(!translatedText);
    const [copied, setCopied] = React.useState(false);

    const handleRedoUpload = () => {
        setSelectedImage(null);
        setSelectedPdf(null);
        setTranslatedText(null);
        setCopied(false)
    };

    const handleCopyText = () => {
        navigator.clipboard.writeText(translatedText);
        setCopied(true);
    };

    React.useEffect(() => {
        // Update isTranslating state when translatedText changes
        setIsTranslating(!translatedText);
    }, [translatedText]);

    return (

        <div className="container">

            <h1>Success!</h1>
            <h2>Your file has been translated</h2>
            <h3>Copy the text to your clipboard or download pdf file</h3>

            <div className="output-container">
                {isTranslating ? (<div><BounceLoader color={"#EE6C4D"} /></div>) :
                    (<p>{translatedText}</p>)}
            </div>

            {translatedText && (
                <button className="real-button" onClick={handleCopyText} disabled={copied}>
                    {copied ? (
                        <> <i className="bi bi-check-circle-fill"></i>Copied </>
                    ) : (
                        <> <i className="bi bi-copy"></i>Copy text </>
                    )}
                </button>
            )}

            <div className="more-container" onClick={() => {
                handleRedoUpload();
                onMoreClick();
            }} > <span ><i className="bi bi-arrow-clockwise"></i>Translate more documents</span>
            </div>
        </div>
    );
};

export default Output;