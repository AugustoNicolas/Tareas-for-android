import axios from "axios"
export const createTask = async (nombre, detalle , vencimiento, nota, origin, foto) =>{
    try{
        const task = {
            nombre,
            detalle,
            vencimiento,
            nota,
            prioridad : 0,
            estado : 0,
            origin,
            foto
        }
        const resp = await axios.post("http://192.168.50.81:8002/tasks", task)
    
        return resp
    } catch(error){
        return error
    }
}