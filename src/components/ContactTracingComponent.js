import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import DatePicker from 'react-datepicker';
import AuthService from "../services/AuthService";
import Lost from './LostComponent';

import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import ContactTracingService from '../services/ContactTracingService';



class ContactTracingComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            id: 0,
            bId: 0,
            date: new Date(),
            time: new Date(),
            contacts: [],
            getContacts: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    componentDidMount() {
        const user = AuthService.getCurrentUser();
        console.log("Current user id add booking ", user.id)

        if (user) {
            this.setState({
                id: user.id,
                currentUser: user,
                businessUser: user.roles.includes("ROLE_BUSINESS"),
            });
        }
    }


    handleChange(date) {
        this.setState({
            date: date,
            time: date
        })
        console.log("date", this.state.date);
        console.log("time", this.state.time);
    }


    onFormSubmit(e) {
        e.preventDefault();
        console.log("Date: " + this.state.date)
        console.log("\nTime: " + this.state.time)
    }

    getListofContacts = (e) => {
        const locale = 'en';
        this.setState({ getContacts: !this.state.getContacts })
        e.preventDefault();
        let booking = {
            date: this.state.date.toISOString().slice(0, 10),
            time: this.state.time.toLocaleTimeString(locale, { hour: 'numeric', hour12: false, minute: 'numeric', second: 'numeric' }),
            numGuests: 1
        };
        console.log('booking => ' + JSON.stringify(booking));
        ContactTracingService.getTrackingList(booking).then((res) => {
            console.log(res.data);
            this.setState({ contacts: res.data })
        });;
    }


    render() {
        const { businessUser } = this.state;

        return (
            <div>{businessUser ? (
                <div>
                    <h2>Contact Tracing</h2>
                    <h4>Add the date and time for the covid case</h4>
                    <form onSubmit={this.onFormSubmit}>
                        <div className="form-group">
                            <label>Pick a date</label><br></br>
                            <DatePicker
                                selected={this.state.date}
                                onChange={this.handleChange}
                                name="date"
                                minDate={new Date()}
                                dateFormat="yyyy/MM/dd"
                                className="form-control"
                                showDisabledMonthNavigation
                            />
                            <br></br>
                            <div className="form-group">
                                <br></br><label>Pick a time</label><br></br>

                                <DatePicker
                                    selected={this.state.time}
                                    onChange={this.handleChange}
                                    showTimeSelect
                                    showTimeSelectOnly
                                    timeIntervals={120}
                                    timeCaption="Time"
                                    dateFormat="h:mm aa"
                                    className="form-control"
                                />
                            </div>

                        </div>

                        <button className="btn btn-primary" onClick={this.getListofContacts}>Get contacts</button>
                    </form>
                </div>) : <Lost />}
                <div>
                    <h3 className="text-center">Contacts</h3>
                    <div className="row">
                        <table className="table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>

                                </tr>
                            </thead>

                            <tbody>
                                {
                                    this.state.contacts.map(
                                        contact =>
                                            <tr key={contact.id}>
                                                <td>{contact.name}</td>
                                                <td>{contact.email}</td>
                                            </tr>
                                    )
                                }
                            </tbody>

                        </table>
                    </div>
                </div>
            </div>
        );
    }

}

export default ContactTracingComponent;