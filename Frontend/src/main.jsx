import React from 'react'
import ReactDOM from 'react-dom/client'
import Header from './header.jsx'
import Start from './start.jsx'
import Input from './input.jsx'
import Settings from './settings.jsx'

const App = () => {
  const [selectedImage, setSelectedImage] = React.useState(null);
  const [selectedPdf, setSelectedPdf] = React.useState(null);

  const handleImageSelect = (imageData) => {
    setSelectedImage(imageData);
  };

  const handlePdfSelect = (pdfData) => {
    setSelectedPdf(pdfData);
  };

  return (
    <React.StrictMode>
      <Header />
      <Input onImageSelect={handleImageSelect} onPdfSelect={handlePdfSelect} />
      <Settings selectedImage={selectedImage} selectedPdf={selectedPdf} />
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<App />);