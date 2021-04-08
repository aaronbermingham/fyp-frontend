import React, { Component } from 'react'
import TableService from '../services/TableService';
import Modal from "react-bootstrap/Modal";
import Moment from 'moment';
import Button from "react-bootstrap/Button";
import UserService from '../services/UserService';
import AuthService from "../services/AuthService";
import { withRouter } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert'


class UserTableComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            tables: [],
            numOfSeats: 0,
            clicked: false,
            tableId: 0,

        }
        this.onClick = this.onClick.bind(this);
        this.createBooking = this.createBooking.bind(this);
        // this.filterTables = this.filterTables.bind(this);
    }

    componentDidMount() {
        const locale = 'en';
       
        let booking = {
          date: this.props.date.toISOString().slice(0, 10),
          time: this.props.time.toLocaleTimeString(locale, { hour: 'numeric', hour12: false, minute: 'numeric', second: 'numeric' }),
          numGuests: this.props.guests
        };
        console.log('cdm booking => ' + JSON.stringify(booking));
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

    onClick(table) {
        console.log("Table ", table.id)
        
        this.setState({tableId: table.id})
       
       
            this.setState({tableId: table.id});
     

        
        console.log("Clicked ", this.state.clicked)
    }

    createBooking = (e) => {
        //BookingService.clearBookings();
        const locale = 'en';
        console.log("Table id ", this.state.tableId)
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
            
                <div class="row">
                    <div class='box green'></div>
                    <span>Outdoor table</span>
                </div>

                <div class="row">
                    <div class='box blue'></div>
                    <span>Indoor table</span>
                </div>
                <div>


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
                                                    background: table.outdoorTable ? "green" : "blue",
                                                   
                                                }}
                                                //onMouseEnter={() => onMouseEnter(id, willOrphan)}
                                                //onMouseLeave={onMouseLeave}
                                                // onClick={() => this.setState({ options: !options })}
                                                onClick={() => this.onClick(table)}
                                            //onMouseEnter={() => onMouseEnter(id, willOrphan)}
                                            //onMouseLeave={onMouseLeave}

                                            >



                                                ID: {table.numSeats > 5 ? <h1> {table.id}</h1> : <h3> {table.id}</h3>}
                                               


                                                <span> Seats: {table.numSeats}</span>
                                                <span></span>
                                                
                                                

                                                

                                            </div>

                               
                                    )
                                    
                                }
                                {this.state.tableId > 0 ? (<Alert variant="success"><p>You have selected table number {this.state.tableId}</p></Alert>): null}
                            </tbody>
                            

                        </div>
                        

                        <button className="btn btn-primary" onClick={this.createBooking}>Add booking</button>
                    </table>

                </div>
               
            </div>
        )

    }
}


export default UserTableComponent