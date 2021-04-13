import axios from 'axios'
import authHeader from './AuthHeader';
const STAFF_API_BASE_URL = "http://localhost:8080/api/auth/staff/"

class StaffService {
    
    addTables(staffId, tableId){
        return axios.post(STAFF_API_BASE_URL + "assignTable/" + staffId + "/" + tableId,{ headers: authHeader() });
    }

    addStaff(staff){
        return axios.post(STAFF_API_BASE_URL + "addStaff/", staff ,{ headers: authHeader() });
    }

    getStaff() {
        return axios.get(STAFF_API_BASE_URL + "all", { headers: authHeader() });
      }

      getStaffById(id) {
        return axios.get(STAFF_API_BASE_URL + "staffById/" + id, { headers: authHeader() });
      }

      removeShift(shiftId, staffId){
        return axios.delete(STAFF_API_BASE_URL + "removeShift/" + shiftId + "/" + staffId, { headers: authHeader() });
      }



  
}

export default new StaffService()