import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Container, Nav, Navbar, NavDropdown, } from 'react-bootstrap';
import AuthService from "./services/AuthService";
import Login from "./components/LoginComponent";
import Register from "./components/SignUp";
import registerAdmin from "./components/SignUpAdmin";
import Home from "./components/HomeComponent";
import UserHomeComponent from "./components/UserHomeComponent";
import BoardUser from "./components/UserComponent";
import BisUserGridComponent from "./components/BisUserGridComponent";
import AddDrink from "./components/AddDrinkComponent";
import AddFood from "./components/AddFoodComponent";
import AllItems from "./components/AllItemsComponent";
import AllBookings from "./components/AllBookingComponent"
import AllUsers from "./components/AllUserComponent"
import AddBooking from "./components/AddBookingComponent"
import AddTable from "./components/AddTableComponent"
import OrderFood from "./components/OrderFoodComponent"
import BookingSummary from './components/BookingSummaryComponent';
import UpdateFood from './components/UpdateFoodItemComponent';
import UpdateDrink from './components/UpdateDrinkComponent';
import BookingSum from './components/BookingSummaryComponent';
import Table from './components/TableComponent';
import UserTable from './components/UserTableComponent';
import ContactTrace from './components/ContactTracingComponent';
import BisAnalytics from './components/BisAnalyticsComponent';
import AddStaff from './components/AddStaffComponent'; 
import AllStaff from './components/AllStaffComponent'; 
import AssignTables from './components/AssignTablesComponent';
import BisDashboard from './components/BisDashboardComponent'; 
import AssignShift from './components/AssignShiftComponent'; 
import UserBooking from './components/UserBookingsComponent'; 
import ShiftDetails from './components/ShiftDetailsComponent'; 
import ContactTracing from './components/ContactTracingComponent'; 
import StaffContactTracing from './components/StaffContactTracingComponent'; 
import StaffDetails from './components/StaffDetailsComponent';
class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      businessUser: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();
    console.log("Current user ", user)
    console.log("User local storage", localStorage.getItem("user"))

    if (user) {
      this.setState({
        currentUser: user,
        businessUser: user.roles.includes("ROLE_BUSINESS"),
      });
    }
  }

  logOut() {
    AuthService.logout();
  }

  render() {
    const { currentUser, businessUser } = this.state;

    return (
      <div>
        <div>
          <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
            <Container>
            {businessUser && (
              <Navbar.Brand href={"/home"} bg="primary" variant="dark">{!currentUser ? <h2>book + eat</h2> : <h2>b+e</h2>}</Navbar.Brand>
            )}
            {!businessUser && (
              <Navbar.Brand href={"/home"} bg="primary" variant="dark">{!currentUser ? <h2>book + eat</h2> : <h2>b+e</h2>}</Navbar.Brand>
            )}
              
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav " >
                <Nav className="mr-auto"  >

                  {businessUser && (
                    <Nav className="mr-auto"  >
                      <Nav.Link href={"/bisDash"}>Home</Nav.Link>
                      <Nav.Link href={"/allUsers"}>Users</Nav.Link>
                      <Nav.Link href={"/allBookings"}>Bookings</Nav.Link>
                      <Nav.Link href={"/bisAnalytics"}>Analytics</Nav.Link>
                    </Nav>
                  )}
                  {businessUser && (
                    <NavDropdown title="Items" id="collasible-nav-dropdown">
                      <NavDropdown.Item href={"/addFoodItem"}>Add food</NavDropdown.Item>
                      <NavDropdown.Item href={"/addDrinkItem"}>Add drink</NavDropdown.Item>
                      <NavDropdown.Item href={"/allItems"}>View all</NavDropdown.Item>
                      {/* <NavDropdown.Divider />
                      <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item> */}
                    </NavDropdown>
                  )}
                  {businessUser && (
                    <NavDropdown title="Staff" id="collasible-nav-dropdown">
                      <NavDropdown.Item href={"/addStaff"}>Add a Staff member</NavDropdown.Item>
                      <NavDropdown.Item href={"/allStaff"}>View all staff</NavDropdown.Item>
                      <NavDropdown.Item href={"/shiftDetails"}>Add staff shift</NavDropdown.Item>
                      {/* <NavDropdown.Divider />
                      <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item> */}
                    </NavDropdown>
                    
                  )}
                  {businessUser && (
                    <NavDropdown title="Tables" id="collasible-nav-dropdown">
                      <NavDropdown.Item href={"/addTable"}>Add a table</NavDropdown.Item>
                      <NavDropdown.Item href={"/allTables"}>Manage tables/Capacity</NavDropdown.Item>
                      {/* <NavDropdown.Divider />
                      <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item> */}
                    </NavDropdown>
                    
                  )}
                   {businessUser && (
                    <NavDropdown title="Contact tracing" id="collasible-nav-dropdown">
                      <NavDropdown.Item href={"/contactTracing"}>Trace a customer</NavDropdown.Item> 
                      <NavDropdown.Item href={"/staffContactTracing"}>Trace staff</NavDropdown.Item>
                      {/* <NavDropdown.Divider />
                      <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item> */}
                    </NavDropdown>
                    
                  )}
                  {currentUser && !businessUser && (
                    <Nav className="mr-auto" >
                      <Nav.Link href={"/userHome"}>{currentUser.username} Profile</Nav.Link>
                      <Nav.Link href={"/addBooking"}>New Booking</Nav.Link>
                      <Nav.Link href={"/userBooking"} >Your Bookings</Nav.Link>
                    </Nav>
                  )}
                </Nav>
                {currentUser && (
                  <Nav className="ml-auto" >
                    
                    <Nav.Link href="/home" onClick={this.logOut}>Log out</Nav.Link>

                  </Nav>
                )}
                {!currentUser && (
                  <Nav className="ml-auto" >
                    <Nav.Link href={"/login"}>Login</Nav.Link>
                    <Nav.Link className="mr-sm-2" href={"/register"} >Sign up</Nav.Link>
                    <Nav.Link className="mr-sm-2" href={"/registerAdmin"} >Sign up admin</Nav.Link>
                  </Nav>
                )}
              </Navbar.Collapse>
            </Container>


          </Navbar>
        </div>



        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/home"]} component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/registerAdmin" component={registerAdmin} />
            <Route exact path="/userHome" component={UserHomeComponent} />
            <Route path="/user" component={BoardUser} />
            {/* <Route path="/bisMenu" component={BisUserGridComponent} /> */}
            <Route path="/addFoodItem" component={AddFood}></Route>
            <Route path="/addDrinkItem" component={AddDrink}></Route>
            <Route path="/allItems" component={AllItems}></Route>
            <Route path="/allBookings" component={AllBookings}></Route>
            <Route path="/allUsers" component={AllUsers}></Route>
            <Route path="/addBooking" component={AddBooking}></Route>
            <Route path="/addTable" component={AddTable}></Route>
            <Route path="/orderFood/:id" component={OrderFood}></Route>
            <Route path="/bookingSummary" component={BookingSummary}></Route>
            <Route path="/updateFood/:id" component={UpdateFood}></Route>
            <Route path="/updateDrink/:id" component={UpdateDrink}></Route>
            <Route path="/booksum/:id" component={BookingSum}></Route>
            <Route path="/allTables" component={Table}></Route>
            <Route path="/userTables" component={UserTable}></Route>
            <Route path="/contactTrace" component={ContactTrace}></Route>
            <Route path="/bisAnalytics" component={BisAnalytics}></Route>
            <Route path="/addStaff" component={AddStaff}></Route> AllStaff
            <Route path="/allStaff" component={AllStaff}></Route> 
            <Route path="/assignTables/:id" component={AssignTables}></Route> 
            <Route path="/bisDash" component={BisDashboard}></Route> 
            <Route path="/assignShift/:id" component={AssignShift}></Route>
            <Route path="/userBooking" component={UserBooking}></Route> 
            <Route path="/shiftDetails" component={ShiftDetails}></Route> 
            <Route path="/contactTracing" component={ContactTracing}></Route>  
            <Route path="/staffContactTracing" component={StaffContactTracing}></Route> StaffDetails
            <Route path="/staffDetails/:id" component={StaffDetails}></Route>
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
