import axios from 'axios'

export const deleteTask = async(id) => {
    try{
        const url = "http://192.168.50.81:8002/tasks/" + id

        const resp = await axios.delete(url);
        return resp.data
    } catch(error){
        return error
    }
    
}

