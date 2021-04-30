import axios from "axios";
import authHeader from "./AuthHeader";
const STAFF_API_BASE_URL = "http://localhost:8080/api/auth/staff/";

class StaffService {
  addTables(staffId, tableId) {
    return axios.post(
      STAFF_API_BASE_URL + "assignTable/" + staffId + "/" + tableId,
      { headers: authHeader() }
    );
  }

  addStaff(staff) {
    return axios.post(STAFF_API_BASE_URL + "addStaff/", staff, {
      headers: authHeader(),
    });
  }

  getStaff() {
    return axios.get(STAFF_API_BASE_URL + "all", { headers: authHeader() });
  }

  getStaffById(id) {
    return axios.get(STAFF_API_BASE_URL + "staffById/" + id, {
      headers: authHeader(),
    });
  }

  getAvailStaff() {
    return axios.get(STAFF_API_BASE_URL + "availStaff", {
      headers: authHeader(),
    });
  }

  addShift(staffId, shift) {
    console.log(
      "THIS is the add staff url",
      STAFF_API_BASE_URL + "addShift/" + staffId
    );
    console.log("THIS is the add staff date object", shift);
    return axios.post(STAFF_API_BASE_URL + "addShift/" + staffId, shift, {
      headers: authHeader(),
    });
  }

  addStaffRoster(shiftId, rosterId) {
    return axios.post(
      STAFF_API_BASE_URL + "addRoster/" + shiftId + "/" + rosterId,
      { headers: authHeader() }
    );
  }

  closeShift(shiftId, shift) {
    return axios.post(STAFF_API_BASE_URL + "closeShift/" + shiftId, shift, {
      headers: authHeader(),
    });
  }

  getStaffContacts(staffId, shift) {
    return axios.post(
      STAFF_API_BASE_URL + "getStaffContacts/" + staffId,
      shift,
      { headers: authHeader() }
    );
  }

  getStaffCustomerContacts(shift) {
    return axios.post(STAFF_API_BASE_URL + "allStaffByShiftDate", shift, {
      headers: authHeader(),
    });
  }
}

export default new StaffService();
