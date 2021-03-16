import axios from 'axios';
import authHeader from './AuthHeader';

const API_URL = 'http://localhost:8080/api/auth/';
const BOOKING_URL = "http://localhost:8080/api/user/"

class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'all');
  }

  getUserBoard() {
    return axios.get(API_URL + 'user', { headers: authHeader() });
  }

  getModeratorBoard() {
    return axios.get(API_URL + 'mod', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }

  getUsers() {
    return axios.get(API_URL + "users", { headers: authHeader() });
}

getUserById(userId) {
  return axios.get(API_URL + "userById/" + userId, { headers: authHeader() });
}

updateUser(user, userId) {
  return axios.put(API_URL + "updateUser/" + userId, user, { headers: authHeader() });
}

addBooking(booking, userId) {
  const user = JSON.parse(localStorage.getItem('user'));
  const token = user.accessToken;

  // const token = this.getCurrentUser().accessToken;
  console.log("Token ", token);
  return axios.post(BOOKING_URL + "addBooking/" + userId, booking, { headers: authHeader() });
}

}

export default new UserService();
