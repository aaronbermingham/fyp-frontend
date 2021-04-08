import axios from 'axios'
import authHeader from './AuthHeader';
const STAFF_API_BASE_URL = "http://localhost:8080/api/auth/staff/"

class StaffService {
    // Methods for booking items
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

    // addBookingItem(bookingId, itemId){
    //     return axios.post(STAFF_API_BASE_URL + "addItem/" + bookingId + "/" + itemId, { headers: authHeader() });
    // }

    // getBookingsById(bookingId){
    //     return axios.get(STAFF_API_BASE_URL + "bookingById/" + bookingId,{ headers: authHeader() });
    // }

    // clearBookings(){
    //     return axios.post( "http://localhost:8080/api/user/clearRes", { headers: authHeader() });
    // }

    // getBookingsByUserId(userId){
    //     return axios.get(STAFF_API_BASE_URL + "userBookings/" + userId,{ headers: authHeader() });
    // }

    // deleteBooking(bookingId){
    //     return axios.delete(STAFF_API_BASE_URL + "deleteBooking/" + bookingId,{ headers: authHeader() });
    // }


  
}

export default new StaffService()