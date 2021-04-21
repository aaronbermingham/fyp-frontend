import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import DatePicker from 'react-datepicker';
import UserService from '../services/UserService';
import AuthService from "../services/AuthService";
import UserTables from './UserTableComponent';


import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.min.css';



class AddBookingComponent extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
     id: 0,
     bId: 0,
      date: new Date(),
      time: new Date(),
      numGuests: 2,
      continue: false,
    };
    
    this.handleChange = this.handleChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.continue = this.continue.bind(this);
    this.changeNumberGuestsHandler = this.changeNumberGuestsHandler.bind(this);
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();
    console.log("Current user id add booking ", user.id)

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
      time: date
    })
    console.log("date", this.state.date);
    console.log("time", this.state.time);
  }

  changeNumberGuestsHandler = (event) => {
    this.setState({ numGuests: event.target.value });
  }

  onFormSubmit(e) {
    e.preventDefault();
    console.log("Date: " + this.state.date)
    console.log("\nTime: " + this.state.time)
  }

  createBooking = (e) => {
    //BookingService.clearBookings();
    const locale = 'en';
   
    e.preventDefault();
    let booking = {
      date: this.state.date.toISOString().slice(0, 10),
      time: this.state.time.toLocaleTimeString(locale, { hour: 'numeric', hour12: false, minute: 'numeric', second: 'numeric' }),
      numGuests: this.state.numGuests
    };
    console.log('booking => ' + JSON.stringify(booking));
    UserService.addBooking(booking, this.state.id).then(res => {
      this.bId = res.data;
      if(this.bId === -1){
        alert("Please choose a table with enough seats for your booking");
      }
      else if(this.bId === -2){
        alert("There are no tables available at your chosen time");
      }
      else if(this.bId !== 0){
        this.props.history.push(`/orderFood/${this.bId}`);
      }
    })

   
  }

  continue(){
    if(this.state.continue === false)
    this.setState({continue: true});
    else
    this.setState({continue: false});
  }

  render() {
 

    return (
      <div>
        {/* <NavBarComponent /> */}
        <h2>Reservation</h2>
        <form onSubmit={this.onFormSubmit}>
          <div className="form-group">
            <label>Pick a date</label><br></br>
            <DatePicker
              selected={this.state.date}
              onChange={this.handleChange}
              name="date"
              minDate={new Date()}
              dateFormat="yyyy/MM/dd"
              className="form-control"
              showDisabledMonthNavigation
            />
            <div className="form-group">
              <label>Pick a time</label><br></br>

              <DatePicker
                selected={this.state.time}
                onChange={this.handleChange}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={120}
                timeCaption="Time"
                dateFormat="h:mm aa"
                className="form-control"
              />
            </div>

          </div>
          <div className="form-group">
            <label>Number of guests</label>
            <select placeholder="Number of Guests" name="numGuest" className="form-control"
              selected={this.state.numberGuests} onChange={this.changeNumberGuestsHandler}>
              <option value="2">2</option>
              <option value="4">4</option>
              <option value="6">6</option>
              <option value="20">20</option>
            </select>
          </div>
          
          <button className="btn btn-primary" onClick={this.continue}>Continue</button>
          {this.state.continue === true?<UserTables time = {this.state.time} date = {this.state.date} guests= {this.state.numGuests} history={this.props.history}/>:<p></p>}
        </form>
      </div>
    );
  }

}

export default AddBookingComponent; 