import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import "./navbar.css"
import "./components/homepage.css"
import "./components/tips.css"
import "./components/properties.css"
import "./connection/signup.css"
import "./connection/login.css"
import "./components/addads.css"
import "./components/cardofproperty.css"
import "./components/modalproperty.css"
import "./components/editads.css"
import "./components/edittip.css"
import "./components/brokers.css"
import "./components/editprofile.css"
import "./components/dashbord.css"
import "./components/map.css"
import "./components/contactpage.css"
import "./components/searchinput.css"
import "react-alice-carousel/lib/alice-carousel.css";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <App/>
    </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
