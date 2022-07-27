import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './component/Header';
import Auth from './Page/Auth';
import Home from './Page/Home';
import { useState, useEffect } from 'react';

function App() {

  const [local, setLocal] = useState(null)
  useEffect(() => {
    setLocal(JSON.parse(localStorage.getItem('tokens')))
  }, [])

  if (local === null || local.message) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Auth />} />
          <Route path='*' element={<Auth />} />
        </Routes>
      </BrowserRouter>
    )
  } else {
    return (
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Home local={local} />} />
          <Route path='*' element={<Home local={local} />} />
        </Routes>
      </BrowserRouter>
    )
  }
}
export default App;
