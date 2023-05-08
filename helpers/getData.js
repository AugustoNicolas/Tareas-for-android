import axios from 'axios'

export const getData = async() => {
    try{
        const url = "http://192.168.50.81:8002/tasks"

        const resp = await axios.get(url);
        return resp.data
    } catch(error){
        return error
    }
    
}

