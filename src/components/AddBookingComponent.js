import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import DatePicker from "react-datepicker";
import UserService from "../services/UserService";
import AuthService from "../services/AuthService";
import UserTables from "./UserTableComponent";
import "react-datepicker/dist/react-datepicker.css";
import "bootstrap/dist/css/bootstrap.min.css";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import { Alert } from "react-bootstrap";

class AddBookingComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      bId: 0,
      date: new Date(),
      time: null,
      numGuests: 2,
      continue: false,
      minTime: new Date(),
      maxTime: new Date(),
      timeCheck: false,
    };

    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.continue = this.continue.bind(this);
    this.reset = this.reset.bind(this);
    this.changeNumberGuestsHandler = this.changeNumberGuestsHandler.bind(this);
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();
    console.log("Current user id add booking ", user.id);

    if (user) {
      this.setState({
        id: user.id,
        currentUser: user,
        businessUser: user.roles.includes("ROLE_BUSINESS"),
        minTime: setHours(setMinutes(new Date(), 0), 12),
        maxTime: setHours(setMinutes(new Date(), 0), 22),
      });
    }
    console.log("MINTIME ", this.state.minTime);
  }

  handleDateChange(date) {
    this.setState({
      date: date,
    });
    console.log("date", this.state.date);
  }

  handleTimeChange(time) {
    this.setState({
      time: time,
      timeCheck: false,
    });

    console.log("time", this.state.time);
  }

  changeNumberGuestsHandler = (event) => {
    this.setState({ numGuests: event.target.value });
  };

  onFormSubmit(e) {
    e.preventDefault();
    console.log("Date: " + this.state.date);
    console.log("\nTime: " + this.state.time);
  }

  createBooking = (e) => {
    const locale = "en";

    e.preventDefault();
    let booking = {
      date: this.state.date.toISOString().slice(0, 10),
      time: this.state.time.toLocaleTimeString(locale, {
        hour: "numeric",
        hour12: false,
        minute: "numeric",
        second: "numeric",
      }),
      numGuests: this.state.numGuests,
    };
    console.log("booking " + JSON.stringify(booking));
    UserService.addBooking(booking, this.state.id).then((res) => {
      this.bId = res.data;
      if (this.bId === -1) {
        alert("Please choose a table with enough seats for your booking");
      } else if (this.bId === -2) {
        alert("There are no tables available at your chosen time");
      } else if (this.bId !== 0) {
        this.props.history.push(`/orderFood/${this.bId}`);
      }
    });
  };

  continue() {
    if (this.state.time != null) this.setState({ continue: true });
    else if (this.state.time === null)
      this.setState({ continue: false, timeCheck: true });
  }

  reset() {
    this.setState({
      continue: false,
    });
  }

  render() {
    let warning;
    if (this.state.timeCheck === true) {
      warning = (
        <Alert
          variant="danger"
          style={{ width: "40%", height: "auto", marginTop: "15px" }}
        >
          <p className="text-center">Please select a time for your booking</p>
        </Alert>
      );
    }

    return (
      <div>
        {/* <NavBarComponent /> */}
        <h2>Reservation</h2>
        <form onSubmit={this.onFormSubmit}>
          <div className="form-group">
            <label>Pick a date</label>
            <br></br>
            <DatePicker
              selected={this.state.date}
              onChange={this.handleDateChange}
              name="date"
              //minDate={new Date()}
              dateFormat="yyyy/MM/dd"
              className="form-control"
              showDisabledMonthNavigation
            />
            <div className="form-group">
              <label>Pick a time</label>
              <br></br>

              <DatePicker
                selected={this.state.time}
                onChange={this.handleTimeChange}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={120}
                minTime={this.state.minTime}
                maxTime={this.state.maxTime}
                timeCaption="Time"
                dateFormat="h:mm aa"
                className="form-control"
              />
              {warning}
            </div>
          </div>
          <div className="form-group">
            <label>Number of guests</label>
            <select
              placeholder="Number of Guests"
              name="numGuest"
              className="form-control"
              selected={this.state.numberGuests}
              onChange={this.changeNumberGuestsHandler}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="5">6</option>
            </select>
          </div>

          {this.state.continue === false ? (
            <button className="btn btn-primary" onClick={this.continue}>
              Continue
            </button>
          ) : (
            <button className="btn btn-warning" onClick={this.reset}>
              Reselect date/time
            </button>
          )}
          {this.state.continue === true ? (
            <UserTables
              time={this.state.time}
              date={this.state.date}
              guests={this.state.numGuests}
              history={this.props.history}
            />
          ) : (
            <p></p>
          )}
        </form>
      </div>
    );
  }
}

export default AddBookingComponent;
