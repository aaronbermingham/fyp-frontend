import axios from 'axios'
import authHeader from './AuthHeader';
const SHIFT_API_BASE_URL = "http://localhost:8080/api/auth/staffTracking/"

class ShiftHistoryService {
    
    addShiftHistory(staffId,shiftId, shift){
        return axios.post(SHIFT_API_BASE_URL + "addTrackingHistory/" + staffId +"/"+shiftId, shift,{ headers: authHeader() });
    }

    getStaffContact(staffId,date){
        return axios.post(SHIFT_API_BASE_URL + "compareTracking/" + staffId, date,{ headers: authHeader() });
    }

}

export default new ShiftHistoryService()