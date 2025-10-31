import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

if (!window.location.pathname.startsWith('/login')) {
  root.render(<App />);
  
  if (window.location.pathname === '/') {
    window.history.replaceState(null, '', '/public/main');
  }
}