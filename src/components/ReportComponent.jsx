import React, { useState, useEffect } from 'react';

const ReportComponent = ({ fileInput }) => {
    const [reportData, setReportData] = useState({ title: {}, summary: {}, data: [] });

    useEffect(() => {
        const formData = new FormData();
        formData.append("report_id", "9b4fba35-7630-42ab-a77e-ca878314fee1");

        const requestOptions = {
            method: 'POST',
            body: formData,
            redirect: 'follow'
        };

        fetch("https://aianalyzer.fxlogapp.com/api/fetch_report/", requestOptions)
            .then(response => response.json())
            .then(data => setReportData(data))
            .catch(error => console.log('error', error));
    }, [fileInput]);

    return (
        <div>
            <h1 id="reportTitle">{reportData.title.description || 'Report Title'}</h1>
            <p id="reportSummary">{reportData.summary.description || 'Report Summary'}</p>
            <div id="reportContent">
                {reportData.data.map((item, index) => (
                    <div key={index} className="report-section">
                        <h2>{item.slide_title}</h2>
                        <p>{item.content}</p>
                        {item.image_url && <img src={item.image_url} alt="Report Section" />}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ReportComponent;
