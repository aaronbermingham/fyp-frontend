import axios from 'axios'
import authHeader from './AuthHeader';

const TABLE_API_BASE_URL = "http://localhost:8080/api/auth/table/"
const RESTAURANT_API_BASE_URL = "http://localhost:8080/api/auth/restaurant/"

class TableService{
     getTables(){
        return axios.get(TABLE_API_BASE_URL + "all", { headers: authHeader() });
    }

    getUnreservedTables(booking){
        console.log("service booking ", booking)
        return axios.post(TABLE_API_BASE_URL + "allUnreservedTables", booking, { headers: authHeader() });
    }

    addTable(table, staffId){
        console.log("API call ", TABLE_API_BASE_URL + "addTable/" + staffId)
        return axios.post(TABLE_API_BASE_URL + "addTable/" + staffId, table, { headers: authHeader() });
    }
    
    getSeats(){
        return axios.get(TABLE_API_BASE_URL + "numSeats", { headers: authHeader() });
    }

    get1mCapacity(id){
        return axios.get(RESTAURANT_API_BASE_URL + "capacity1m/"+ id, { headers: authHeader() });
    }

    get2mCapacity(id){
        return axios.get(RESTAURANT_API_BASE_URL + "capacity2m/"+ id,  { headers: authHeader() });
    }

    getCurrentCapacity(id){
        return axios.get(RESTAURANT_API_BASE_URL + "currentCapacity/"+ id,  { headers: authHeader() });
    }

    getRestaurant(id){
        return axios.get(RESTAURANT_API_BASE_URL + "restaurantById/"+ id,  { headers: authHeader() });
    }

    setCurrentCapacity(id, type){
        return axios.post(RESTAURANT_API_BASE_URL + "setCurrentCapacity/" + id +"/"+ type, { headers: authHeader() });
    }

    deleteTable(id){
        return axios.delete(TABLE_API_BASE_URL + "deleteTable/" + id,{ headers: authHeader() });
    }

    toggleTable(id){
        return axios.put(TABLE_API_BASE_URL + "toggleTable/" + id, { headers: authHeader() })
    }
}

export default new TableService()