import React, { Component } from "react";
import AuthService from "../services/AuthService";
import Lost from "./LostComponent";
import TableService from "../services/TableService";
import StaffService from "../services/StaffService";
import { Row, Col } from "react-bootstrap";

class AssignTablesComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      name: "",
      email: "",
      phoneNumber: "",
      tables: [],
      staffTables: [],
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
      console.log("Staff id ", this.state.id);
      //console.log("Table Staff id ", this.state.tables.map((table) => (table.staffId))
      //console.log("Table call check", res.data);
    });

    StaffService.getStaffById(this.state.id).then((res) => {
      let staff = res.data;
      console.log(staff);
      this.setState({
        name: staff.name,
        email: staff.email,
        phoneNumber: staff.phoneNumber,
        staffTables: staff.table,
      });
    });
  }

  assignTable(table) {
    console.log(table);
    StaffService.addTables(this.state.id, table).then((res) => {
      let staff = res.data;
      console.log(staff);
      this.setState({
        name: staff.name,
        email: staff.email,
        phoneNumber: staff.phoneNumber,
        staffTables: staff.table,
      });
    });

    

    //console.log("List ", this.state.staffTableList);
  }

  removeTable(tableId) {
    StaffService.removeTable(tableId, this.state.id).then((res) => {
      StaffService.getStaffById(this.state.id).then((res) => {
        let staff = res.data;
        console.log(staff);
        this.setState({
          name: staff.name,
          email: staff.email,
          phoneNumber: staff.phoneNumber,
          staffTables: staff.table,
        });
      });
    });
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
                {/* <div className="card col-md-6 offset-md-3 offset-md-3"> */}

                <h3 className="text-center">Assign tables</h3>
                <div className="card-body">
                  <form>
                  <Col>
                    <Row>
                      <div className="form-group">
                        <label>Current tables assigned to {this.state.name}, click on a table to unassign it</label>
                        <tbody>
                          {this.state.staffTables.map((sTable) => (
                            <div
                              style={{
                                display: "inline-flex",
                                flexDirection: "row",
                                justifyContent: "center",
                                alignItems: "center",
                                height:
                                  sTable.numSeats === 6
                                    ? 165
                                    : sTable.numSeats === 4
                                    ? 145
                                    : 125,
                                width:
                                  sTable.numSeats === 6
                                    ? 165
                                    : sTable.numSeats === 4
                                    ? 145
                                    : 125,
                                margin: 15,
                                borderRadius:
                                  sTable.numSeats === 6
                                    ? 95
                                    : sTable.numSeats === 4
                                    ? 85
                                    : 70,
                                //background: "blue",
                                color: "white",
                                background: sTable.outdoorTable
                                  ? "green"
                                  : "blue", 
                                  cursor: "pointer",
                                  boxShadow: "5px 5px 10px #696969",
                                }}
                                onClick={() => this.removeTable(sTable.id)}
                              >
                              ID:{" "}
                              {sTable.numSeats > 5 ? (
                                <h1> {sTable.id}</h1>
                              ) : (
                                <h3> {sTable.id}</h3>
                              )}
                              <span></span>
                              <span> Staff ID: {sTable.staffId}</span>
                            </div>
                          ))}
                          {/* {this.state.tableId > 0 ? (<Alert variant="success"><p>You have selected table number {this.state.tableId}</p></Alert>): null} */}
                        </tbody>
                      </div>
                    </Row>
                    <Row>
                    <div className="form-group">
                        <label>All tables, click to assign the table to {this.state.name}</label>
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
                       
                                color: "white",
                                background: table.outdoorTable
                                  ? "green"
                                  : "blue", 
                                  cursor: "pointer",
                                  boxShadow: "5px 5px 10px #696969",
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
                             
                            </div>
                          ))}
                          {/* {this.state.tableId > 0 ? (<Alert variant="success"><p>You have selected table number {this.state.tableId}</p></Alert>): null} */}
                        </tbody>
                      </div>
                    </Row>
                    </Col>
                    <button
                      className="btn btn-danger"
                      onClick={this.cancel.bind(this)}
                      style={{ marginLeft: "10px" }}
                    >
                      Return
                    </button>
                  </form>
                </div>
                {/* </div> */}
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
