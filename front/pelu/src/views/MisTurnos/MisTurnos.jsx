import {  useEffect, useState } from "react";
import Styles from "./MisTurnos.module.css";
import Turno from "../../components/Turno/Turno";
import axios from "axios";
import NoHayTurnos from "./NoHayTurnos.jsx"

export default function MisTurnos (){
    const [turnos,  setTurnos] = useState([])
    const [loading, setLoading] = useState(true)

useEffect(() => {
  const userJson = localStorage.getItem('user')
  const user = JSON.parse(userJson)
  console.log(user)

  if (!user.data?.id) return;
  const fecthAppoinments = async () =>{
    try {
        const response = await axios.get(`http://localhost:3000/users/${user.data.id}`);
       console.log(response);
       
        
        const userAppointments = response.data.data.appointments;

        setTurnos(userAppointments);
        localStorage.setItem("appointments", JSON.stringify(userAppointments));
      } catch (error) {
        console.error("Error al obtener los turnos:", error);
      } finally { 
        setLoading(false);
      }
    };
 
  fecthAppoinments()
}, [])
    return(
       <div className={Styles.container}>
        <div className={Styles.header}>
          <h1 className={Styles.text}>Mis Turnos</h1>
        </div>
        <div className={Styles.content}>
          {loading?(
          <h2>Cargando Turnos...</h2>
    ) : turnos.length > 0 ? (
      turnos.map(({id, date, time, status}) =>(
      
            <Turno 
                key={id} 
                id={id}
                date={date}
                time={time}
                status={status}
                setTurnos={setTurnos}
             />
      ))
       ) : (<NoHayTurnos/>

       )}
        </div>
      </div>
    );
}
