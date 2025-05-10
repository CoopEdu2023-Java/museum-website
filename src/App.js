import Carousel3D from './Catalog/index';
import './App.css';
import * as React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

function App() {
  const router = createBrowserRouter([
    {
      path: '',
      element: <div>Hello world！</div>,
    },
    {
      path: 'motion',
      element:
        <div className="App">
          <header className="App-header">
            <Carousel3D/>
          </header>
        </div>
    }
  ]);
  return <RouterProvider router={router}/>;
}

export default App;
