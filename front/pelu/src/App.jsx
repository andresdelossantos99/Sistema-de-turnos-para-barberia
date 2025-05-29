  import './App.module.css';
  import Home from './views/home/Home';
  import MisTurnos from './views/MisTurnos/MisTurnos';
  import Login from './views/login/Login';
  import Register from './views/register/Register';
  import Navbar from './components/Navbar/Navbar';
  import AgendarTurno from './views/AgendarTurno/AgendarTurno';
  import { Route, Routes, useLocation, useNavigate, Navigate } from 'react-router-dom';
  import { useState, useEffect } from 'react';

  function App() {
    const [isLogged, setIsLogged] = useState(() => !!localStorage.getItem('user'));
    const navigate = useNavigate();
    const location = useLocation();
    const user = JSON.parse(localStorage.getItem('user'));
    

    useEffect(() => {
      const isPublicRoute = location.pathname === '/login' || location.pathname === '/register';
      if (!isLogged && !isPublicRoute) {
        navigate('/login');
      }
    }, [location.pathname, isLogged, navigate]);

    const handleLogout = () => {
      localStorage.removeItem('user');
      setIsLogged(false);
      navigate('/login');
    };

    return (
      <>
        {isLogged && <Navbar onLogout={handleLogout} />}

        <main>
          <Routes>
            
            {!isLogged && (
    <>
      <Route path="/login" element={<Login setIsLogged={setIsLogged} />} />
      <Route path="/register" element={<Register onRegisterSucces={() => navigate('/login')} />} />
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </>
  )}

          
            {isLogged && (
              <>
                <Route path="/" element={<Home />} />
                <Route path="/misturnos" element={<MisTurnos userId={user}/>} />
                <Route path="/agendarturno" element={<AgendarTurno />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </>
            )}
          </Routes>
        </main>
      </>
    );
  }

  export default App;