import React, { Component } from 'react'
import TableService from '../services/TableService';
import Modal from "react-bootstrap/Modal";
import Moment from 'moment';
import Button from "react-bootstrap/Button";
import UserService from '../services/UserService';
import AuthService from "../services/AuthService";
import { withRouter } from 'react-router-dom';


class UserTableComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            tables: [],
            numOfSeats: 0,
            modal: false,
            tableId: 0,

        }
        this.onClick = this.onClick.bind(this);
        this.createBooking = this.createBooking.bind(this);
        // this.filterTables = this.filterTables.bind(this);
    }

    componentDidMount() {
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

        TableService.getTables().then((res) => {
            this.setState({ tables: res.data.filter(table => table.disabled === false) })
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

    // filterTables(){
    //     this.setState({tables:tables.filter(table => table.disabled === false)})
    //     console.log(this.state.tables);
    // }

    onClick(table) {
        console.log("Table ", table.id)
        this.setState({tableId: table.id})
    }

    createBooking = (e) => {
        //BookingService.clearBookings();
        const locale = 'en';
       
        e.preventDefault();
        let booking = {
          date: this.props.date.toISOString().slice(0, 10),
          time: this.props.time.toLocaleTimeString(locale, { hour: 'numeric', hour12: false, minute: 'numeric', second: 'numeric' }),
          numGuests: this.props.guests
        };
        console.log('booking => ' + JSON.stringify(booking));
        UserService.addBookingTable(booking, this.state.id, this.state.tableId).then(res => {
            console.log("res data id ",res.data)
            this.bId = res.data;
          console.log("Booking id ", this.bId)
          if(this.bId === -1){
            alert("There are no tables available that can accomodate your party");
          }
          else if(this.bId === -2){
            alert("There are no tables available at your chosen time");
          }
          else if(this.bId > 0){
            this.props.history.push(`/orderFood/${this.bId}`);
          }
        })
    
       
      }

    render() {
        const utc = Moment.utc(this.props.time).format();
        return (

            <div>
                 <h2 className="text-center">Tables</h2>
                 Data from parent is: {Moment.utc(this.props.time).format()}
                 <table className="table table-striped table-bordered">
                 <tbody>
                            {
                                this.state.tables.map(
                                    table1 =>
                                        <tr key={table1.id}>
                                            <td>{table1.id}</td>
                                            <td>
                                                    {
                                                        table1.resList.map((subitem, i) => {
                                                            return (
                                                                <li>{subitem.endBooking +"Z" === utc? "Yes" : "No" }</li>
                                                                // <td> {Moment.utc(this.props.bookingTime).format()===subItem.endBooking? "Yes" : "No"}</td>

                                                            )
                                                           
                                                        })
                                                    }</td>
                                                     <td>
                                                    {
                                                        table1.resList.map((subitem, i) => {
                                                            return (
                                                                <li>{subitem.endBooking + "Z"}</li>
                                                                // <td> {Moment.utc(this.props.bookingTime).format()===subItem.endBooking? "Yes" : "No"}</td>

                                                            )
                                                           
                                                        })
                                                    }</td>
                                                    <td> {utc}</td>
                                                    
                                        </tr>
                                )
                            }
                        </tbody></table>
                <div className="container">


                    <div class="chair"></div>


                    <table className="grid">
                        <div className="card col-md-9 offset-md-1 offset-md-1">
                            <tbody>


                                {
                                    this.state.tables.map(
                                        
                                        table =>
                                    //    {tables.filter(table => table.resList.endBooking !== utc+2)}
                                        
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
                                                    background: table.disabled ? "gray" : "green",
                                                   
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

                        <button className="btn btn-primary" onClick={this.createBooking}>Add booking</button>
                    </table>

                </div>
                {/* <div>
                <table className="table table-striped table-bordered">
                            {
                                this.state.tables.map(
                                    table1 =>
                                        <tr key={table1.id}>
                                            <td>{table1.id}</td>
                                            <td>
                                                    {
                                                        table1.resList.map((subitem, i) => {
                                                            if(subitem.endBooking+"Z" !== utc || table1.id !== subitem.tableId)
                                                            return (
                                                                <td>Table id {table1.id} End booking {subitem.endBooking} time {utc} Res table id {subitem.tableId}</td>
                                                                // <td> {Moment.utc(this.props.bookingTime).format()===subItem.endBooking? "Yes" : "No"}</td>

                                                            )
                                                           
                                                        })
                                                    }</td>
                                                
                                                    
                                        </tr>
                                )
                            }
                        </table>
                            </div> */}

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