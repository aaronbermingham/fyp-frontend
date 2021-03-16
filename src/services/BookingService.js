import axios from 'axios'
import authHeader from './AuthHeader';
const BOOKING_API_BASE_URL = "http://localhost:8080/api/auth/bookings/"

class BookingService {
    // Methods for booking items
    getBookings(){
        return axios.get(BOOKING_API_BASE_URL + "all",{ headers: authHeader() });
    }

    addBookingItem(bookingId, itemId){
        return axios.post(BOOKING_API_BASE_URL + "addItem/" + bookingId + "/" + itemId, { headers: authHeader() });
    }

    getBookingsById(bookingId){
        return axios.get(BOOKING_API_BASE_URL + "bookingById/" + bookingId,{ headers: authHeader() });
    }

    clearBookings(){
        return axios.post( "http://localhost:8080/api/user/clearRes", { headers: authHeader() });
    }

    getBookingsByUserId(userId){
        return axios.get(BOOKING_API_BASE_URL + "userBookings/" + userId,{ headers: authHeader() });
    }

    deleteBooking(bookingId){
        return axios.delete(BOOKING_API_BASE_URL + "deleteBooking/" + bookingId,{ headers: authHeader() });
    }


  
}

export default new BookingService()