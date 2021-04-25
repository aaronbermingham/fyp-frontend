import React, { Component } from "react";
import ItemService from "../services/ItemService";
import AuthService from "../services/AuthService";
import Lost from "./LostComponent";
import StaffService from "../services/StaffService";
import { Card, ListGroup, Col, Row, Button } from 'react-bootstrap'

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
    };
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

  changeNameHandler = (event) => {
    this.setState({ name: event.target.value });
  };

  changePriceHandler = (event) => {
    this.setState({ price: event.target.value });
  };

  changeDescriptionHandler = (event) => {
    this.setState({ description: event.target.value });
  };

  changeIngredientHandler = (event) => {
    this.setState({ ingredients: event.target.value });
  };

  changeAllergenHandler = (event) => {
    this.setState({ allergens: event.target.value });
  };

  updateFoodItem = (e) => {
    e.preventDefault();
    let foodItem = {
      name: this.state.name,
      description: this.state.description,
      price: this.state.price,
      ingredients: this.state.ingredients,
      allergens: this.state.allergens,
      bisUser: false,
      currentUser: undefined,
    };
    console.log("foodItem => " + JSON.stringify(foodItem));
    ItemService.updateFoodItem(foodItem, this.state.id).then((res) => {
      this.props.history.push("/allItems");
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
                  {/* <Button variant="primary">Go somewhere</Button> */}
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
            
            {this.state.shiftList.map((shift) => (
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
