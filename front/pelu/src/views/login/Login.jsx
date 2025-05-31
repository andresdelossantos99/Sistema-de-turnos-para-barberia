  import Styles from './Login.module.css';
  import { useFormik} from 'formik'
  import {loginFormValidate} from '../../helpers/formValidates'
  import axios from 'axios';
  import swal from 'sweetalert2';
  import { Link,  useNavigate } from 'react-router-dom';

  export default function Login({setIsLogged}) {
const navigate = useNavigate()

 const formik = useFormik({
    initialValues:{
      username:'',
      password:''
    },
    initialErrors:{
      username:'username is required',
      password:'password is required'
    },
      validate: loginFormValidate,
      onSubmit: (values) => {
        axios
        .post('http://localhost:3000/users/login', values)
        .then((res) => {
            if (res.status === 200 && res.data) {
              setIsLogged(true);
          localStorage.setItem('user', JSON.stringify(res.data))
                swal.fire({
                title: 'Login exitoso',
                text: 'Bienvenidx',
                icon: 'success',
                confirmButtonText: 'Aceptar'
              }).then(()=>{
                navigate('/')
        })
      }
      })
          .catch((err) => {
            if (err.status === 400) {
              swal.fire({
                title: 'Error',
                text: `${err.response.data.error}.`,
                icon: 'error',
                confirmButtonText: 'Aceptar'
              });
            }
          });
      }

  })

    return (
    
      <div className={Styles.loginContainer}>
        <form onSubmit={formik.handleSubmit}>
        <h2>Login</h2>

          <div>
            <label >Username:</label>
            <input
            type="text"
              onChange={formik.handleChange}
              name='username' 
              value={formik.values.username}
              placeholder='username'/>
              <label className={Styles.errorLabel}>{formik.errors.username ? formik.errors.username : ''}</label>
          </div>
          <div>
            <label>Password:</label>
            <input 
            type="password"
            onChange={formik.handleChange} 
            name='password'
            value={formik.values.password}
            placeholder='password'
            />
            {formik.errors.password && formik.errors.password ? (
            <label className={Styles.errorLabel}>{formik.errors.password}</label>
            ) : null }
          </div>
          <button
          className={Styles.formButton}
          type="submit"
          disabled={
            Object.keys(formik.errors).length > 0 ||
            !formik.values.username ||
             !formik.values.password
             }>
             Submit
              </button>   
              <br />
              <label> Aun no tienes cuenta? <Link to="/register" >Registrate </Link>
              </label>    
        </form>
        </div> 
    );
  }