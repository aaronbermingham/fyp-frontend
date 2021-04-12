import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import React, { Component, useEffect, useState } from "react";
import Clock from "react-live-clock";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import AuthService from "../services/AuthService";
import BookingService from "../services/BookingService";
import Lost from "./LostComponent";

class BisDashboardComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bisUser: false,
      currentUser: undefined,
      bookings: [],
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
    BookingService.todaysBooking().then((res) => {
      this.setState({ bookings: res.data });
    });
  }

  allBookings() {
    this.props.history.push(`/allBookings`);
  }

  allStaff() {
    this.props.history.push(`/allStaff`);
  }

  allTables() {
    this.props.history.push(`/allTables`);
  }

  render() {
    const { businessUser } = this.state;
    return (
      <div>
        {businessUser || localStorage.getItem("user") === null ? (
          <div>
            <Container>
              {/* Columns start at 50% wide on mobile and bump up to 33.3% wide on desktop */}
              <Row>
                <Col xs={6} md={3}>
                  <Card bg="info">
                    <Card.Body>
                      <Card.Title>
                        Welcome back {this.state.currentUser.username}!
                      </Card.Title>
                      <Card.Text>
                        With supporting text below as a natural lead-in to
                        additional content.
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
                <Col xs={12} md={9}>
                  <Card bg="success">
                    <Card.Body>
                      <Card.Text>
                        <h1 className="clock">
                          <Clock
                            format={"dddd, MMMM Mo, YYYY, kk:mm:ss "}
                            ticking={true}
                          />
                        </h1>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
              <Row>
                <Col xs={6} md={4}>
                  <Card bg="danger">
                    <Card.Body>
                      <Card.Title>Todays Bookings</Card.Title>
                      <Card.Text>Some text</Card.Text>
                      <Button
                        variant="primary"
                        onClick={() => this.allBookings()}
                      >
                        View all bookings
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
                <Col xs={6} md={4}>
                  <Card bg="success">
                    <Card.Body>
                      <Card.Title>Staff</Card.Title>
                      <Card.Text>
                        With supporting text below as a natural lead-in to
                        additional content.
                      </Card.Text>
                      <Button variant="primary" onClick={() => this.allStaff()}>
                        All staff
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>

                <Col xs={6} md={4}>
                  <Card bg="info">
                    <Card.Body>
                      <Card.Title>Tables</Card.Title>
                      <Card.Text>
                        With supporting text below as a natural lead-in to
                        additional content.
                      </Card.Text>
                      <Button
                        variant="primary"
                        onClick={() => this.allTables()}
                      >
                        All tables
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Card bg="info">
                    <Card.Body>
                      <Card.Title>Todays bookings</Card.Title>
                      <Card.Text>
                        <table className="table table-striped table-bordered">
                          <thead>
                            <tr>
                              <th>Booking ID</th>
                              <th>Time</th>
                              <th>Number of guests</th>
                            </tr>
                          </thead>

                          <tbody>
                            {this.state.bookings.slice(0, 3).map((bookings) => (
                              <tr key={bookings.id}>
                                <td>{bookings.id}</td>
                                <td>{bookings.time}</td>
                                <td>{bookings.numGuests}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </Card.Text>
                      <Button
                        variant="primary"
                        onClick={() => this.allBookings()}
                      >
                        View all bookings
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
                <Col
                  xs={6}
                  md={4}
                  style={{
                    background: "red",
                  }}
                >
                  2 of 2
                </Col>
              </Row>

              {/* Columns are always 50% wide, on mobile and desktop */}
              <Row>
                <Col
                  xs={6}
                  style={{
                    background: "pink",
                  }}
                >
                  1 of 2
                </Col>
                <Col
                  xs={6}
                  style={{
                    background: "cyan",
                  }}
                >
                  2 of 2
                </Col>
              </Row>
            </Container>
          </div>
        ) : (
          <Lost />
        )}
      </div>
    );
  }
}
export default BisDashboardComponent;
