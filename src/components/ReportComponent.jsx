import React, { useState, useEffect } from "react";
import { SERVER_URL } from "../utils/api/api";
import { useParams } from "react-router-dom"; // Import useParams

const ReportComponent = () => {
  const [reportData, setReportData] = useState({
    title: {},
    summary: {},
    data: [],
  });
  const [imageUrls, setImageUrls] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const { reportId } = useParams(); // Use the useParams hook to get the reportId

  useEffect(() => {
    const formData = new FormData();
    formData.append("report_id", reportId); // Use reportId from the URL

    const requestOptions = {
      method: "POST",
      body: formData,
      redirect: "follow",
    };

    fetch(`${SERVER_URL}/api/fetch_report/`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success" && typeof data.data === "object") {
          const parsedData = JSON.parse(data.data.data);
          console.log(parsedData);
          setReportData(parsedData);

          // Replace single quotes with double quotes and parse
          const imageUrlsString = data.data.image_urls.replace(/'/g, '"');
          const parsedImageUrls = JSON.parse(imageUrlsString);
          setImageUrls(parsedImageUrls);

          setDataLoaded(true);
        } else {
          console.error("Data fetched is not in the expected format:", data);
        }
      })
      .catch((error) => {
        console.log("error", error);
        setDataLoaded(false);
      });
  }, [reportId]); // Dependency array now includes reportId

  if (!dataLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div id="reportContent">
      {reportData.data.map((item, index) => (
        <div key={index} className="report-section">
          <h2>{item.slide_title}</h2>
          {typeof item.content === "object" ? (
            <div>
              {Object.entries(item.content).map(([key, value]) => (
                <p key={key}>
                  <strong>{key}:</strong> {value.toString()}
                </p>
              ))}
            </div>
          ) : (
            <p>{item.content}</p>
          )}
          {imageUrls[index] && (
            <img src={imageUrls[index]} alt="Report Section" />
          )}
        </div>
      ))}
    </div>
  );
};

export default ReportComponent;
