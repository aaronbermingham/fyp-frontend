import React, { Component } from 'react'
import ItemService from '../services/ItemService'
import AuthService from "../services/AuthService";
import Lost from './LostComponent';



class AllItemsComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            item: [],
            drinkItem: [],
            bisUser: false,
            currentUser: undefined,

        }


    }

    componentDidMount() {
        ItemService.getFoodItems().then((res) => {
            this.setState({ item: res.data });
        });
        ItemService.getDrinkItems().then((res) => {
            this.setState({ drinkItem: res.data });
        });
        const user = AuthService.getCurrentUser();
        console.log("Current user ", user)

        if (user) {
            this.setState({
                currentUser: user,
                businessUser: user.roles.includes("ROLE_BUSINESS"),
            });
        }
    }

    updateFoodItem(id) {
        this.props.history.push(`/updateFood/${id}`);
    }

    updateDrink(id) {
        this.props.history.push(`/updateDrink/${id}`);
    }

    render() {
        const { businessUser } = this.state;
        return (
            <div>{businessUser ? (
                <div>
                    <h3 className="text-center">Food items</h3>
                    <div className="row">
                        <table className="table table-striped table-bordered">
                            <thead>
                                <tr>
                                    {/* <th>Item id</th> */}
                                    <th>Item Name</th>
                                    <th>Description</th>
                                    <th>Price</th>
                                    <th>Ingredients</th>
                                    <th>Allergens</th>
                                    <th>Update</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    this.state.item.map(
                                        item =>
                                            <tr key={item.id}>
                                                <td>{item.name}</td>
                                                <td>{item.description}</td>
                                                <td>{item.price}</td>
                                                <td>{item.ingredients}</td>
                                                <td>{item.allergens}</td>
                                                <td><button onClick={() => this.updateFoodItem(item.id)} className="btn btn-info" >Update</button></td>

                                            </tr>
                                    )
                                }
                            </tbody>

                        </table>
                    </div>
                    <h3 className="text-center">Drink Items</h3>
                    <div className="row">
                        <table className="table table-striped table-bordered">
                            <thead>
                                <tr>
                                    {/* <th>Item id</th> */}
                                    <th>Item Name</th>
                                    <th>Description</th>
                                    <th>Price</th>
                                    <th>ABV</th>
                                    <th>Update</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    this.state.drinkItem.map(
                                        drinkItem =>
                                            <tr key={drinkItem.id}>
                                                <td>{drinkItem.name}</td>
                                                <td>{drinkItem.description}</td>
                                                <td>{drinkItem.price}</td>
                                                <td>{drinkItem.alcoholByVolume}</td>
                                                <td><button onClick={() => this.updateDrink(drinkItem.id)} className="btn btn-info" >Update</button></td>


                                            </tr>
                                    )
                                }
                            </tbody>

                        </table>
                    </div>
                </div>) : <Lost />}
            </div>

        )

    }
}


export default AllItemsComponent