import logo from './logo.svg';
import './App.css';

function App() {
  return (
      <div className="App">
          <div className="hs-artifacts">
              <div className="vertical-line"></div>
              <div className="vertical-text">
                  HIGH SCHOOL<br/>ARTIFACTS
              </div>
          </div>
          <div className="element-container">
              <div className="moon"></div>
              <label className="switch">
                  <input className="cb" type="checkbox"/>
                  <div className="toggle">
                      <div className="left"><span className="text">off</span></div>
                      <div className="right"><span className="text">on</span></div>
                  </div>
              </label>
          </div>
          <div className="title"></div>
      </div>
  );
}

export default App;
