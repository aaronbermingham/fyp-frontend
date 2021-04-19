import React, { Component } from "react";
import TableService from "../services/TableService";
import Form from "react-bootstrap/Form";
import { Col, Row, Table } from "react-bootstrap";
import Alert from "react-bootstrap/Alert";
import Modal from "react-bootstrap/Modal";
// import ModalBody from "react-bootstrap/ModalBody";
// import ModalHeader from "react-bootstrap/ModalHeader";
// import ModalFooter from "react-bootstrap/ModalFooter";
// import ModalTitle from "react-bootstrap/ModalTitle";
import Button from "react-bootstrap/Button";

class TableComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tables: [],
      numOfSeats: 0,
      seats2m: 0,
      seats1m: 0,
      currentCapacity: 0,
      normal: false,
      twoMetres: false,
      oneMetre: false,
      outDoorOnly: false,
      restaurant: [],
      type: -1,
      oneMetreDiff: 0,
      twoMetreDiff: 0,
      modal: false,
      toggleClick: false,
    };
    this.getTableInfo = this.getTableInfo.bind(this);
    this.handleNormalChange = this.handleNormalChange.bind(this);
    this.handleTwoChange = this.handleTwoChange.bind(this);
    this.handleOneChange = this.handleOneChange.bind(this);
    this.setCapacity = this.setCapacity.bind(this);
    this.onClick = this.onClick.bind(this);
    this.disableTable = this.disableTable.bind(this);
    this.handleOutdoorChange = this.handleOutdoorChange.bind(this);

    // this.handleClose = this.handleClose.bind(this);
    //this.addUser = this.addUser.bind(this);
    //this.updateUser = this.updateUser.bind(this);
  }

  getTableInfo() {
    TableService.getTables().then((res) => {
      this.setState({ tables: res.data });
      this.setState({ numOfSeats: res.data.numSeats });
      for (let i = 0; i < res.data.length; i++) {
        console.log(i + 1 + " Table info ", res.data[i].resList);
      }
    });
    TableService.getSeats().then((res) => {
      this.setState({ numOfSeats: res.data });
      this.setState({ numSeats: res.data.numSeats });
      console.log("Normal cap: ", this.state.numOfSeats);
    });

    TableService.get1mCapacity(1).then((res) => {
      this.setState({ seats1m: res.data });
      //this.setState({ numSeats: res.data.numSeats })
      console.log(this.state.seats1m);
      this.setState({
        oneMetreDiff:
          this.state.numOfSeats - this.state.restaurant.capacity1metre,
      });
    });

    TableService.get2mCapacity(1).then((res) => {
      this.setState({ seats2m: res.data });
      //this.setState({ numSeats: res.data.numSeats })
      console.log(this.state.seats2m);
      this.setState({
        twoMetreDiff:
          this.state.numOfSeats - this.state.restaurant.capacity2metres,
      });
    });

    TableService.getCurrentCapacity(1).then((res) => {
      this.setState({ currentCapacity: res.data });
      this.setState({ numSeats: res.data.numSeats });
      console.log(this.state.currentCapacity);
    });
  }

  componentDidMount() {
    TableService.getRestaurant(1).then((res) => {
      this.setState({
        normal: res.data.normalCapacity,
        twoMetres: res.data.twoMetreCapacity,
        oneMetre: res.data.oneMetreCapacity,
      });
    });

    TableService.getTables().then((res) => {
      this.setState({ tables: res.data });
      this.setState({ numOfSeats: res.data.numSeats });
      for (let i = 0; i < res.data.length; i++) {
        console.log(i + 1 + " Table info ", res.data[i].resList);
      }
    });
    TableService.getSeats().then((res) => {
      this.setState({ numOfSeats: res.data });
      this.setState({ numSeats: res.data.numSeats });
      console.log("Normal cap: ", this.state.numOfSeats);
    });

    TableService.get1mCapacity(1).then((res) => {
      this.setState({ seats1m: res.data });
      //this.setState({ numSeats: res.data.numSeats })
      console.log(this.state.seats1m);
      this.setState({
        oneMetreDiff:
          this.state.numOfSeats - this.state.restaurant.capacity1metre,
      });
    });

    TableService.get2mCapacity(1).then((res) => {
      this.setState({ seats2m: res.data });
      //this.setState({ numSeats: res.data.numSeats })
      console.log(this.state.seats2m);
      this.setState({
        twoMetreDiff:
          this.state.numOfSeats - this.state.restaurant.capacity2metres,
      });
    });

    TableService.getCurrentCapacity(1).then((res) => {
      this.setState({ currentCapacity: res.data });
      this.setState({ numSeats: res.data.numSeats });
      console.log(this.state.currentCapacity);
    });

    TableService.getRestaurant(1).then((res) => {
      this.setState({ restaurant: res.data });
      //this.setState({ numSeats: res.data.numSeats })
      // console.log("Res ",this.state.restaurant);
      this.setState({ normal: this.state.restaurant.normalCapacity });
      this.setState({ twoMetres: this.state.restaurant.twoMetreCapacity });
      this.setState({ oneMetre: this.state.restaurant.oneMetreCapacity });
      console.log("Res ", this.state.restaurant);
      console.log("Normal cap ", this.state.restaurant.normalCapacity);
      console.log("1m cap ", this.state.restaurant.oneMetreCapacity);
      console.log("2m cap ", this.state.restaurant.twoMetreCapacity);
    });
  }

  handleNormalChange(normal) {
    this.setState({ normal: !this.state.normal });
    this.setState({ twoMetres: false });
    this.setState({ oneMetre: false });
    this.setState({ outDoorOnly: false });
  }
  handleTwoChange(twoMetres) {
    this.setState({ twoMetres: !this.state.twoMetres });
    this.setState({ normal: false });
    this.setState({ oneMetre: false });
    this.setState({ outDoorOnly: false });
  }
  handleOneChange(oneMetre) {
    this.setState({ oneMetre: !this.state.oneMetre });
    this.setState({ twoMetres: false });
    this.setState({ normal: false });
    this.setState({ outDoorOnly: false });
  }

  handleOutdoorChange(oneMetre) {
    this.setState({ outDoorOnly: !this.state.outDoorOnly });
    this.setState({ twoMetres: false });
    this.setState({ normal: false });
    this.setState({ oneMetre: false });
  }

  setCapacity() {
    let type = -1;
    if (this.state.normal === true) {
      type = 0;
      TableService.setCurrentCapacity(1, type).then((res) => {
        TableService.setCurrentCapacity(1, type).then((res) => {
          TableService.getTables().then((res) => {
            this.setState({ tables: res.data });
            this.setState({ numOfSeats: res.data.numSeats });
          });
        });
        TableService.getRestaurant(1).then((res) => {
          this.setState({
            normal: res.data.normalCapacity,
            twoMetres: res.data.twoMetreCapacity,
            oneMetre: res.data.oneMetreCapacity,
            currentCapacity: res.data.currentCapacity,
          });
        });
      });
    } else if (this.state.oneMetre === true) {
      type = 1;
      TableService.setCurrentCapacity(1, type).then((res) => {
        TableService.getRestaurant(1).then((res) => {
          this.setState({
            normal: res.data.normalCapacity,
            twoMetres: res.data.twoMetreCapacity,
            oneMetre: res.data.oneMetreCapacity,
            currentCapacity: res.data.currentCapacity,
          });
        });
      });
    } else if (this.state.twoMetres === true) {
      type = 2;
      TableService.setCurrentCapacity(1, type).then((res) => {
        TableService.getRestaurant(1).then((res) => {
          this.setState({
            normal: res.data.normalCapacity,
            twoMetres: res.data.twoMetreCapacity,
            oneMetre: res.data.oneMetreCapacity,
            currentCapacity: res.data.currentCapacity,
          });
        });
      });
    } else if (this.state.outDoorOnly === true) {
      type = 3;
      TableService.setCurrentCapacity(1, type).then((res) => {
        TableService.getTables().then((res) => {
          this.setState({ tables: res.data });
          this.setState({ numOfSeats: res.data.numSeats });
        });
        TableService.getRestaurant(1).then((res) => {
          this.setState({
            normal: res.data.normalCapacity,
            twoMetres: res.data.twoMetreCapacity,
            oneMetre: res.data.oneMetreCapacity,
            outDoorOnly: res.data.outDoorOnly,
            currentCapacity: res.data.currentCapacity,
          });
        });
      });
    }
  }

  onClick(table) {
    console.log("Table click ", table.id);
    this.setState({ modal: !this.state.modal });
  }

  deleteTable(id) {
    TableService.deleteTable(id);
    TableService.getCurrentCapacity(1).then((res) => {
      this.setState({ currentCapacity: res.data });
      console.log(this.state.currentCapacity);
    });
    TableService.getTables().then((res) => {
      this.setState({ tables: res.data });
      this.setState({ numOfSeats: res.data.numSeats });
      console.log("Delete log ", res.data);
    });
  }

  disableTable(table) {
    console.log("Toggle ", this.state.toggleClick);
    console.log("Table id: ", table.id);
    TableService.toggleTable(table.id).then((res) => {
      TableService.getCurrentCapacity(1).then((res) => {
        this.setState({ currentCapacity: res.data });
        console.log(this.state.currentCapacity);
      });
      TableService.getTables().then((res) => {
        this.setState({ tables: res.data });
      });
      console.log("table: ", res.data);
    });
    this.componentDidMount();
  }

  componentDidUpdate() {
    console.log("Updated!");
  }

  render() {
    const diffSub = this.state.tables
    .filter(({ disabled }) => disabled === false)
    .reduce((totalSeats, table) => totalSeats + table.numSeats, 0) - this.state.currentCapacity;

    const diffAdd = this.state.currentCapacity - this.state.tables
    .filter(({ disabled }) => disabled === false)
    .reduce((totalSeats, table) => totalSeats + table.numSeats, 0) ;

    let warning;
    if (
      this.state.currentCapacity <
      this.state.tables
        .filter(({ disabled }) => disabled === false)
        .reduce((totalSeats, table) => totalSeats + table.numSeats, 0)
    ) {
      warning = (
        <Alert variant="danger">
          {/* <p className="text-center">Please disable {this.state.numOfSeats - this.state.restaurant.capacity1metre} seats to ensure one metre distancing</p> */}
          <p className="text-center">
            Please disable {diffSub} number of seats to ensure one metre distancing
            <p>
              Number of seats enabled{" "}
              {this.state.tables
                .filter(({ disabled }) => disabled === false)
                .reduce((totalSeats, table) => totalSeats + table.numSeats, 0)}
            </p>
          </p>
        </Alert>
      );
    } else if (
      this.state.currentCapacity <
      this.state.tables
        .filter(({ disabled }) => disabled === false)
        .reduce((totalSeats, table) => totalSeats + table.numSeats, 0)
    ) {
      warning = (
        <Alert variant="danger">
          {/* <p className="text-center">Please disable {this.state.numOfSeats - this.state.restaurant.capacity2metres} seats to ensure two metre distancing</p> */}
          <p className="text-center">
          Please disable {diffSub} number of seats to ensure two metre distancing
            <p>
              Number of seats enabled{" "}
              {this.state.tables
                .filter(({ disabled }) => disabled === false)
                .reduce((totalSeats, table) => totalSeats + table.numSeats, 0)}
            </p>
          </p>
        </Alert>
      );
    }
    else if (
      this.state.currentCapacity <
      this.state.tables
        .filter(({ disabled }) => disabled === false)
        .reduce((totalSeats, table) => totalSeats + table.numSeats, 0)
    ) {
      warning = (
        <Alert variant="danger">
          {/* <p className="text-center">Please disable {this.state.numOfSeats - this.state.restaurant.capacity2metres} seats to ensure two metre distancing</p> */}
          <p className="text-center">
          Please disable {diffAdd} 
            <p>
              Number of seats enabled{" "}
              {this.state.tables
                .filter(({ disabled }) => disabled === false)
                .reduce((totalSeats, table) => totalSeats + table.numSeats, 0)}
            </p>
          </p>
        </Alert>
      );
    }

    return (
      <div>
        <h2 className="text-center">Tables</h2>
        <h4 className="text-center">
          Number of tables: {this.state.tables.length}
        </h4>
        <h4 className="text-center">
          Current capacity: {this.state.currentCapacity}
        </h4>
        {warning}
        <Row>
          <Col>
            <div className="container">
              {" "}
              {/* <h4>Normal capacity: {this.state.numOfSeats}</h4> */}
              <Form.Check
                type="switch"
                id="normal"
                label="Normal capacity"
                onChange={this.handleNormalChange}
                checked={this.state.normal}
              />
            </div>
          </Col>

          <Col>
            <div className="container">
              {" "}
              {/* <h4>Capacity 2 metre distance: {this.state.seats2m}</h4> */}
              <Form.Check
                type="switch"
                id="twoMetres"
                label="Two metre capacity"
                onChange={this.handleTwoChange}
                checked={this.state.twoMetres}
              />
            </div>
          </Col>

          <Col>
            <div className="container">
              {" "}
              {/* <h4>Capacity 1 metre distance: {this.state.seats1m}</h4> */}
              <Form.Check
                type="switch"
                id="oneMetre"
                label="One metre capacity"
                onChange={this.handleOneChange}
                checked={this.state.oneMetre}
              />
            </div>
          </Col>

          <Col>
            <div className="container">
              {" "}
              {/* <h4>Normal capacity: {this.state.numOfSeats}</h4> */}
              <Form.Check
                type="switch"
                id="outdoor"
                label="Outdoor capacity"
                onChange={this.handleOutdoorChange}
                checked={this.state.outDoorOnly}
              />
            </div>
          </Col>
        </Row>

        <Row className="tables">
          <Col>
            <div className="text-center">
              {" "}
              <button
                className="btn btn-primary"
                onClick={() => {
                  this.setCapacity();
                  this.getTableInfo();
                }}
              >
                Choose capacity
              </button>
            </div>
          </Col>
        </Row>

        <div className="container">
          <table className="grid">
            <div className="card col-md-9 offset-md-1 offset-md-1">
              <h3>Click on a table to toggle disabled setting</h3>
              <p>
                Number of seats enabled{" "}
                {this.state.tables
                  .filter(({ disabled }) => disabled === false)
                  .reduce(
                    (totalSeats, table) => totalSeats + table.numSeats,
                    0
                  )}
              </p>
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
                <Col>
                  {" "}
                  <div class="row">
                    <div class="box grey"></div>
                    <span>Table not in use</span>
                  </div>
                </Col>
              </Row>

              <tbody>
                {this.state.tables.map(
                  (table) => (
                    <div
                      key={table.id}
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
                        background:
                          table.disabled === true
                            ? "gray"
                            : !table.disabled && table.outdoorTable === true
                            ? "green"
                            : "blue",
                        cursor: "pointer",
                      }}
                      onClick={() => this.disableTable(table)}
                    >
                      ID:{" "}
                      {table.numSeats > 5 ? (
                        <h1> {table.id}</h1>
                      ) : (
                        <h3> {table.id}</h3>
                      )}
                      <span> Seats: {table.numSeats}</span>
                      <span></span>
                    </div>
                  )

                  // <tr key={table.id}>
                  //     <td>{table.id}</td>

                  // </tr>
                )}
              </tbody>
            </div>
          </table>
        </div>
      </div>
    );
  }
}

export default TableComponent;
