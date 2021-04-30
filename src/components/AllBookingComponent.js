import React, { Component } from "react";
import BookingService from "../services/BookingService";
import AuthService from "../services/AuthService";
import Lost from "./LostComponent";

class AllBookingComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookings: [],
      items: [],
      bisUser: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();
    console.log("Current user ", user);

    if (user) {
      this.setState({
        currentUser: user,
        businessUser: user.roles.includes("ROLE_BUSINESS"),
      });
    }
    BookingService.getBookings().then((res) => {
      this.setState({ bookings: res.data });
    });
  }

  render() {
    const { businessUser } = this.state;
    return (
      <div>
        {businessUser ? (
          <div>
            <h3 className="text-center">Upcoming Bookings</h3>
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
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <Lost />
        )}
      </div>
    );
  }
}

export default AllBookingComponent;
