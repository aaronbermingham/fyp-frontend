import axios from "axios";
import authHeader from "./AuthHeader";

const ITEM_API_BASE_URL = "http://localhost:8080/api/";

class ItemService {
  getFoodItems() {
    return axios.get(ITEM_API_BASE_URL + "food/foodItems", {
      headers: authHeader(),
    });
  }

  addFoodItem(foodItem) {
    return axios.post(ITEM_API_BASE_URL + "food/addFoodItem", foodItem, {
      headers: authHeader(),
    });
  }

  getFoodById(foodItemId) {
    return axios.get(ITEM_API_BASE_URL + "food/foodItemById/" + foodItemId, {
      headers: authHeader(),
    });
  }

  updateFoodItem(foodItem, foodItemId) {
    return axios.put(
      ITEM_API_BASE_URL + "food/updateFoodItem/" + foodItemId,
      foodItem,
      { headers: authHeader() }
    );
  }

  getDrinkItems() {
    return axios.get(ITEM_API_BASE_URL + "drink/drinkItems", {
      headers: authHeader(),
    });
  }

  addDrinkItem(drinkItem) {
    return axios.post(ITEM_API_BASE_URL + "drink/addDrinkItem", drinkItem, {
      headers: authHeader(),
    });
  }

  getDrinkById(drinkItemId) {
    return axios.get(ITEM_API_BASE_URL + "drink/drinkItemById/" + drinkItemId, {
      headers: authHeader(),
    });
  }

  updateDrinkItem(drinkItem, drinkItemId) {
    return axios.put(
      ITEM_API_BASE_URL + "drink/updateDrinkItem/" + drinkItemId,
      drinkItem,
      { headers: authHeader() }
    );
  }

  getAllItems() {
    return axios.get(ITEM_API_BASE_URL + "auth/item/all", {
      headers: authHeader(),
    });
  }
}

export default new ItemService();
