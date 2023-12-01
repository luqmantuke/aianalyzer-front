import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  useRoutes,
  Navigate,
} from "react-router-dom";
import ReportComponent from './components/ReportComponent';
import UploadPdf from './components/UploadPdf'; // Assuming this is the correct import

function App() {
  const AppWrapper = () => {
    let routes = useRoutes([
      { path: "/", element: <Navigate to="/uploadPdf" replace /> },
      { path: "/report/:reportId", element: <ReportComponent /> }, // Dynamic path for report IDs
      { path: "/uploadPdf", element: <UploadPdf /> },
      // ... add other routes here
    ]);
    return routes;
  };

  return (
    <div className="App">
      <Router>
        <AppWrapper />
      </Router>
    </div>
  );
}

export default App;
