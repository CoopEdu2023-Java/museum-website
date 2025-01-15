import Catalog from './Catalog/index';
import ExhibitionGallery from "./ExhibitionGallery";
import SwiperComponent from "./ArtifactsGallery";
import './App.css';
import * as React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Epilogue from "./Epilogue";
import HomePage from "./HomePage ";
import {useOrientation} from "./useOrientation/useOrientation";
import DeclarationPage from "./Declaration/DeclarationPage";
import {Rotate} from "./useOrientation/Rotate";
import ArtifactModal from "./ArtifactModal";


function App() {
  const isLandscape = useOrientation();

  const router = createBrowserRouter([
    {
      path: 'home-page',
      element:
      <div className="App">
        <Rotate rotate={!isLandscape}>
          <HomePage/>
        </Rotate>
      </div>
    },
    {
      path: 'declaration',
      element:
      <div className="App">
        <Rotate rotate={!isLandscape}>
          <DeclarationPage isLandscape={isLandscape} />
        </Rotate>
      </div>
    },
    {
      path: 'catalog',
      element:
        <div className="App">
          <header className="App-header">
            <Rotate rotate={!isLandscape}>
              <Catalog/>
            </Rotate>
          </header>
        </div>
    },
    {
      path: 'exhibition-gallery/:competencyName/:page',
      element:
        <div className="App">
          <Rotate rotate={!isLandscape}>
          <div>
              <ExhibitionGallery/>
          </div>
          </Rotate>
        </div>
    },
    {
      path: 'artifacts-gallery/:competencyName/:page',
      element:
        <div className="App">
          <Rotate rotate={!isLandscape}>
          <SwiperComponent />
          <div className="bottom-image">
            <img src="/ArtifactsGallery/galaxy.svg" alt="galaxy Image" />
          </div>
            </Rotate>
        </div>
    },
    {
      path: 'epilogue',
      element:
        <div className="App">
          <Rotate rotate={!isLandscape}>
            <Epilogue isLandscape={isLandscape}/>
          </Rotate>
        </div>
    },
    {
      path: "/",
      element:
    <div className="App">
      <ArtifactModal />
    </div>
    }
  ]);
  return <RouterProvider router={router}/>;
}

export default App;
