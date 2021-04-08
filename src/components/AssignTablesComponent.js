import React, { Component } from "react";
import AuthService from "../services/AuthService";
import Lost from "./LostComponent";
import TableService from "../services/TableService";
import StaffService from "../services/StaffService";

class AssignTablesComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      name: "",
      email: "",
      phoneNumber: "",
      tables: [],
      staffTables:[],
      bisUser: false,
      currentUser: undefined,
    };
    this.assignTable = this.assignTable.bind(this);
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
    TableService.getTables().then((res) => {
      this.setState({ tables: res.data });
      this.setState({ numOfSeats: res.data.numSeats });
      console.log("Table call", res.data);
    });

    TableService.getTables().then((res) => {
        console.log("Staff id ", this.state.id)
        //console.log("Table Staff id ", this.state.tables.map((table) => (table.staffId))
        //console.log("Table call check", res.data);
      });



    StaffService.getStaffById(this.state.id).then((res)=>{
        let staff = res.data;
        this.setState({
            name: staff.name,
            email: staff.email,
            phoneNumber: staff.phoneNumber,
        });
    });
    //console.log(this.state.tableList)
  }

  assignTable(table) {
    console.log(table);
    StaffService.addTables(this.state.id, table);

    //console.log("List ", this.state.staffTableList);
  }

//   assignTable(tableId) {
//     StaffService.addTables(1, tableId);
//   }

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
                <h3 className="text-center">Assign tables</h3>
                <div className="card-body">
                  <form>
                  {/* <div className="form-group">
                      <label>Id</label>
                      <input
                        placeholder="Name"
                        name="name"
                        className="form-control"
                        value={this.state.id}
                        //onChange={this.changeNameHandler}
                      />
                    </div>
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
                    </div> */}
                    <div className="form-group">
                      <label>Click on a table to assign it to {this.state.name}</label>
                      <tbody>
                        {this.state.tables.map((table) => (
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
                              //background: "blue",
                              color: "white",
                              background: table.outdoorTable ? "green" : "blue",
                            }}
                            onClick={() => this.assignTable(table.id)}
                          >
                            ID:{" "}
                            {table.numSeats > 5 ? (
                              <h1> {table.id}</h1>
                            ) : (
                              <h3> {table.id}</h3>
                            )}
                           
                            
                            <span></span>
                            <span> Staff ID: {table.staffId}</span>
                          </div>
                          
                        ))}
                        {/* {this.state.tableId > 0 ? (<Alert variant="success"><p>You have selected table number {this.state.tableId}</p></Alert>): null} */}
                      </tbody>
                    </div>

                    {/* <button className="btn btn-success" onClick={this.addStaff}>
                      Add staff member
                    </button> */}
                    <button
                      className="btn btn-danger"
                      onClick={this.cancel.bind(this)}
                      style={{ marginLeft: "10px" }}
                    >
                      Return
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

export default AssignTablesComponent;
