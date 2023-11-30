import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  useRoutes,
} from "react-router-dom";
import { Navigate } from 'react-router-dom';
import ReportComponent from './components/ReportComponent';
import { UploadPdf } from './components/componentIndex';
function App() {
  const AppWrapper = ({data}) => {


    let routes = useRoutes([
      { path: "/", element: <Navigate to="/uploadPdf" /> },
      { path: "/report", element: <ReportComponent/> },
      { path: "/uploadPdf", element:  <UploadPdf/>},
      // ...
    ]);
    return routes;
  };
  
  return (
    <div className="App">
           <Router>
           <AppWrapper/>
           </Router>
   
    </div>
  );
}

export default App;
