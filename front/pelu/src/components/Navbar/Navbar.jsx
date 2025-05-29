import styles from './Navbar.module.css';
import logo from '../../assets/peluqueria.png'; 
import { ImScissors } from "react-icons/im";
import { Link, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2'


const Navbar = ({ onLogout}) => {

  const location = useLocation();
const handleLogout = ()=>{

    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Vas a cerrar sesión.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, cerrar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        onLogout();
      }
    });
  };
  return (
    <nav className={styles.Navbar}>
      <img src={logo} alt="Logo" className={styles.Logo} />

      <ul className={styles.NavLinks}>
        <li className={styles.NavItem}>
          <Link 
            to="/"
            className={`${styles.NavLink} ${location.pathname === '/' ? styles.active : ''}`}
          >
            Inicio
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link
          to="/agendarturno"
          className={`${styles.NavLink} ${
            location.pathname === "/agendarturno" ? styles.active : ""
          }`}
>
  Agendar Turno
</Link>
        </li>
        <li className={styles.NavItem}>
          <Link 
            to="/misturnos"
            className={`${styles.NavLink} ${location.pathname === '/misturnos' ? styles.active : ''}`}
          >
            Mis Turnos
          </Link>
        </li>
        <li>
          <ImScissors className={styles.NavScissors} />
        </li>
        <li className={styles.NavLink} onClick={handleLogout}>LogOut </li>
      </ul>
    </nav>
  );
};

export default Navbar;