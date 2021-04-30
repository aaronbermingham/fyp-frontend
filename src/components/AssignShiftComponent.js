import React, { Component } from "react";
import AuthService from "../services/AuthService";
import StaffService from "../services/StaffService";
import Lost from "./LostComponent";
import { Alert, Row } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import RosterService from "../services/RosterService";

class AssignShiftComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      date: new Date(),
      bisUser: false,
      currentUser: undefined,
      staffList: [],
      staffMember: 0,
      shiftNum: undefined,
      roster: [],
      rosterId: undefined,
      rosterChecked: [],
      selectRosterId: [],
    };
    this.handleDateChange = this.handleDateChange.bind(this);
    this.addShift = this.addShift.bind(this);
  }

  handleSelect = (roster) => {
    var found = this.state.rosterChecked.find((element) => {
      return element.id === roster.id;
    });

    if (found) {
      this.setState(
        {
          rosterChecked: this.state.rosterChecked.filter(
            (element) => element.id !== roster.id
          ),
          selectRosterId: this.state.selectRosterId.filter(
            (element) => element !== roster.id
          ),
        },
        () => console.log("Objects ", this.state.rosterChecked)
      );
    } else {
      this.setState(
        {
          selectRosterId: [...this.state.selectRosterId, roster.id],
          rosterChecked: [...this.state.rosterChecked, roster],
        },
        () => {
          console.log("Numbers ", this.state.selectRosterId);
          console.log("Objects ", this.state.rosterChecked);
        }
      );
    }
  };

  handleDateChange(date) {
    this.setState({
      date: date,
    });
    console.log("DATE", this.state.date);
  }

  changeStaffMemberHandler = (event) => {
    this.setState({ staffMember: event.target.value });
    console.log("Staff ", this.state.staffMember);
  };

  changeShiftNumHandler = (event) => {
    this.setState({ shiftNum: event.target.value });
    console.log(this.state.shiftNum);
  };

  addShift = (e) => {
    e.preventDefault();
    let staffShift = {
      startDate: this.state.date.toISOString().slice(0, 10),
    };
    console.log(staffShift);
    console.log("ID ", this.state.staffMember);
    StaffService.addShift(this.state.staffMember, staffShift).then((res) => {
      let shift = res.data;
      if (shift.id > 0) {
        StaffService.getAvailStaff().then((res) => {
          let staff = res.data;
          console.log("Staff ", staff);
          if (staff.id > 0) {
            this.setState({
              staffList: staff,
              staffMember: staff[0].id,
            });
          }
        });
        for (var i = 0; i < this.state.selectRosterId.length; i++) {
          StaffService.addStaffRoster(
            shift.id,
            this.state.selectRosterId[i]
          ).then((res) => {
            let roster = res.data;
            console.log("Roster ", roster);
          });
        }
        this.props.history.push("/allStaff");
      }
    });
  };

  cancel() {
    this.props.history.push("/allStaff");
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();
    console.log("Current user ", user);

    RosterService.getShifts().then((res) => {
      let roster = res.data;
      console.log("Roster call ", roster);
      this.setState({
        roster: roster,
      });
      console.log("Roster state ", this.state.roster);
    });
    StaffService.getAvailStaff().then((res) => {
      let staff = res.data;
      console.log("Staff ", staff);
      if (staff.length > 0) {
        this.setState({
          staffList: staff,
          staffMember: staff[0].id,
        });
      }

      console.log(this.state.staffList);
      console.log(this.state.staffMember);
    });

    if (user) {
      this.setState({
        currentUser: user,
        businessUser: user.roles.includes("ROLE_BUSINESS"),
      });
    }
  }

  render() {
    let warning;
    if (this.state.staffList.length < 1) {
      warning = (
        <Alert variant="danger">
          <p className="text-center">
            All staff members are assigned shifts, close out a shift to add a
            new one
          </p>
        </Alert>
      );
    }
    const { businessUser } = this.state;
    if (this.state.staffList) {
      return (
        <div>
          {warning}{" "}
          {businessUser ? (
            <div className="container">
              <div className="row">
                <div className="card col-md-8 offset-md-3 offset-md-3">
                  <h3 className="text-center">Add shifts</h3>
                  <div className="card-body">
                    <div className="form-group">
                      <label>Staff member</label>
                      <select
                        placeholder="Assign staff"
                        name="staff"
                        className="form-control"
                        selected={this.state.staffMember}
                        onChange={this.changeStaffMemberHandler}
                      >
                        {this.state.staffList.map((staff) => {
                          return (
                            <option value={staff.id}>
                              {staff.id} {staff.name}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <form>
                      <div className="form-group">
                        <label>Choose start date of shifts</label>
                        <DatePicker
                          selected={this.state.date}
                          onChange={this.handleDateChange}
                          name="date"
                          //    minDate={new Date()}
                          dateFormat="yyyy/MM/dd"
                          className="form-control"
                          showDisabledMonthNavigation
                        />
                      </div>
                      <Row>
                        <label>Select roster</label>
                      </Row>
                      <Row>
                        <div className="rosterCol">
                          {this.state.roster.map((roster) => (
                            <div key={roster.id} className="mb-1">
                              <input
                                type={"checkbox"}
                                id={roster.id}
                                label={
                                  roster.day +
                                  " " +
                                  roster.startTime +
                                  "-" +
                                  roster.endTime
                                }
                                checked={this.state.rosterChecked.some(
                                  ({ id }) => id === roster.id
                                )}
                                onChange={() => this.handleSelect(roster)}
                              />{" "}
                              {roster.day +
                                " " +
                                roster.startTime +
                                "-" +
                                roster.endTime}
                            </div>
                          ))}
                        </div>
                      </Row>
                      <Row>
                        <button
                          className="btn btn-success"
                          style={{ marginLeft: "10px" }}
                          onClick={this.addShift}
                        >
                          Add shift
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={this.cancel.bind(this)}
                          style={{ marginLeft: "10px" }}
                        >
                          Cancel
                        </button>
                      </Row>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <Lost />
          )}
        </div>
      );
    }
  }
}
export default AssignShiftComponent;
