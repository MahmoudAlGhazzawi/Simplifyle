import React from 'react';
import './styles.css';
import find from 'lang-codes';
import * as Switch from '@radix-ui/react-switch';

const Settings = ({ selectedImage, setSelectedImage, selectedPdf, setSelectedPdf, onTranslateClick, onRedoClick, setTranslatedText }) => {

    const [isChecked, setIsChecked] = React.useState(true);
    const [selectedLanguage, setSelectedLanguage] = React.useState("");
    const [isLanguageSelected, setIsLanguageSelected] = React.useState(false);

    const handleToggle = () => {
        setIsChecked(!isChecked);
    };


    const handleLanguageChange = (event) => {
        setSelectedLanguage(event.target.value);
        setIsLanguageSelected(event.target.value !== "");
    };

    const handleRedoUpload = () => {
        setSelectedImage(null);
        setSelectedPdf(null);
    };



    // API start: 

    const handleTranslate = () => {
        // Create a JSON object with the selected file, language, and simplify option
        const translationData = {
            file: selectedImage.file || selectedPdf.file,
            language: selectedLanguage,
            simplify: isChecked
        };

        // Convert the JSON object to a string
        const body = new FormData()
        body.append('file', translationData.file)
        body.append('language', translationData.language)
        body.append('simplify', translationData.simplify)

        // Send the JSON data to the API endpoint
        console.log(import.meta.env.VITE_URL); 
        fetch(`${import.meta.env.VITE_URL}/extractTextFromImage`, {
            method: 'POST',
            body: body
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                console.log(response.body);
                return response.json();
            })
            .then(data => {
                setTranslatedText(data.text);
                console.log('Translation successful:', data);
            })
            .catch(error => {
                console.error('Error during translation:', error);
            });
    };

    // API end: 




    return (
        <div className="container">

            <div className="picture-container">
                {selectedImage && <img src={selectedImage.result} alt="Image" />}
                {selectedPdf && <embed src={`${selectedPdf.result} #toolbar=0`} type="application/pdf" alt="Upload" />}
            </div>


            <div className="container-below">
                {/* <span className="page-counter">Page1/1</span> */}
                <span className="redo" onClick={() => {
                    handleRedoUpload();
                    onRedoClick();
                }} ><i className="bi bi-trash"></i>Redo upload</span>
            </div>


            <div className="select-container" >
                <p><i className="bi bi-globe"></i></p>
                <select name="languages" id="languages" value={selectedLanguage} onChange={handleLanguageChange} >
                    <option value="" >Choose a language (required)</option>
                    {find().map((obj) => {
                        return <option value={obj.name} key={obj.name} >{obj.name}</option>
                    })}
                </select>
            </div>


            <div style={{ display: 'flex', alignItems: 'center' }} >
                <label className="Switch-Label" htmlFor="simplify-toggle" >
                    Simplify language
                </label>
                <Switch.Root className="SwitchRoot" id="simplify-toggle" checked={isChecked} onClick={handleToggle}>
                    <Switch.Thumb className="SwitchThumb" />
                </Switch.Root>
            </div>


            <button className="real-button" disabled={!isLanguageSelected} onClick={() => {
                handleTranslate();
                onTranslateClick();
            }} ><i className="bi bi-caret-right-square"></i>Translate</button>

            <div className="padding-container"></div>

        </div >
    );
}

export default Settings;