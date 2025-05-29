import Swal from 'sweetalert2';
import Styles from './Turno.module.css';
import axios from 'axios'

export default function Turno({ id, date, time, status, setTurnos}) {
   const handleCancel = async () => {
    try {
      await axios.put(`http://localhost:3000/appointments/cancel/${id}`);
      setTurnos(prev =>
        prev.map(turno =>
          turno.id === id ? { ...turno, status: 'cancelado' } : turno
        )
      );
      Swal.fire({
        icon: "warning",
        color: "red",
        title: "Turno cancelado correctamente",
      });
    }catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error al cancelar el turno. Intentalo nuevamente.",
      });
    }
  };
return (
    <div className={Styles.appointmentContainer}>
      <div className={Styles.appointmentHeader}>
        <h3> Turno {id} </h3>
        <span
          className={
            status === "active"
              ? Styles.statusActive
              : Styles.statusInactive
          }
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      </div>
      <div className={Styles.appointmentContent}>
        <p>
          <strong>Fecha:</strong> <span>{date}</span>
        </p>
        <p>
          <strong>Hora:</strong> <span>{time}</span>
        </p>
        {status.toLowerCase() === "active" && (
          <button onClick={handleCancel}className={Styles.formButton}>
            Cancelar Turno
          </button>
        )}
      </div>
    </div>
  );
}