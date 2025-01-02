import React from 'react';
import ReactDOM from 'react-dom/client';
import SwiperComponent from './components/SwiperComponent';
import App from './App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <SwiperComponent />
    <div className="bottom-image">
      <img src="/galaxy.svg" alt="Bottom Image" />
    </div>
  </React.StrictMode>
);
