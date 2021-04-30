import Container from "react-bootstrap/Container";
import {CardDeck, Row} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import React, { Component } from "react";
import Clock from "react-live-clock";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import AuthService from "../services/AuthService";
import BookingService from "../services/BookingService";
import Lost from "./LostComponent";
import { FaChartBar } from "react-icons/fa";  
import { GrGroup } from "react-icons/gr"; 
import { SiAirtable } from "react-icons/si";
import UserService from "../services/UserService";

class BisDashboardComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: 0,
      bisUser: false,
      currentUser: undefined,
      bookings: [],
      restaurant: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();
    console.log("Current user id bis dasg  ", user.id)
    
    if (user) {
      this.setState({
        id: user.id,
        currentUser: user,
        businessUser: user.roles.includes("ROLE_BUSINESS"),
      });
      console.log("1234", this.state.id)
     
    }
    if(user.restaurant != null){
    UserService.getUserById(user.id).then((res) => {
      console.log("RESTAURANT ",res.data.restaurant.id)
      localStorage.setItem('resId', res.data.restaurant.id);
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

  analytics() {
    this.props.history.push(`/bisAnalytics`);
  }

  render() {
    const { businessUser } = this.state;
    return (
      <div>
        {businessUser || localStorage.getItem("user") === null ? (
          <div>
            <Container>
            <Row>
                <Col xs={12} md={20}>
                  <Card bg="Light">
                    <Card.Body>
                      <Card.Title>
                        <h1>Welcome back {this.state.currentUser.username}!</h1>
                      </Card.Title>
                      <Card.Text>
                      <h3><Clock format={"dddd, MMMM Mo, YYYY, kk:mm:ss "} ticking={true} /></h3>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
               
            </Row>
              <Row>
                
                  {/* <Card border="info">
                    <Card.Body>
                      <Card.Title>
                        Welcome back {this.state.currentUser.username}!
                      </Card.Title>
                      <Card.Text>
                       
                      </Card.Text>
                    </Card.Body>
                  </Card> */}
                
                
                  {/* <Card border="success">
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
                  </Card> */}
                  
            
                  <Container>
                  <CardDeck>
                  <Card border="danger">
                    <Card.Body>
                      <Card.Title>Analytics</Card.Title>
                      <Col >
                      <FaChartBar size="lg"/>
                      </Col>
                      <Col>
                      <Card.Text>View restaurant analytics</Card.Text>
                      <Button
                        variant="primary"
                        onClick={() => this.analytics()}
                      >
                        View analytics
                      </Button>
                      </Col>
                     
                    </Card.Body>
                  </Card>
                  
               
                  <Card border="danger">
                    <Card.Body>
                     
                      <Card.Title>Staff</Card.Title>
                      <Col>
                      <GrGroup size = "lg"/>
                      </Col>
                      <Card.Text>
                        View and manage staff
                      </Card.Text>
                      <Button variant="primary" onClick={() => this.allStaff()}>
                        All staff
                      </Button>
                    </Card.Body>
                  </Card>
                  

               
                  <Card border="warning">
                    <Card.Body>
                      <Card.Title>Tables</Card.Title>
                      <Col>
                      <SiAirtable size = "lg"/>
                      </Col>
                      <Card.Text>
                       View all tables and manage restaurant capacity
                      </Card.Text>
                      <Button
                        variant="primary"
                        onClick={() => this.allTables()}
                      >
                        All tables
                      </Button>
                    </Card.Body>
                  </Card>
                  </CardDeck>
                  </Container>
              </Row>
              <Row>
                <Col>
                  <Card border="secondary">
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
                {/* <Col
                  xs={6}
                  md={4}
                  style={{
                    background: "red",
                  }}
                >
                  2 of 2
                </Col> */}
              </Row>

              {/* Columns are always 50% wide, on mobile and desktop */}
              {/* <Row>
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
              </Row> */}
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
