import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import "./navbar.css"
import "./components/homepage.css"
import "./components/tips.css"
import "./components/propertiessale.css"
import "./connection/signup.css"
import "./connection/login.css"
import "./components/addads.css"
import "./components/addtip.css"
import "./components/cardofproperty.css"
import "./components/modalproperty.css"
import "./components/editads.css"
import "./components/brokers.css"
import "./components/editprofile.css"

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
