import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import AuthService from "../services/AuthService";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Jumbotron, Container, Card, CardDeck } from "react-bootstrap";
import BookingService from "../services/BookingService";

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
      console.log(res.data)
      this.setState({ bookings: res.data });
  });

    if (!currentUser) this.setState({ redirect: "/home" });
    if (currentUser.roles.includes("ROLE_BUSINESS"))
      this.setState({ redirect: "/bisMenu" });
    this.setState({ currentUser: currentUser, userReady: true });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }

    const { currentUser } = this.state;

    return (
      <div className="container">
        <div>
          <Jumbotron fluid>
            <Container>
              <h1>Welcome back {currentUser.username}!</h1>
            </Container>
          </Jumbotron>
          <CardDeck >
            <Card border="primary">
              {/* <Card.Img variant="top" src="holder.js/100px160" /> */}
              <Card.Body>
                <Card.Title>Create new booking</Card.Title>
                <Card.Text>
                  This is a wider card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer.
                </Card.Text>
              </Card.Body>
            </Card>
            <Card border="dark" >
              {/* <Card.Img variant="top" src="holder.js/100px160" /> */}
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
                            {this.state.bookings.slice(0, 1).map((bookings) => (
                              <tr key={bookings.id}>
                                <td>{bookings.date}</td>
                                <td>{bookings.time}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </Card.Text>
               
              </Card.Body>
            </Card>
            <Card border="warning"  >
              {/* <Card.Img variant="top" src="holder.js/100px160" /> */}
              <Card.Body>
                <Card.Title>Manage your account</Card.Title>
                <Card.Text>
                 Update your details here!
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
        </div>
      </div>
    );
  }
}
