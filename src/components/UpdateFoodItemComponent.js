import React, { Component } from "react";
import ItemService from "../services/ItemService";
import AuthService from "../services/AuthService";
import Lost from "./LostComponent";

class UpdateFoodItemComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      name: "",
      description: "",
      price: "",
      ingredients: "",
      allergens: "",
    };
    this.changeNameHandler = this.changeNameHandler.bind(this);
    this.changeDescriptionHandler = this.changeDescriptionHandler.bind(this);
    this.changePriceHandler = this.changePriceHandler.bind(this);
    this.changeIngredientHandler = this.changeIngredientHandler.bind(this);
    this.changeAllergenHandler = this.changeAllergenHandler.bind(this);
    this.updateFoodItem = this.updateFoodItem.bind(this);
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
    ItemService.getFoodById(this.state.id).then((res) => {
      let foodItem = res.data;
      this.setState({
        name: foodItem.name,
        description: foodItem.description,
        price: foodItem.price,
        ingredients: foodItem.ingredients,
        allergens: foodItem.allergens,
      });
    });
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
    console.log("foodItem " + JSON.stringify(foodItem));
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
          <div className="container">
            <div className="row">
              <div className="card col-md-6 offset-md-3 offset-md-3">
                <h3 className="text-center">Update food item</h3>
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
                      <label>Ingredients</label>
                      <input
                        placeholder="Ingredients"
                        name="ingredients"
                        className="form-control"
                        value={this.state.ingredients}
                        onChange={this.changeIngredientHandler}
                      />
                    </div>
                    <div className="form-group">
                      <label>Allergens</label>
                      <input
                        placeholder="Allergens"
                        name="allergens"
                        className="form-control"
                        value={this.state.allergens}
                        onChange={this.changeAllergenHandler}
                      />
                    </div>

                    <button
                      className="btn btn-success"
                      onClick={this.updateFoodItem}
                    >
                      Update item
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

export default UpdateFoodItemComponent;
