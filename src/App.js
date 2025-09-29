import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { routesConfig } from 'shared/routesConfig';

function App() {
  return (
    <BrowserRouter>
      {window.location.pathname === '/login' ? (
        <Routes>
          {routesConfig.map(({ path, element }, index) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Routes>
      ) : (
        <>
          <Header/>
          <Routes>
            {routesConfig.map(({ path, element }, index) => (
              <Route key={path} path={path} element={element} />
            ))}
          </Routes>
          <Footer/>
        </>
      )}
    </BrowserRouter>
  );
}

export default App;
