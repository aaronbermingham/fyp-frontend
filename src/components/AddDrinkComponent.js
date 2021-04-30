import React, { Component } from "react";
import ItemService from "../services/ItemService";
import AuthService from "../services/AuthService";
import Lost from "./LostComponent";

class AddDrinkComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      description: "",
      price: "",
      alcoholByVolume: "",
      bisUser: false,
      currentUser: undefined,
    };
    this.changeNameHandler = this.changeNameHandler.bind(this);
    this.changeDescriptionHandler = this.changeDescriptionHandler.bind(this);
    this.changePriceHandler = this.changePriceHandler.bind(this);
    this.changeAbvHandler = this.changeAbvHandler.bind(this);
    this.createDrinkItem = this.createDrinkItem.bind(this);
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

  changeAbvHandler = (event) => {
    this.setState({ alcoholByVolume: event.target.value });
  };

  createDrinkItem = (e) => {
    e.preventDefault();
    let drinkItem = {
      name: this.state.name,
      description: this.state.description,
      price: this.state.price,
      alcoholByVolume: this.state.alcoholByVolume,
    };
    console.log("drinkItem " + JSON.stringify(drinkItem));
    ItemService.addDrinkItem(drinkItem).then((res) => {
      this.props.history.push("/allItems");
    });
  };

  componentDidMount() {
    const user = AuthService.getCurrentUser();
    console.log("Current user ", user);

    if (user) {
      this.setState({
        currentUser: user,
        businessUser: user.roles.includes("ROLE_BUSINESS"),
      });
    }
  }

  cancel() {
    this.props.history.push("/items");
  }

  render() {
    const { businessUser } = this.state;
    return (
      <div>
        {businessUser ? (
          <div className="container">
            <div className="row">
              <div className="card col-md-6 offset-md-3 offset-md-3">
                <h3 className="text-center">Add Drink item</h3>
                <div className="card-body">
                  <form>
                    <div className="form-group">
                      <label>Name</label>
                      <input
                        placeholder="Name"
                        name="name"
                        className="form-control"
                        value={this.state.name}
                        onChange={this.changeNameHandler}
                      />
                    </div>
                    <div className="form-group">
                      <label>Description</label>
                      <input
                        placeholder="Description"
                        name="description"
                        className="form-control"
                        value={this.state.description}
                        onChange={this.changeDescriptionHandler}
                      />
                    </div>
                    <div className="form-group">
                      <label>Price</label>
                      <input
                        placeholder="Price"
                        name="price"
                        className="form-control"
                        value={this.state.price}
                        onChange={this.changePriceHandler}
                      />
                    </div>
                    <div className="form-group">
                      <label>ABV</label>
                      <input
                        placeholder="Alcohol By Volume"
                        name="alcoholByVolume"
                        className="form-control"
                        value={this.state.alcoholByVolume}
                        onChange={this.changeAbvHandler}
                      />
                    </div>

                    <button
                      className="btn btn-success"
                      onClick={this.createDrinkItem}
                    >
                      Add item
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={this.cancel.bind(this)}
                      style={{ marginLeft: "10px" }}
                    >
                      Cancel
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <Lost />
        )}
      </div>
    );
  }
}

export default AddDrinkComponent;
