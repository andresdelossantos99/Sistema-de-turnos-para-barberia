import { useFormik } from "formik";
import Styles from './Register.module.css';
import axios from "axios";
import { Link } from "react-router-dom";
import { registerFormValidate } from "../../helpers/formValidates";
import swal from 'sweetalert2';

export default function Register({onRegisterSucces}) {
    const formik = useFormik({
    initialValues: {
        name: '',
        nDni: '',
        email: '',
        birthdate: '',
        username: '',
        password: ''
    },
    validate:registerFormValidate,
    onSubmit: (values) => {
        console.log('POST:', values);
        axios.post('http://localhost:3000/users/register', values)
            .then((res) => {
                if (res.status === 201) {
                    console.log("Usuario creado:", res.data);
                    swal.fire({
                        title: 'Registro exitoso',
                        text: 'El usuario ha sido creado correctamente.',
                        icon: 'success',
                        confirmButtonText: 'Aceptar'
                    }).then(()=>{
                      if (onRegisterSucces) onRegisterSucces(); 
                      console.log(onRegisterSucces);
                      
                    })
                }
            })
              .catch((err) => {
          console.log(err.response?.data || err.message);
          swal.fire({
            title: 'Error',
            text: err.response?.data?.error || 'Hubo un problema al registrar el usuario.',
            icon: 'error',
            confirmButtonText: 'Intentar de nuevo'
            });
            })
          }
});

return (
    <div className={Styles.registerContainer}>
      <form onSubmit={formik.handleSubmit}>
        <h2>Registro</h2>

        <label>Nombre:</label>
        <input
          name="name"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.name}
        />
        {formik.errors.name && <p className={Styles.error}>{formik.errors.name}</p>}

        <label>DNI:</label>
        <input
          name="nDni"
          type="number"
          onChange={formik.handleChange}
          value={formik.values.nDni}
        />
        {formik.errors.nDni && <p className={Styles.error}>{formik.errors.nDni}</p>}

        <label>Email:</label>
        <input
          name="email"
          type="email"
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        {formik.errors.email && <p className={Styles.error}>{formik.errors.email}</p>}

        <label>Fecha de nacimiento:</label>
        <input
          name="birthdate"
          type="date"
          onChange={formik.handleChange}
          value={formik.values.birthdate}
        />
        {formik.errors.birthdate && <p className={Styles.error}>{formik.errors.birthdate}</p>}

        <label>Username:</label>
        <input
          name="username"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.username}
        />
        {formik.errors.username && <p className={Styles.error}>{formik.errors.username}</p>}

        <label>Password:</label>
        <input
          name="password"
          type="password"
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        {formik.errors.password && <p className={Styles.error}>{formik.errors.password}</p>}

        <button
        className={Styles.formButton}
         type="submit"
         disabled={Object.keys(formik.errors).length > 0||
          !formik.values.name ||
          !formik.values.nDni ||  
          !formik.values.email ||
          !formik.values.birthdate ||
          !formik.values.username ||
          !formik.values.password
        }>Submit</button>
         <br />
              <label>Ya tienes cuenta? <Link to="/login" >Inicia sesion </Link>
              </label>  
        
      </form>
    </div>
  );
}