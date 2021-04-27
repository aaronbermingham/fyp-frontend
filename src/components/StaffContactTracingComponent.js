import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import DatePicker from "react-datepicker";
import AuthService from "../services/AuthService";
import Lost from "./LostComponent";
import { Card, Button, Row, Col, ListGroup } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ContactTracingService from "../services/ContactTracingService";
import StaffService from "../services/StaffService";
import ShiftHistoryService from "../services/ShiftHistoryService";

class StaffContactTracingComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      bId: 0,
      date: new Date(),
      time: new Date(),
      staffMember: 1,
      contacts: [],
      getContacts: false,
      staffList: [],
      staffContact:[]
    };

    this.handleChange = this.handleChange.bind(this); 
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.sendEmail = this.sendEmail.bind(this);
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();
    console.log("Current user id add booking ", user.id);

    StaffService.getStaff().then((res) => {
      let staff = res.data;
      console.log("Staff ", staff);
      this.setState({
        staffList: staff,
      });
      console.log(this.state.staffList);
    });

    if (user) {
      this.setState({
        id: user.id,
        currentUser: user,
        businessUser: user.roles.includes("ROLE_BUSINESS"),
      });
    }
  }

  changeStaffMemberHandler = (event) => {
    this.setState({ staffMember: event.target.value });
    console.log("Staff ", this.state.staffMember);
  };

  handleChange(date) {
    this.setState({
      date: date,
    });
    console.log("date", this.state.date);
  }

  onFormSubmit(e) {
    e.preventDefault();
    console.log("Date: " + this.state.date);
    console.log("\nTime: " + this.state.time);
  }

  getListofContacts = (e) => {
    const locale = "en";
    this.setState({ getContacts: !this.state.getContacts });
    e.preventDefault();
    let staffShift = {
      startDate: this.state.date.toISOString().slice(0, 10),
    };
    console.log("date => " + JSON.stringify(staffShift));
    StaffService.getStaffContacts(this.state.staffMember, staffShift).then(
      (res) => {
        console.log("Contacts ", res.data);
        this.setState({ contacts: res.data });
        this.setState({
          staffId: this.state.contacts.map((contact) => contact.staffNum),
        });
      }
    );
    StaffService.getStaffCustomerContacts(staffShift).then(
      (res) => {
        console.log("Staff Contacts ", res.data);
        this.setState({ staffContact: res.data });
        console.log(
          "Staff ", this.state.staffContact
        );
      }
    );
  };

  sendEmail(contact){
    ContactTracingService.sendTrackingEmail(contact);
  }

  render() {
    const { businessUser } = this.state;

    return (
      <div>
        {businessUser ? (
          <div>
            <h2>Contact Tracing</h2>
            <h4>Add the estimated date that the staff member became ill</h4>
            <form onSubmit={this.onFormSubmit}>
              <div className="form-group">
                <label>Staff member</label>
                <select
                  placeholder="Assign staff"
                  name="staff"
                  className="form-control"
                  selected={this.state.staffMember}
                  onChange={this.changeStaffMemberHandler}
                  class="form-control w-25"
                >
                  {this.state.staffList.map((staff) => {
                    return <option value={staff.id}>{staff.name}</option>;
                  })}
                </select>
              </div>
              <div className="form-group">
                <label>Pick a date</label>
                <br></br>
                <DatePicker
                  selected={this.state.date}
                  onChange={this.handleChange}
                  name="date"
                  //minDate={new Date()}
                  dateFormat="yyyy/MM/dd"
                  className="form-control"
                  showDisabledMonthNavigation
                />
                <br></br>
              </div>

              <button
                className="btn btn-primary"
                onClick={this.getListofContacts}
              >
                Get contacts
              </button>
            </form>
          </div>
        ) : (
          <Lost />
        )}
        <div>
          <div className="row">
            {this.state.contacts.map((contact) => (
              <Card>
                <Card.Header>Customer</Card.Header>
                <Card.Body>
                  <Card.Text>
                    <p>Name: {contact.name}</p>
                    <p>Email: {contact.email}</p>
                    <p>Booking date: {contact.date}</p>
                    <p>Booking time: {contact.timeStart}</p>
                    <button className="btn btn-success"  onClick={() => {this.sendEmail(contact.id) }}>
                      Send warning email
                    </button>
                  </Card.Text>
                </Card.Body>
              </Card>
            ))}
          </div>
        </div>
        <div>
          <div className="row">
            {this.state.staffContact.map((contact) => (
              <Card>
                <Card.Header>Staff</Card.Header>
                <Card.Body>
                  <Card.Text>
                    <p>Name: {contact.name}</p>
                    <p>Email: {contact.email}</p>
                    <p>Phone number {contact.phoneNumber}</p>
                    <button className="btn btn-success"  onClick={() => {this.sendEmail(contact.id) }}>
                      Send warning email
                    </button>
                  </Card.Text>
                </Card.Body>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default StaffContactTracingComponent;
