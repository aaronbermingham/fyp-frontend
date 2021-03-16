import React, { Component } from 'react'
import BookingService from '../services/BookingService'
import ItemService from '../services/ItemService'
import { Card, Button, Row, Col, ListGroup } from 'react-bootstrap'
import AuthService from "../services/AuthService";



class OrderFoodComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentUser: undefined,
            id: this.props.match.params.id,
            item: [],
            drinkItem: [],
            items: []

        }

    }



    componentDidMount() {
        const user = AuthService.getCurrentUser();
        console.log("C user auth", user.accessToken)
        if (user) {
            this.setState({
              currentUser: user,
            });
          }

        ItemService.getFoodItems().then((res) => {
            this.setState({ item: res.data });
        });
        ItemService.getDrinkItems().then((res) => {
            this.setState({ drinkItem: res.data });
        });
       
      
        console.log("id", this.state.id);
    }

    addItemtoBooking(id) {
        console.log("Booking id", this.state.id)
        BookingService.addBookingItem(this.state.id, id)
        BookingService.getBookingsById(this.state.id).then((res) => {
            let booking = res.data
            this.setState({
                date: booking.date,
                time: booking.time,
                numGuests: booking.numGuests,
                items: booking.items,
                price: booking.price
            });
        });
        alert("Great choice, that has been added to your order!");
    }

    continue() {
        this.props.history.push(`/booksum/${this.state.id}`)
    }


    render() {
        return (
            <div>
                <Row >
                    <Col>
                        <div>
                            <ListGroup as="ul" >
                                <ListGroup.Item as="li"><a href="#main" >Food</a></ListGroup.Item>
                                <ListGroup.Item as="li"><a href="#drink">Drink</a></ListGroup.Item>
                            </ListGroup>
                        </div>
                    </Col>
                    <Col>
                       
                        <h3 id="main">Main Course Items</h3>
                        {
                            this.state.item.map(
                                item =>
                                    <Card>
                                        <Card.Header>{item.name}</Card.Header>
                                        <Card.Body>
                                            <Card.Title>{item.description}</Card.Title>
                                            <Card.Text>
                                                <p>Price: {item.price}</p>
                                                <p>Ingredients: {item.ingredients}</p>
                                                <p>Allergens: {item.allergens}</p>
                                            </Card.Text>
                                            <Button variant="primary" onClick={() => this.addItemtoBooking(item.id)}>Add to order</Button>
                                        </Card.Body>
                                    </Card>
                            )
                        }
                        <h3 id="drink">Drink Items</h3>
                        {
                            this.state.drinkItem.map(
                                drinkItem =>
                                    <Card>
                                        <Card.Header>{drinkItem.name}</Card.Header>
                                        <Card.Body>
                                            <Card.Title>{drinkItem.description}</Card.Title>
                                            <Card.Text>
                                                <p>Price: {drinkItem.price}</p>
                                                <p>Ingredients: {drinkItem.alcoholByVolume}</p>
                                            </Card.Text>
                                            <Button variant="primary" onClick={() => this.addItemtoBooking(drinkItem.id)}>Add to order</Button>
                                        </Card.Body>
                                    </Card>
                            )
                        }

                    </Col>
                    <Col>
                    <Card border="primary">
                            <Card.Body>
                                <Card.Title>Your order</Card.Title>
                                <Card.Text>
                                    <ListGroup variant="flush">
                                        <ListGroup.Item>{
                                            this.state.items.map((subitem, i) => {
                                                return (
                                                    <ListGroup.Item>{subitem.name} {subitem.price}</ListGroup.Item>

                                                )
                                            })
                                        }</ListGroup.Item>
                                        <ListGroup.Item>Price: {this.state.price}</ListGroup.Item>
                                    </ListGroup>
                                </Card.Text>
                            </Card.Body>

                        </Card>
                        <Button variant="primary" onClick={() => this.continue()} >Checkout</Button>
                    </Col>
                </Row>
            </div>
        )
    }

}
export default OrderFoodComponent