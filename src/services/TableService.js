import axios from 'axios'
import authHeader from './AuthHeader';

const ITEM_API_BASE_URL = "http://localhost:8080/api/auth/table/"

class TableService{
     getTables(){
        return axios.get(ITEM_API_BASE_URL + "all", { headers: authHeader() });
    }

    addTable(table){
        return axios.post(ITEM_API_BASE_URL + "addTable", table, { headers: authHeader() });
    }
    getSeats(){
        return axios.get(ITEM_API_BASE_URL + "numSeats", { headers: authHeader() });
    }

    get1mCapacity(id){
        return axios.get(ITEM_API_BASE_URL + "capacity1m/"+ id, { headers: authHeader() });
    }

    get2mCapacity(id){
        return axios.get(ITEM_API_BASE_URL + "capacity2m/"+ id,  { headers: authHeader() });
    }

    getCurrentCapacity(id){
        return axios.get(ITEM_API_BASE_URL + "currentCapacity/"+ id,  { headers: authHeader() });
    }

    getRestaurant(id){
        return axios.get(ITEM_API_BASE_URL + "restaurantById/"+ id,  { headers: authHeader() });
    }

    setCurrentCapacity(id, type){
        return axios.post(ITEM_API_BASE_URL + "setCurrentCapacity/" + id +"/"+ type, { headers: authHeader() });
    }

    deleteTable(id){
        return axios.delete(ITEM_API_BASE_URL + "deleteTable/" + id,{ headers: authHeader() });
    }
}

export default new TableService()