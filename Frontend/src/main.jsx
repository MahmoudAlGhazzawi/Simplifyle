import React from 'react'
import ReactDOM from 'react-dom/client'
import Header from './header.jsx'
import Start from './start.jsx'
import Input from './input.jsx'
import Settings from './settings.jsx'
import Output from './output.jsx'

const App = () => {
  const [selectedImage, setSelectedImage] = React.useState(null);
  const [selectedPdf, setSelectedPdf] = React.useState(null);
  const [currentStep, setCurrentStep] = React.useState('Start');

  const handleImageSelect = (imageData) => {
    setSelectedImage(imageData);
    setCurrentStep('Settings');
  };

  const handlePdfSelect = (pdfData) => {
    setSelectedPdf(pdfData);
    setCurrentStep('Settings');
  };


  return (
    <React.StrictMode>
      <Header />

      {currentStep === 'Start' && <Start onStartClick={() => setCurrentStep('Input')} />}

      {currentStep === 'Input' && <Input onImageSelect={handleImageSelect} onPdfSelect={handlePdfSelect} />}

      {currentStep === 'Settings' && <Settings onTranslateClick={() => setCurrentStep('Output')} onRedoClick={() => setCurrentStep('Input')}
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
        selectedPdf={selectedPdf}
        setSelectedPdf={setSelectedPdf} />}

      {currentStep === 'Output' && <Output onMoreClick={() => setCurrentStep('Input')}
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
        selectedPdf={selectedPdf}
        setSelectedPdf={setSelectedPdf} />}

    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<App />);