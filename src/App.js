import React from 'react';
import {createBrowserRouter, Route, RouterProvider} from 'react-router-dom';
import ExhibitionGallery from './ExhibitionGallery/index';
import './App.css';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <ExhibitionGallery />
    }
      
  ]);
return ( <RouterProvider router={router} />)
}

export default App;

