import React, { useState, useEffect } from "react";
import { SERVER_URL } from "../utils/api/api";

const ReportComponent = ({ fileInput }) => {
  const [reportData, setReportData] = useState({
    title: {},
    summary: {},
    data: [],
  });

  useEffect(() => {
    const formData = new FormData();
    formData.append("report_id", "b465acae-92ea-436e-afb8-b599e5e2ab3a");

    const requestOptions = {
      method: "POST",
      body: formData,
      redirect: "follow",
    };

    fetch(`${SERVER_URL}/api/fetch_report/`, requestOptions)
      .then((response) => response.json())
      .then((data) => setReportData(data))
      .catch((error) => console.log("error", error));
  }, [fileInput]);

  return (
    <div>
      <h1 id="reportTitle">{reportData.title.description || "Report Title"}</h1>
      <p id="reportSummary">
        {reportData.summary.description || "Report Summary"}
      </p>
      <div id="reportContent">
        {reportData.data.map((item, index) => (
          <div key={index} className="report-section">
            <h2>{item.slide_title}</h2>
            <p>{item.content}</p>
            {item.image_url && (
              <img src={item.image_url} alt="Report Section" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReportComponent;
