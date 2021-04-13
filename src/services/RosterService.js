import axios from 'axios'
import authHeader from './AuthHeader';
const SHIFT_API_BASE_URL = "http://localhost:8080/api/auth/roster/"

class RosterService {

    getShifts() {
        return axios.get(SHIFT_API_BASE_URL + "all", { headers: authHeader() });
      }

     assignShift(shiftId, staffId){
        return axios.post(SHIFT_API_BASE_URL + "assignStaff/" + shiftId + "/" + staffId, { headers: authHeader() });
      }

    
}

export default new RosterService()