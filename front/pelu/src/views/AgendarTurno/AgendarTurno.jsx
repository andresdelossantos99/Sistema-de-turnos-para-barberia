import Styles from '../AgendarTurno/AgendarTurno.module.css'
import {useFormik} from 'formik'
import Swal from 'sweetalert2';
import {dateTimeValidates} from "../../helpers/formValidates"
import axios from "axios"


export default function AgendarTurno(){

    const formik = useFormik({
        initialValues: {
            date: "",
            time: "",
        },
        initialErrors:{
            date:"Date is required",
            time: "Time is required"
        },
        validate: dateTimeValidates,
        onSubmit:(values) =>{
        const userJSON = localStorage.getItem ('user')
        const user = JSON.parse(userJSON)
            const schedule ={
            ...values,
            userId: user.data.id
        }
           axios.post('http://localhost:3000/appointments/schedule',schedule )
          .then((res)=> {
            if(res.status === 201){
                Swal.fire({
                    icon: 'success',
                    title: 'successfully scheduled'
                })
            }
        }).catch((err)=>{
            Swal.fire({
                icon: "error",
                title: `${err.response.data.error}`,
                text:"Try again",
            })
        })
         }
        })
    

    return (
        <div className={Styles.container}>
            <h1>Agendar Turno</h1>
            <form className={Styles.form} onSubmit={formik.handleSubmit}>
                <div>
                    <label htmlFor="date">Fecha</label>
                    <input 
                    id='date'
                    name='date'
                    type="date"
                    min={new Date().toISOString().split("T")[0]}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.date}
                    className={
                        formik.touched.date && formik.errors.date
                        ? Styles.errorInput
                        : Styles.input
                    } />
                    {formik.errors.date ? (
                        <>
                        <div className={Styles.error}>{formik.errors.date}</div>
                        </>
                    ) : null}
                    </div>
<div className={Styles.formGroup}>
    <label htmlFor="time">Hora</label>
    <input 
    id='time'
    name='time'
    type="time"
     onChange={formik.handleChange}
     onBlur={formik.handleBlur}
    value={formik.values.time}
    className={
        formik.touched.time && formik.errors.time
     ? Styles.errorInput
    : Styles.input
     } />
      {formik.errors.time ? (
          <>
        <div className={Styles.error}>{formik.errors.time}</div>
             </>
          ) : null}
             </div>
             <button
             type='submit'
             className={Styles.formButton}
             disabled={Object.keys(formik.errors).legth > 0}
             >
                Agendar Turno
            </button>
            </form>
        </div>
    )
}