import { AppDataSource } from "./config/data-source";   
import { config } from "./config/envs";
import server from "./server";
import "reflect-metadata"

AppDataSource.initialize()
    .then(() => {
        console.log("Base de datos conectada");

        server.listen(config.PORT, ()=>{
            console.log(`Servidor escuchando en el puerto ${config.PORT}`);
        })
    })
    .catch((error) => {
        console.error("Error al conectar a la base de datos:", error);
    });
