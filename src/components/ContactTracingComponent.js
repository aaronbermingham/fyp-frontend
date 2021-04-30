import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import DatePicker from "react-datepicker";
import AuthService from "../services/AuthService";
import Lost from "./LostComponent";
import { Card } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ContactTracingService from "../services/ContactTracingService";
import StaffService from "../services/StaffService";

class ContactTracingComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      bId: 0,
      date: new Date(),
      time: new Date(),
      staffId: 0,
      contacts: [],
      getContacts: false,
      staffContact: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.sendEmail = this.sendEmail.bind(this);
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();
    console.log("Current user id add booking ", user.id);

    if (user) {
      this.setState({
        id: user.id,
        currentUser: user,
        businessUser: user.roles.includes("ROLE_BUSINESS"),
      });
    }
  }

  handleChange(date) {
    this.setState({
      date: date,
      time: date,
    });
    console.log("date", this.state.date);
    console.log("time", this.state.time);
  }

  onFormSubmit(e) {
    e.preventDefault();
    console.log("Date: " + this.state.date);
    console.log("\nTime: " + this.state.time);
  }

  getListofContacts = (e) => {
    this.setState({ getContacts: !this.state.getContacts });
    e.preventDefault();
    let staffShift = {
      startDate: this.state.date.toISOString().slice(0, 10),
    };
    console.log("staffShift => " + JSON.stringify(staffShift));
    ContactTracingService.getTrackingList(staffShift).then((res) => {
      console.log("Contacts ", res.data);
      this.setState({ contacts: res.data });
    });

    StaffService.getStaffCustomerContacts(staffShift).then((res) => {
      console.log("Staff Contacts ", res.data);
      this.setState({ staffContact: res.data });
      console.log("Staff ", this.state.staffContact);
    });
  };

  sendEmail(contact) {
    ContactTracingService.sendTrackingEmail(contact);
  }

  render() {
    const { businessUser } = this.state;

    return (
      <div>
        {businessUser ? (
          <div>
            <h2>Contact Tracing</h2>
            <h4>Add the date and time for the covid case</h4>
            <form onSubmit={this.onFormSubmit}>
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
                    <button
                      className="btn btn-success"
                      onClick={() => {
                        this.sendEmail(contact.id);
                      }}
                    >
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
                    <button
                      className="btn btn-success"
                      onClick={() => {
                        this.sendEmail(contact.id);
                      }}
                    >
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

export default ContactTracingComponent;
