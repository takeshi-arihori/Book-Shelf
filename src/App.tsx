import { Routes, Route } from 'react-router-dom';
import { Builder } from './pages/Builder';
import { LibraryApp } from './pages/LibraryApp';
import { Nav } from './components/Nav';

const App = () => {
    return (
        <>
            <Nav />
            <Routes>
                <Route path='/' element={<Builder />} />
                <Route path='/builder' element={<Builder />} />
                <Route path='/library' element={<LibraryApp />} />
            </Routes>
        </>
    );
}

export default App;
