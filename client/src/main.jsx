import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

const root = document.documentElement;
const savedTheme = localStorage.getItem("theme") || "dark";

if (savedTheme === "dark"){
  root.classList.add("dark");
} else {
  root.classList.remove("dark");
}

createRoot(document.getElementById('root')).render(
  
    <BrowserRouter>
      <App />
    </BrowserRouter>
  
)
