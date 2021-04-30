import React, { Component } from "react";
import TableService from "../services/TableService";
import Moment from "moment";
import UserService from "../services/UserService";
import AuthService from "../services/AuthService";
import { Card, Alert, Col, Row } from "react-bootstrap";

class UserTableComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tables: [],
      numOfSeats: 0,
      clicked: false,
      tableId: 0,
    };
    this.onClick = this.onClick.bind(this);
    this.createBooking = this.createBooking.bind(this);
  }

  componentDidMount() {
    const locale = "en";

    let booking = {
      date: this.props.date.toISOString().slice(0, 10),
      time: this.props.time.toLocaleTimeString(locale, {
        hour: "numeric",
        hour12: false,
        minute: "numeric",
        second: "numeric",
      }),
      numGuests: this.props.guests,
    };
    console.log("cdm booking " + JSON.stringify(booking));
    const user = AuthService.getCurrentUser();
    if (user) {
      this.setState({
        id: user.id,
        currentUser: user,
        businessUser: user.roles.includes("ROLE_BUSINESS"),
      });
    }
    let date = this.props.time;
    let utc = Moment.utc(date).format();

    TableService.getUnreservedTables(booking).then((res) => {
      if (this.props.guests <= 2) {
        this.setState({
          tables: res.data.filter(
            (table) => table.disabled === false && table.numSeats === 2
          ),
        });
      } else if (this.props.guests > 2) {
        this.setState({
          tables: res.data.filter(
            (table) =>
              table.disabled === false && table.numSeats >= this.props.guests
          ),
        });
      }

      this.setState({ numOfSeats: res.data.numSeats });
      console.log("Table info ", res.data);
      for (let i = 0; i < res.data.length; i++) {
        console.log(i + 1 + " Table reslist ", res.data[i].resList);
      }
      console.log("Passed date ", utc);
    });
    TableService.getSeats().then((res) => {
      this.setState({ numOfSeats: res.data });
      console.log(this.state.numOfSeats);
    });
  }

  onClick(table) {
    console.log("Table ", table.id);

    this.setState({ tableId: table.id });

    this.setState({ tableId: table.id });

    console.log("Clicked ", this.state.clicked);
  }

  createBooking = (e) => {
    const locale = "en";
    console.log("Table id ", this.state.tableId);
    e.preventDefault();
    let booking = {
      date: this.props.date.toISOString().slice(0, 10),
      time: this.props.time.toLocaleTimeString(locale, {
        hour: "numeric",
        hour12: false,
        minute: "numeric",
        second: "numeric",
      }),
      numGuests: this.props.guests,
    };
    console.log("booking => " + JSON.stringify(booking));
    UserService.addBookingTable(
      booking,
      this.state.id,
      this.state.tableId
    ).then((res) => {
      console.log("res data id ", res.data);
      this.bId = res.data;
      console.log("Booking id ", this.bId);
      if (this.bId === -1) {
        alert("There are no tables available that can accomodate your party");
      } else if (this.bId === -2) {
        alert("There are no tables available at your chosen time");
      } else if (this.bId > 0) {
        this.props.history.push(`/orderFood/${this.bId}`);
      }
    });
  };

  render() {
    const utc = Moment.utc(this.props.time).format();
    return (
      <div>
        <div>
          <table>
            <Card border="dark" style={{ width: "60rem" }}>
              <Card.Header>Choose a table</Card.Header>
              <Card.Body>
                <Card.Text>
                  <Row>
                    <Col>
                      <div class="row">
                        <div class="box green"></div>
                        <span>Outdoor table</span>
                      </div>
                    </Col>
                    <Col>
                      {" "}
                      <div class="row">
                        <div class="box blue"></div>
                        <span>Indoor table</span>
                      </div>
                    </Col>
                  </Row>
                  <tbody>
                    {this.state.tables
                      .filter((table) => table.outdoorTable === false)
                      .map((table) => (
                        <div
                          style={{
                            display: "inline-flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                            height:
                              table.numSeats === 6
                                ? 165
                                : table.numSeats === 4
                                ? 145
                                : 125,
                            width:
                              table.numSeats === 6
                                ? 165
                                : table.numSeats === 4
                                ? 145
                                : 125,
                            margin: 15,
                            borderRadius:
                              table.numSeats === 6
                                ? 95
                                : table.numSeats === 4
                                ? 85
                                : 70,
                            color: "white",
                            background: table.outdoorTable ? "green" : "blue",
                            cursor: "pointer",
                            boxShadow: "5px 5px 10px #696969",
                          }}
                          onClick={() => this.onClick(table)}
                        >
                          <span>
                            <h4> Seats: {table.numSeats}</h4>{" "}
                          </span>
                        </div>
                      ))}
                  </tbody>
                  <tbody>
                    {this.state.tables
                      .filter((table) => table.outdoorTable === true)
                      .map((table) => (
                        <div
                          style={{
                            display: "inline-flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                            height:
                              table.numSeats === 6
                                ? 165
                                : table.numSeats === 4
                                ? 145
                                : 125,
                            width:
                              table.numSeats === 6
                                ? 165
                                : table.numSeats === 4
                                ? 145
                                : 125,
                            margin: 15,
                            borderRadius:
                              table.numSeats === 6
                                ? 95
                                : table.numSeats === 4
                                ? 85
                                : 70,
                            color: "white",
                            background: table.outdoorTable ? "green" : "blue",
                            cursor: "pointer",
                            boxShadow: "5px 5px 10px #696969",
                          }}
                          onClick={() => this.onClick(table)}
                        >
                          <span>
                            <h4> Seats: {table.numSeats}</h4>{" "}
                          </span>
                        </div>
                      ))}
                  </tbody>
                  {this.state.tableId > 0 ? (
                    <Alert variant="success">
                      <p>You have selected table number {this.state.tableId}</p>
                    </Alert>
                  ) : null}
                </Card.Text>
              </Card.Body>
            </Card>

            <button
              style={{ margin: "20px" }}
              className="btn btn-primary"
              onClick={this.createBooking}
            >
              Add booking
            </button>
          </table>
        </div>
      </div>
    );
  }
}

export default UserTableComponent;
