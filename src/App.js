import { Route, Routes, BrowserRouter, useLocation } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { routesConfig } from 'shared/routesConfig';

function AppLayout() {
  const location = useLocation();

  const isAuthPage = location.pathname === '/auth';

  return (
    <>
      {!isAuthPage && <Header />}
      <Routes>
        {routesConfig.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Routes>
      {!isAuthPage && <Footer />}
    </>
  );
}

function App() {
  return (
    <BrowserRouter basename="/public">
      <AppLayout />
    </BrowserRouter>
  );
}

export default App;
