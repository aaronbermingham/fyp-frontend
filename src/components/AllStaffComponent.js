import React, { Component } from "react";
import StaffService from "../services/StaffService";
import AuthService from "../services/AuthService";
import Lost from "./LostComponent";

class AllStaffComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      staff: [],
      bisUser: false,
      currentUser: undefined,
      shiftList: [],
      shiftId: 0,
    };
    this.assignShift = this.assignShift.bind(this);
  }

  componentDidMount() {
    StaffService.getStaff().then((res) => {
      console.log(res.data);
      console.log(res.data.shiftList);
      this.setState({
        staff: res.data,
      });
    });

    const user = AuthService.getCurrentUser();
    console.log("Current user ", user);

    if (user) {
      this.setState({
        currentUser: user,
        businessUser: user.roles.includes("ROLE_BUSINESS"),
      });
    }
  }

  assignShift(id) {
    this.props.history.push(`/assignShift/${id}`);
  }

  assignTables(id) {
    this.props.history.push(`/assignTables/${id}`);
  }

  staffDetails(id) {
    this.props.history.push(`/staffDetails/${id}`);
  }

  render() {
    const { businessUser } = this.state;
    return (
      <div>
        <div className="row">
          {businessUser ? (
            <div>
              <h3 className="text-center">All Staff</h3>
              <table className="table table-striped table-bordered">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Current Shift start date</th>
                    <th>Assign shifts</th>
                    <th>Staff details</th>
                  </tr>
                </thead>

                <tbody>
                  {this.state.staff.map((staff) => (
                    <tr key={staff.id}>
                      <td>{staff.id}</td>
                      <td>{staff.name}</td>
                      <td>{staff.email}</td>
                      <td>
                        {staff.shiftList.map((subitem, i) => {
                          if (subitem.archived === false)
                            return <td>{subitem.startDate}</td>;
                        })}
                      </td>

                      <td>
                        <button
                          onClick={() => this.assignShift(staff.id)}
                          className="btn btn-info"
                        >
                          Assign
                        </button>
                      </td>
                      <td>
                        <button
                          onClick={() => this.staffDetails(staff.id)}
                          className="btn btn-info"
                        >
                          Staff Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <Lost />
          )}
        </div>
      </div>
    );
  }
}

export default AllStaffComponent;
