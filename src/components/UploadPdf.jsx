import React, { useState } from 'react';
import {  useNavigate } from 'react-router-dom'; // Import from 'react-router-dom'

const PDFUploadPage = () => {
    const [file, setFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate(); // Initialize navigate

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const uploadPDF = () => {
        if (!file) return;

        setIsLoading(true);
        var formData = new FormData();
        formData.append("pdf_file", file, file.name);

        var requestOptions = {
            method: 'POST',
            body: formData,
            redirect: 'follow'
        };

        fetch("https://aianalyzer.fxlogapp.com/api/upload_pdf_view/", requestOptions)
            .then(response => response.json()) // Change this to response.json()
            .then(result => {
                setIsLoading(false); // Set loading to false upon receiving the response
                if (result.status === "success") {
                    // Navigate to the report page with the returned report ID
                    navigate(`/report/${result.report_id}`);
                } else {
                    // Handle the case where the API does not return a success status
                    console.error('Failed to upload:', result.message);
                }
            })
            .catch(error => {
                console.log('error', error);
                setIsLoading(false);
            });
    };

    return (
        <div className="container">
            <div className="upload-section">
                <h1>Upload Your PDF</h1>
                <input type="file" id="pdfInput" accept=".pdf" onChange={handleFileChange} />
                <label htmlFor="pdfInput" className="file-label">Choose a file</label>
                {isLoading ? <p>Loading...</p> : <button onClick={uploadPDF}>Upload</button>}
            </div>
        </div>
    );
};

export default PDFUploadPage;
