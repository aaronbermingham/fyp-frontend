import { Switch, Route } from "react-router-dom";
import React, { Component } from 'react'
import Card from 'react-bootstrap/Card'
import CardColumns from 'react-bootstrap/CardColumns'
import AuthService from "../services/AuthService";
import AddDrink from "./AddDrinkComponent";
import AddFood from "./AddFoodComponent";
import AllItems from "./AllItemsComponent";
import Lost from './LostComponent';


class BisUserGridComponent extends Component {
  constructor(props) {
    super(props)

    this.state = {
      bisUser: false,
      currentUser: undefined,
    }
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();
    console.log("Current user ", user)

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
        <CardColumns className="text-center">
          <Card >
            <svg width="10em" height="10em" viewBox="0 0 16 16" class="bi bi-calendar2-check" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM2 2a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H2z" />
              <path d="M2.5 4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H3a.5.5 0 0 1-.5-.5V4z" />
              <path fill-rule="evenodd" d="M10.854 8.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708 0z" />
            </svg>
            <Card.Body>
              <Card.Title>Bookings</Card.Title>
              <Card.Text>
                View/Manage bookings
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              <small className="text-muted"> <Card.Link href="/allBookings"><h4>Click here</h4></Card.Link></small>
            </Card.Footer>
          </Card>


          <Card>
            <svg width="10em" height="10em" viewBox="0 0 16 16" class="bi bi-list-ul" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm-3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
            </svg>
            <Card.Body>
              <Card.Title>Items</Card.Title>
              <Card.Text>
                View/Manage Food items
    </Card.Text>
            </Card.Body>
            <Card.Footer>
              <small className="text-muted"> <Card.Link href="/allItems"><h4>Click here</h4></Card.Link></small>
            </Card.Footer>
          </Card>
          <Card bg="primary" text="white" className="text-center p-3">
            <blockquote className="blockquote mb-0 card-body">
              <p>
                Business Section
                Add items
                View bookings etc
    </p>

            </blockquote>
          </Card>
          <Card>
            <svg width="10em" height="10em" viewBox="0 0 16 16" class="bi bi-egg" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M8 15a5 5 0 0 0 5-5c0-1.956-.69-4.286-1.742-6.12-.524-.913-1.112-1.658-1.704-2.164C8.956 1.206 8.428 1 8 1c-.428 0-.956.206-1.554.716-.592.506-1.18 1.251-1.704 2.164C3.69 5.714 3 8.044 3 10a5 5 0 0 0 5 5zm0 1a6 6 0 0 0 6-6c0-4.314-3-10-6-10S2 5.686 2 10a6 6 0 0 0 6 6z" />
            </svg>
            <Card.Body>
              <Card.Title>Add Food items</Card.Title>
              <Card.Text>
                Add a new food item to the menu
    </Card.Text>
            </Card.Body>
            <Card.Footer>
              <small className="text-muted"><Card.Link href="/addFoodItem"><h4>Click here</h4></Card.Link></small>
            </Card.Footer>
          </Card>

          <Card>
            <svg width="10em" height="10em" viewBox="0 0 16 16" class="bi bi-trash2" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M3.18 4l1.528 9.164a1 1 0 0 0 .986.836h4.612a1 1 0 0 0 .986-.836L12.82 4H3.18zm.541 9.329A2 2 0 0 0 5.694 15h4.612a2 2 0 0 0 1.973-1.671L14 3H2l1.721 10.329z" />
              <path d="M14 3c0 1.105-2.686 2-6 2s-6-.895-6-2 2.686-2 6-2 6 .895 6 2z" />
              <path fill-rule="evenodd" d="M12.9 3c-.18-.14-.497-.307-.974-.466C10.967 2.214 9.58 2 8 2s-2.968.215-3.926.534c-.477.16-.795.327-.975.466.18.14.498.307.975.466C5.032 3.786 6.42 4 8 4s2.967-.215 3.926-.534c.477-.16.795-.327.975-.466zM8 5c3.314 0 6-.895 6-2s-2.686-2-6-2-6 .895-6 2 2.686 2 6 2z" />
            </svg>
            <Card.Body>
              <Card.Title>Add drink item</Card.Title>
              <Card.Text>
                Add a new drink to the menu
    </Card.Text>
            </Card.Body>
            <Card.Footer>
              <small className="text-muted"><Card.Link href="/addDrinkItem"><h4>Click here</h4></Card.Link></small>
            </Card.Footer>
          </Card>
          <Card>
            <svg width="10em" height="10em" viewBox="0 0 16 16" class="bi bi-person" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M10 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm6 5c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
            </svg>
            <Card.Body>
              <Card.Title>Users</Card.Title>
              <Card.Text>
                View/manage users
    </Card.Text>
            </Card.Body>
            <Card.Footer>
              <small className="text-muted"><Card.Link href="/allUsers"><h4>Click here</h4></Card.Link></small>
            </Card.Footer>
          </Card>
        </CardColumns>
      ) : <Lost />}
        <div className="container mt-3">
          <Switch>
            <Route path="/addFoodItem" component={AddFood}></Route>
            <Route path="/addDrinkItem" component={AddDrink}></Route>
            <Route path="/allItems" component={AllItems}></Route>
          </Switch>
        </div>
      </div>
    )
  }
}

export default BisUserGridComponent