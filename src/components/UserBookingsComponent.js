import React, { Component } from 'react'
import BookingService from '../services/BookingService'
import AuthService from "../services/AuthService";
import Lost from './LostComponent';

class UserBookingsComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            bookings: [],
            items: [],
            bisUser: false,
            currentUser: undefined,
        }
    }

    componentDidMount() {
        const user = AuthService.getCurrentUser();
        console.log("Current user id booking by id ", user.id)
    
        if (user) {
          this.setState({
                currentUser: user,
                businessUser: user.roles.includes("ROLE_BUSINESS"),
            });
        }

        BookingService.getBookingsByUserId(user.id).then((res) => {
            console.log(res.data)
            this.setState({ bookings: res.data });
        });
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
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    this.state.bookings.map(
                                        bookings =>
                                            <tr key={bookings.id}>
                                                <td>{bookings.id}</td>
                                                <td>{bookings.date}</td>
                                                <td>{bookings.time}</td>
                                                <td>{bookings.numGuests}</td>
                                                <td>
                                                    {
                                                        bookings.items.map((subitem, i) => {
                                                            return (
                                                                <td>{subitem.name}</td>

                                                            )
                                                        })
                                                    }</td>
                                                <td>{bookings.price}</td>
                                        
                                            </tr>
                                    )
                                }
                            </tbody>

                        </table>
                    </div>
                </div>

            </div>)
    }
}


export default UserBookingsComponent