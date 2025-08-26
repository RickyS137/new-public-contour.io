import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { routesConfig } from 'shared/routesConfig';

function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        {
          routesConfig.map(({ path, element }, index) => (
            <Route index={index} path={path} element={element}/>
          ))
        }
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
