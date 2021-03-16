import React, { Component } from 'react';
// import Tabs from 'react-bootstrap/Tabs'
// import Tab from 'react-bootstrap/Tab'
import 'bootstrap/dist/css/bootstrap.min.css';
// import ShowItemComponent from './ShowItemComponent';
// import DateTimeComponent from './DateTimeComponent';
// import BookingDetailsComponent from './BookingDetailsComponent';
// import UserAddItemComponent from './UserAddItemComponent';
import DatePicker from 'react-datepicker';
import UserService from '../services/UserService';
import AuthService from "../services/AuthService";
import UserTables from './UserTableComponent';


import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import BookingService from '../services/BookingService';


class AddBookingComponent extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
     id: 0,
     bId: 0,
      date: new Date(),
      time: new Date(),
      numGuests: 2
    };
    
    this.handleChange = this.handleChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.changeNumberGuestsHandler = this.changeNumberGuestsHandler.bind(this);
    //this.userSummary = UserService.getCurrentUser();

    //console.log("User sum: " + JSON.stringify(this.userSummary));
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

//   componentDidMount(){
//     UserService.getCurrentUser().then(response => {
//       const json = JSON.stringify(response);
//       //console.log("user sum", json);
//       //const id = json.data.id;
//       this.setState({
//         id: response.data.id
//       })
//       // this.id = 
//       //console.log("add booking ID", this.state.id)
  //     UserService.getUserById(this.state.id).then(response => {
  //       const json = JSON.stringify(response.data.roles[0].id);
  //       localStorage.setItem("role", json);
  //      console.log("Stored role", localStorage.getItem("role"))
  //       console.log("user sum", json);
  //       const id = json.data.id;
  //       this.setState({
  //         id: response.data.id
  //       })
  //       // this.id = 
  //      console.log("User by id info", json)
  //    });
  // });

  
// //   UserService.getUserById(this.id).then(response => {
// //     const json = JSON.stringify(response);
// //     console.log("user role sum", json);
// //     //const id = json.data.id;
// //     // this.id = JSON.stringify(response.data.id);
// //     console.log("ID by id", this.state.id)
// // });
   
// }

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
    BookingService.clearBookings();
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
        alert("There are no tables available that can accomodate your party");
      }
      else if(this.bId === 0){
        alert("There are no tables available at your chosen time");
      }
      else if(this.bId !== 0){
        this.props.history.push(`/orderFood/${this.bId}`);
      }
    })

   
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

            {/* <input placeholder="Number of Guests" name="numGuest" className="form-control"
              value={this.state.numberGuests} onChange={this.changeNumberGuestsHandler} /> */}
          </div>
          <UserTables bookingTime = {this.state.time}/>
          <button className="btn btn-primary" onClick={this.createBooking}>Create booking</button>

        </form>
      </div>
    );
  }

}

export default AddBookingComponent; 