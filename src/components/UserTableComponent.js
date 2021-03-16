import React, { Component } from 'react'
import TableService from '../services/TableService';
import Modal from "react-bootstrap/Modal";
import Moment from 'moment';
import Button from "react-bootstrap/Button";


class UserTableComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            tables: [],
            numOfSeats: 0,
            modal: false

        }
        this.onClick = this.onClick.bind(this);
    }

    componentDidMount() {
        let date = this.props.bookingTime;
        let utc = Moment.utc(date).format();
        TableService.getTables().then((res) => {
            this.setState({ tables: res.data })
            this.setState({ numOfSeats: res.data.numSeats })
            console.log("Table info ", res.data)
            for (let i = 0; i < res.data.length; i++) {
                console.log((i+1)+ " Table reslist ", res.data[i].resList);
              }
              console.log("Passed date ", utc)
           

        });
        TableService.getSeats().then((res) => {
            this.setState({ numOfSeats: res.data })
            //this.setState({ numSeats: res.data.numSeats })
            console.log(this.state.numOfSeats);

        });



    }

    onClick(table) {
        console.log("Table ", table.id)
    }

    render() {

        return (

            <div>
                 <h2 className="text-center">Tables</h2>
                 Data from parent is: {Moment.utc(this.props.bookingTime).format()}
                <div className="container">


                    <div class="chair"></div>


                    <table className="grid">
                        <div className="card col-md-9 offset-md-1 offset-md-1">
                            <tbody>


                                {
                                    this.state.tables.map(
                                        table =>

                                            <div

                                                style={{
                                                    display: "inline-flex",
                                                    flexDirection: "row",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                    height: table.numSeats === 6 ? 165 : table.numSeats === 4 ? 145 : 125,
                                                    width: table.numSeats === 6 ? 165 : table.numSeats === 4 ? 145 : 125,
                                                    margin: 15,
                                                    borderRadius: table.numSeats === 6 ? 95 : table.numSeats === 4 ? 85 : 70,
                                                    //background: "blue",
                                                    color: "white",
                                                    // background: table.reserved ? "green" : "red",
                                                    background: "green"
                                                }}
                                                //onMouseEnter={() => onMouseEnter(id, willOrphan)}
                                                //onMouseLeave={onMouseLeave}
                                                // onClick={() => this.setState({ options: !options })}
                                                onClick={() => this.onClick(table)}
                                            //onMouseEnter={() => onMouseEnter(id, willOrphan)}
                                            //onMouseLeave={onMouseLeave}

                                            >



                                                ID: {table.numSeats > 5 ? <h1> {table.id}</h1> : <h3> {table.id}</h3>}
                                                <Modal show={this.state.modal} >
                                                    <Modal.Header closeButton>
                                                        <Modal.Title>Delete Table</Modal.Title>
                                                    </Modal.Header>
                                                    <Modal.Body>Do you to delete Table id {table.id}?</Modal.Body>
                                                    <Modal.Footer>
                                                        <Button variant="secondary" onClick={() => this.onClick(table)}  >
                                                            Cancel
                                                </Button>
                                                        <Button variant="primary" onClick={() => this.deleteTable(table.id)}  >
                                                            Delete
                                                </Button>
                                                    </Modal.Footer>
                                                </Modal>


                                                <span> Seats: {table.numSeats}</span>
                                                <span></span>



                                            </div>

                                        // <tr key={table.id}>
                                        //     <td>{table.id}</td>


                                        // </tr>

                                    )

                                }

                            </tbody>

                        </div>


                    </table>

                </div>

                {/* <div className="row">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Table ID</th>
                                <th>Number of seats</th>
                                <th>Reserved</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                this.state.tables.map(
                                    table1 =>
                                        <tr key={table1.id}>
                                            <td>{table1.id}</td>
                                            <td>{table1.numSeats}</td>
                                            <td>{table1.reserved ? "Yes" : "No"}</td>

                                        </tr>
                                )
                            }
                        </tbody>

                    </table>
                </div> */}
            </div>
        )

    }
}


export default UserTableComponent