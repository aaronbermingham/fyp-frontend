import React, { Component } from 'react'
import TableService from '../services/TableService';
import AuthService from "../services/AuthService";
import StaffService from "../services/StaffService";
import Lost from './LostComponent';
import Form from 'react-bootstrap/Form'

class AddTableComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            numSeats: 2,
            reserved: false,
            numTables: 1,
            bisUser: false,
            currentUser: undefined,
            outdoor: false,
            staffList: [],
            
        }
        this.changeSeatHandler = this.changeSeatHandler.bind(this);
        this.createTable = this.createTable.bind(this);
        this.changeOutdoorHandler = this.changeOutdoorHandler.bind(this);
    }

    changeSeatHandler = (event) => {
        this.setState({ numSeats: event.target.value });
        console.log("numSeats ", this.state.numSeats);
    }
    
    changeTableHandler = (event) => {
        this.setState({ numTables: event.target.value });
        console.log("NumTables ", this.state.numTables);
    }

    changeOutdoorHandler = (event) => {
        this.setState({outdoor: !this.state.outdoor})
        console.log("Outdoor ", this.state.outdoor);
    }

   
    createTable = (e) => {
        e.preventDefault();
        let table = {
            disable: this.state.disabled,
            numSeats: this.state.numSeats,
            outdoor: this.state.outdoor,
        };
        console.log('table => ' + JSON.stringify(table));
        for(var i = 0; i < this.state.numTables; i ++){
            TableService.addTable(table, this.state.staffMember).then(res => {
                this.props.history.push('/allTables')
            });
        }
       
    }

    cancel() {
        this.props.history.push('/allTables')
    }

    componentDidMount() {
        const user = AuthService.getCurrentUser();
        console.log("Current user ", user)

        StaffService.getStaff().then((res) => {
            let staff = res.data;
            console.log("Staff ", staff)
            this.setState({
             staffList: staff,
            });
            console.log(this.state.staffList)
        });
       
        if (user) {
          this.setState({
            currentUser: user,
            businessUser: user.roles.includes("ROLE_BUSINESS"),
          });
        }
      }

    render() {
        const { businessUser } = this.state;
        return (
            <div> {businessUser ? (
                <div className="container">
                    <div className="row">
                        <div className="card col-md-6 offset-md-3 offset-md-3">
                            <h3 className="text-center">Add table</h3>
                            <div className="card-body">
                                <form>
                                    <div className="form-group">
                                        <label>Number of seats</label>
                                        <select placeholder="Number of Seats" name="numSeats" className="form-control"
                                            selected={this.state.numSeats} onChange={this.changeSeatHandler}>
                                            <option value="2">2</option>
                                            <option value="4">4</option>
                                            <option value="6">6</option>
                                            {/* <option value="20">20</option> */}
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Number of tables</label>
                                        <select placeholder="Number of Tables" name="numTables" className="form-control"
                                            selected={this.state.numTables} onChange={this.changeTableHandler}>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                            {/* <option value="20">20</option> */}
                                        </select>
                                        </div>
                                        <div className="form-group">
                                        <label>Outdoor Table</label>
                                        <Form.Group controlId="formBasicCheckbox">
                                        <Form.Check type="checkbox" label="Yes/No" selected={this.state.outdoor} onClick={this.changeOutdoorHandler} />
                                        </Form.Group>
                                    </div>
                                   
                                    <button className="btn btn-success" onClick={this.createTable}>Add table</button>
                                    <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{ marginLeft: "10px" }}>Cancel</button>
                                </form>
                            </div>

                        </div>
                    </div>
                </div> ):<Lost/>}
            </div>
        )


    }
}

export default AddTableComponent