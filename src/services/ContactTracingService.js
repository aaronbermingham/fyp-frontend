import axios from 'axios'
import authHeader from './AuthHeader';
const TRACE_API_BASE_URL = "http://localhost:8080/api/auth/tracking/"

class ContactTracingService {
    // Methods for booking items
    getTrackingList(booking){
        return axios.post(TRACE_API_BASE_URL + "getTrackingHistory", booking,{ headers: authHeader() });
    }

    
  
}

export default new ContactTracingService()