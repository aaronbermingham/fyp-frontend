import React, { Component } from "react";
import ItemService from "../services/ItemService";
import AuthService from "../services/AuthService";
import Lost from "./LostComponent";
import StaffService from "../services/StaffService";
import { Card, Form, Col, Row, Button } from 'react-bootstrap'
import DatePicker from "react-datepicker"

class StaffDetailsComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      name: "",
      email: "",
      phoneNum: "",
      shiftList: [],
      workDays: [],
      date: new Date(),
      showDate: false
    };
    this.handleDateChange = this.handleDateChange.bind(this);
    this.showDate = this.showDate.bind(this); 
    this.closeShift = this.closeShift.bind(this);
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
    StaffService.getStaffById(this.state.id).then((res) => {
      let staffInfo = res.data;
      this.setState({
        name: staffInfo.name,
        email: staffInfo.email,
        phoneNum: staffInfo.phoneNumber,
        shiftList: staffInfo.shiftList,
      });
    });
    console.log(this.state.name);
    console.log(this.state.email);
    console.log(this.state.shiftList);
  }

  handleDateChange(date) {
    this.setState({
      date: date,
    });
    console.log("DATE", this.state.date);
  }

  showDate(){
    this.setState({ showDate: !this.state.showDate });
  }

  closeShift(shiftId){
    let shift = {
      endDate: this.state.date.toISOString().slice(0, 10),
    };
    console.log("shift => " + JSON.stringify(shift));
    console.log("currentShift id " + shiftId);
    StaffService.closeShift(shiftId, shift).then((res) => {
      this.props.history.push("/allStaff");
    });
  };

  cancel() {
    this.props.history.push("/allItems");
  }

  render() {
    const { businessUser } = this.state;
    return (
      <div>
        {businessUser ? (
          <div >
            <div>
                <h3 class="text-center">{this.state.name}'s Shifts</h3>
                <h4 class="text-center">Current shift</h4>
                <Row> 
                {this.state.shiftList.filter(shift => shift.archived == false).map((shift) => (
                <Card border = 'primary' >
                <Card.Header as="h5">{this.state.name}</Card.Header>
                <Card.Body>
                  <Card.Title></Card.Title>
                  <Card.Text>
                  Start date: {shift.startDate + " "} <span>{<br/>}</span>
                  End date: {shift.endDate == null ? "N/A": shift.endDate} <span>{<br/>}</span>
                  Archived: {shift.archived ? "Yes" : "No"} <span>{<br/>}</span>
                   {shift.shiftDayTimeList.map((subitem, i) => {
                        return <p>{subitem.day + " " + subitem.startTime + "-" + subitem.endTime}</p>;
                      })}
                  </Card.Text>
                  <Form.Check
                        type="switch"
                        id="pp"
                        label="Close shift"
                        onChange={this.showDate}
                        checked={this.state.showDate}
                      />
                  {this.state.showDate ? ( <div className="form-group">
                      <label>Choose end date for this shift</label>
                      <DatePicker
                        selected={this.state.date}
                        onChange={this.handleDateChange}
                        name="date"
                        minDate={new Date()}
                        dateFormat="yyyy/MM/dd"
                        className="form-control"
                        showDisabledMonthNavigation
                      />
                      <Button variant="primary" onClick={() => { this.closeShift(shift.id) }} style={{marginTop: "10px"}}>Close shift</Button>
                    </div>):null}

                </Card.Body>
              </Card>
                  
                    //   {shift.shiftDayTimeList.map((subitem, i) => {
                    //     return <td>{subitem.startTime + "-" + subitem.endTime}</td>;
                    //   })}
                
                ))} 

                </Row>
            <Col>
            <h4 class="text-center">Archived shifts</h4>
            <Row>
            
            {this.state.shiftList.filter(shift => shift.archived == true).map((shift) => (
                <Card>
                <Card.Header as="h5">{this.state.name}</Card.Header>
                <Card.Body>
                  <Card.Title></Card.Title>
                  <Card.Text>
                  Start date: {shift.startDate + " "} <span>{<br/>}</span>
                  End date: {shift.endDate == null ? "N/A": shift.endDate} <span>{<br/>}</span>
                  Archived: {shift.archived ? "Yes" : "No"} <span>{<br/>}</span>
                   {shift.shiftDayTimeList.map((subitem, i) => {
                        return <p>{subitem.day + " " + subitem.startTime + "-" + subitem.endTime}</p>;
                      })}
                  </Card.Text>
                </Card.Body>
              </Card>
                ))} 
            </Row>
            </Col>
    
            </div>

          </div>
        ) : (
          <Lost />
        )}
      </div>
    );
  }
}

export default StaffDetailsComponent;
