import React, { Component } from 'react'
import BookingService from '../services/BookingService'
import { Card, ListGroup, Col, Row } from 'react-bootstrap'
import CheckoutForm from './CheckoutForm'


class BookingSummaryComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            date: '',
            time: '',
            numGuests: 0,
            items: [],
            price: 0
        }
        this.forceUpdate();

    }


    componentDidMount() {
        console.log("BSum id", this.state.id)
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
    }

    // update() {
    //     this.forceUpdate();
    // }

    // componentDidUpdate(previousProps, previousState) {
    //     if (previousProps.data !== this.props.data) {
    //         BookingService.getBookingsById(7).then((res) => {
    //             let booking = res.data
    //             this.setState({
    //                 date: booking.date,
    //                 time: booking.time,
    //                 numGuests: booking.numGuests,
    //                 items: booking.items,
    //                 price: booking.price
    //             });
    //         });
    //     }
    // }



    //  updateFoodItem(id){
    //     this.props.history.push(`/update-foodItem/${id}`);
    // }

    // updateDrink(id){
    //     this.props.history.push(`/update-drinkItem/${id}`);
    // }

    render() {

        return (
            <div>
                <Row>
                    <Col>
                        <Card border="primary">
                            <Card.Body>
                                <Card.Title>Your booking</Card.Title>
                                <Card.Text>
                                    <ListGroup variant="flush">
                                        <Card.Text>
                                            Date: {this.state.date}
                                        </Card.Text>
                                        <Card.Text>
                                            Time: {this.state.time}
                                        </Card.Text>
                                        <Card.Text>
                                            Number of guests: {this.state.numGuests}
                                        </Card.Text>
                                        </ListGroup>
                                </Card.Text>
                                {/* <CheckoutForm price={this.state.price} /> */}
                            </Card.Body>

                        </Card>
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
                                    {/* <p>Date: {this.state.date}</p>
                                    <p>Time: {this.state.time}</p>
                                    <p>Number of guests: {this.state.numGuests}</p> */}
                                </Card.Text>
                                {/* <Button variant="primary" onClick={() => this.addItemtoBooking(item.id)}>Add to order</Button> */}
                                <CheckoutForm price={this.state.price} />
                            </Card.Body>

                        </Card>
                    </Col>
                </Row>

            </div>

        )

    }
}


export default BookingSummaryComponent