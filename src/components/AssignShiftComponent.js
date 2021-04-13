import React, { Component } from "react";
import TableService from "../services/TableService";
import AuthService from "../services/AuthService";
import StaffService from "../services/StaffService";
import Lost from "./LostComponent";
import Form from "react-bootstrap/Form";
import { Card, Button, Row, Col, ListGroup, Container } from "react-bootstrap";

import RosterService from "../services/RosterService";

import UserService from "../services/UserService";

class AssignShiftComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      name: "",
      description: "",
      price: "",
      ingredients: "",
      allergens: "",
      bisUser: false,
      currentUser: undefined,
      staff: {},
      roster: [],
      workDays: [],
    };
    this.addShift = this.addShift.bind(this);
    this.removeShift = this.removeShift.bind(this);
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

    UserService.getUserById(this.state.id).then((res) => {
      let user = res.data;
      this.setState({
        staff: res.data,
      });
    });
    console.log(this.state.staff);

    StaffService.getStaffById(this.state.id).then((res) => {
      let staff = res.data;
      this.setState({
        staff: staff,
        workDays: staff.workDays,
      });
    });

    RosterService.getShifts().then((res) => {
      let workRoster = res.data;
      this.setState({
        roster: workRoster,
      });
    });
  }

  cancel() {
    this.props.history.push("/allItems");
  }

  addShift(id) {
    RosterService.assignShift(id, this.state.staff.id).then((res) => {
      StaffService.getStaffById(this.state.id).then((res) => {
        let staff = res.data;
        this.setState({
          staff: staff,
          workDays: staff.workDays,
        });
      });
    });
  }

  removeShift(id) {
    StaffService.removeShift(id, this.state.staff.id).then((res) => {
      StaffService.getStaffById(this.state.id).then((res) => {
        let staff = res.data;
        this.setState({
          staff: staff,
          workDays: staff.workDays,
        });
      });
    });
  }

  render() {
    const { businessUser } = this.state;
    return (
      <div>
        {businessUser ? (
          <div>
            <Row>
                <Col>
              <h2>{this.state.staff.name} Shifts</h2>
              <table className="table table-striped table-bordered">
                <thead>
                  <tr>
                    <th>Day</th>
                    <th>Start time</th>
                    <th>End time</th>
                    <th>Remove shift</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.workDays.map((shift) => (
                    <tr key={shift.id}>
                      <td>{shift.day}</td>
                      <td>{shift.startTime}</td>
                      <td>{shift.endTime}</td>
                      <td>
                        <Button
                          onClick={() => this.removeShift(shift.id)}
                          variant="danger"
                        >
                          Remove shift
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              </Col>
              <Col>
              <div className="row">
                {this.state.roster.map((roster) => (
                  <Container>
                    <Row>
                      <Col>{roster.day} </Col>
                      <Col>
                        {roster.startTime}-{roster.endTime}
                      </Col>
                      <Col>
                        <Button
                          onClick={() => this.addShift(roster.id)}
                          variant="primary"
                        >
                          Assign shift
                        </Button>
                      </Col>
                      
                    </Row>
                  </Container>
                 
                ))}
              </div> </Col>
            </Row>
          </div>
        ) : (
          <Lost />
        )}
      </div>
    );
  }
}

export default AssignShiftComponent;
