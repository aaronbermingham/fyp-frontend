import React, { Component } from "react";
import BookingService from "../services/BookingService";
import AuthService from "../services/AuthService";

class UserBookingsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookings: [],
      items: [],
      bisUser: false,
      currentUser: undefined,
      userId: 0,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();
    console.log("Current user id booking by id ", user.id);

    if (user) {
      this.setState({
        currentUser: user,
        businessUser: user.roles.includes("ROLE_BUSINESS"),
        userId: user.id,
      });
    }

    BookingService.getBookingsByUserId(user.id).then((res) => {
      console.log(res.data);
      this.setState({ bookings: res.data });
    });
  }

  deleteBooking(id) {
    BookingService.deleteBooking(id).then((res) => {
      console.log(res.data);
      BookingService.getBookingsByUserId(this.state.userId).then((res) => {
        console.log(res.data);
        this.setState({ bookings: res.data });
      });
    });
  }

  updateBooking(id) {
    this.props.history.push(`/orderFood/${id}`);
  }

  render() {
    return (
      <div>
        <div>
          <h3 className="text-center">Bookings</h3>
          <div className="row">
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>Booking ID</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Number of guests</th>
                  <th>Order</th>
                  <th>Price</th>
                  <th>Update</th>
                  <th>Cancel</th>
                </tr>
              </thead>

              <tbody>
                {this.state.bookings.map((bookings) => (
                  <tr key={bookings.id}>
                    <td>{bookings.id}</td>
                    <td>{bookings.date}</td>
                    <td>{bookings.time.slice(0, -3)}</td>
                    <td>{bookings.numGuests}</td>
                    <td>
                      {bookings.items.map((subitem, i) => {
                        return <td>{subitem.name}</td>;
                      })}
                    </td>
                    <td>{bookings.price.toFixed(2)}</td>
                    <td>
                      <button
                        onClick={() => this.updateBooking(bookings.id)}
                        className="btn btn-info"
                      >
                        Update
                      </button>
                    </td>
                    <td>
                      <button
                        onClick={() => this.deleteBooking(bookings.id)}
                        className="btn btn-info"
                      >
                        Cancel
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default UserBookingsComponent;
