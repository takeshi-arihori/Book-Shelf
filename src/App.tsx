import { Route, Routes } from 'react-router-dom';
import { Layout } from './components/common/Layout';
import { NotFoundPage } from './pages/NotFoundPage';
import { appRoutes } from './routes';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {appRoutes.map((route) =>
          route.index ? (
            <Route key="index" index element={<route.component />} />
          ) : (
            <Route key={route.path} path={route.path} element={<route.component />} />
          )
        )}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
