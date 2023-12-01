import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams

const ReportComponent = () => {
    const [reportData, setReportData] = useState({ title: {}, summary: {}, data: [] });
    const [imageUrls, setImageUrls] = useState([]);
    const [dataLoaded, setDataLoaded] = useState(false);
    const { reportId } = useParams(); // Use the useParams hook to get the reportId

    useEffect(() => {
        const formData = new FormData();
        formData.append("report_id", reportId); // Use reportId from the URL

        const requestOptions = {
            method: 'POST',
            body: formData,
            redirect: 'follow'
        };

        fetch("https://aianalyzer.fxlogapp.com/api/fetch_report/", requestOptions)
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success' && typeof data.data === 'object') {
                    const parsedData = JSON.parse(data.data.data);
                    setReportData(parsedData);
            
                    // Replace single quotes with double quotes and parse
                    const imageUrlsString = data.data.image_urls.replace(/'/g, '"');
                    const parsedImageUrls = JSON.parse(imageUrlsString);
                    setImageUrls(parsedImageUrls);
            
                    setDataLoaded(true);
                } else {
                    console.error('Data fetched is not in the expected format:', data);
                }
            })
            .catch(error => {
                console.log('error', error);
                setDataLoaded(false);
            });
    }, [reportId]); // Dependency array now includes reportId

    if (!dataLoaded) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1 id="reportTitle">{reportData.title.description || 'Report Title'}</h1>
            <p id="reportSummary">{reportData.summary.description || 'Report Summary'}</p>
            <div id="reportContent">
                {reportData.data.map((item, index) => (
                    <div key={index} className="report-section">
                        <h2>{item.slide_title}</h2>
                        <p>{item.content}</p>
                        {imageUrls[index] && <img src={imageUrls[index]} alt="Report Section" />}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ReportComponent;
    