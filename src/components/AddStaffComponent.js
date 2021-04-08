import React, { Component } from "react";
import AuthService from "../services/AuthService";
import Lost from "./LostComponent";
import TableService from "../services/TableService";
import StaffService from "../services/StaffService";

class AddStaffComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      phoneNumber: "",
      tables: [],
      bisUser: false,
      currentUser: undefined,
    };
    this.changeNameHandler = this.changeNameHandler.bind(this);
    this.changeEmailHandler = this.changeEmailHandler.bind(this);
    this.changePhoneHandler = this.changePhoneHandler.bind(this);
    this.addTable = this.addTable.bind(this);
  }

  changeNameHandler = (event) => {
    this.setState({ name: event.target.value });
  };

  changeEmailHandler = (event) => {
    this.setState({ email: event.target.value });
  };

  changePhoneHandler = (event) => {
    this.setState({ phoneNumber: event.target.value });
  };

  componentDidMount() {
    const user = AuthService.getCurrentUser();
    console.log("Current user ", user);

    if (user) {
      this.setState({
        currentUser: user,
        businessUser: user.roles.includes("ROLE_BUSINESS"),
      });
    }
    TableService.getTables().then((res) => {
      this.setState({ tables: res.data });
      this.setState({ numOfSeats: res.data.numSeats });
      console.log("Table call", res.data);
    });
    //console.log(this.state.tableList)
  }

  addStaff = (e) => {
    e.preventDefault();
    let staff = {
      name: this.state.name,
      email: this.state.email,
      phoneNumber: this.state.phoneNumber,
    };
    console.log("Staff member" + JSON.stringify(staff));
    StaffService.addStaff(staff).then((res) => {
      this.props.history.push("/allStaff");
    });
  };

  addTable(table) {
    console.log(table);
    let { staffTableList } = this.state;
    staffTableList.push({ table });
    this.setState({
      staffTableList: staffTableList,
    });

    StaffService.addTables(1, this.state.staffTableList);

    console.log("List ", this.state.staffTableList);
  }

  addStaff(tableId) {
    StaffService.addTables(1, tableId);
  }

  cancel() {
    this.props.history.push("/allStaff");
  }

  render() {
    const { businessUser } = this.state;
    return (
      <div>
        {businessUser ? (
          <div className="container">
            <div className="row">
              <div className="card col-md-6 offset-md-3 offset-md-3">
                <h3 className="text-center">Add Staff Member</h3>
                <div className="card-body">
                  <form>
                    <div className="form-group">
                      <label>Name</label>
                      <input
                        placeholder="Name"
                        name="name"
                        className="form-control"
                        value={this.state.name}
                        onChange={this.changeNameHandler}
                      />
                    </div>
                    <div className="form-group">
                      <label>Email</label>
                      <input
                        placeholder="Email"
                        name="email"
                        className="form-control"
                        value={this.state.email}
                        onChange={this.changeEmailHandler}
                      />
                    </div>
                    <div className="form-group">
                      <label>Email</label>
                      <input
                        placeholder="Phone Number"
                        name="phoneNumber"
                        className="form-control"
                        value={this.state.phoneNumber}
                        onChange={this.changePhoneHandler}
                      />
                    </div>
                   
                    

                    <button className="btn btn-success" onClick={this.addStaff}>
                      Add staff member
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={this.cancel.bind(this)}
                      style={{ marginLeft: "10px" }}
                    >
                      Cancel
                    </button>
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

export default AddStaffComponent;
