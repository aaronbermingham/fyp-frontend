import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import AuthService from "../services/AuthService";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button, Container, Card, CardDeck } from "react-bootstrap";
import BookingService from "../services/BookingService";
import Clock from "react-live-clock";

export default class UserHomeComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: null,
      currentUser: { username: "" },
      bookings: [],
    };
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();

    BookingService.getBookingsByUserId(currentUser.id).then((res) => {
      console.log(res.data);
      this.setState({ bookings: res.data });
    });

    if (!currentUser) this.setState({ redirect: "/home" });
    if (currentUser.roles.includes("ROLE_BUSINESS"))
      this.setState({ redirect: "/bisMenu" });
    this.setState({ currentUser: currentUser, userReady: true });
  }

  newBooking() {
    this.props.history.push(`/addBooking`);
  }

  viewBookings() {
    this.props.history.push(`/userBooking`);
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }

    const { currentUser } = this.state;

    return (
     
        <div>
          <Container fluid>
        <Row>
                <Col xs={12} md={15}>
                  <Card bg="info">
                    <Card.Body>
                      <Card.Title>
                        <h1>Welcome back {this.state.currentUser.username}!</h1>
                      </Card.Title>
                      <Card.Text>
                      <Clock format={"dddd, MMMM Mo, YYYY, kk:mm:ss "} ticking={true} />
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
               
            </Row>
            <Row>
          <CardDeck>
          
            <Card border="primary">
              
              <Card.Body>
                <Card.Title>Add a new booking!</Card.Title>
                <Card.Text>
                {this.state.bookings.slice(0, 1).map((bookings) => (
                  <p>Your next booking is on the {bookings.date} at {bookings.time} but why not add another!?</p>
                      ))}
                <Button
                        variant="primary"
                        onClick={() => this.newBooking()}
                      >
                        Booking
                      </Button>
                </Card.Text>
              </Card.Body>
            </Card>
            <Card border="dark">
             
              <Card.Body>
                <Card.Title>Manage your bookings</Card.Title>
                <Card.Text>
                  <p>Your upcoming bookings</p>
                  <table className="table table-striped table-bordered">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Time</th>
                      </tr>
                    </thead>

                    <tbody>
                      {this.state.bookings.slice(0, 3).map((bookings) => (
                        <tr key={bookings.id}>
                          <td>{bookings.date}</td>
                          <td>{bookings.time}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <Button
                        variant="primary"
                        onClick={() => this.viewBookings()}
                      >
                        View all
                      </Button>
                </Card.Text>
              </Card.Body>
           </Card>
          </CardDeck>

          {/* <p>
            <strong>Id:</strong> {currentUser.id}
          </p>
          <p>
            <strong>Email:</strong> {currentUser.email}
          </p>
          <strong>Authorities:</strong>
          <ul>
            {currentUser.roles &&
              currentUser.roles.map((role, index) => (
                <li key={index}>{role}</li>
              ))}
          </ul> */}
          </Row>
          </Container>
        </div>
    );
  }
}
