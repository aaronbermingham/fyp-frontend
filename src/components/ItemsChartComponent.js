import React, { Component } from "react";
import { Bar } from "react-chartjs-2";
import ItemService from "../services/ItemService";
import AuthService from "../services/AuthService";

class ItemsChartComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: [],
      chartData: {
        labels: [],
        datasets: [
          {
            label: "",
            data: [],
            backgroundColor: [],
          },
        ],
      },
    };
  }

  test() {
    ItemService.getAllItems().then((res) => {
      this.setState({ item: res.data });
      console.log(
        "Item names change ",
        this.state.item.map((item) => item.name)
      );

      console.log(
        "Prices ",
        this.state.item.map((item) => item.price)
      );
    });
  }

  componentDidMount() {
    ItemService.getFoodItems().then((res) => {
      this.setState({ item: res.data });
      console.log(
        "Item names new ",
        this.state.item.map((item) => item.name)
      );
      console.log(
        "Stock new ",
        this.state.item.map((item) => item.stock)
      );
      this.setState({
        chartData: {
          labels: this.state.item.map((item) => item.name),
          datasets: [
            {
              label: "Food items sold",
              data: this.state.item.map((item) => item.amountSold),
              backgroundColor: [
                "rgba(54, 162, 235, 0.6)",
                "rgba(255, 206, 86, 0.6)",
                "rgba(75, 192, 192, 0.6)",
                "rgba(153, 102, 255, 0.6)",
                "rgba(255, 159, 64, 0.6)",
                "rgba(255, 99, 132, 0.6)",
              ],
            },
          ],
        },
      });
    });

    console.log(
      "Item names cdm ",
      this.state.item.map((item) => item.name)
    );

    console.log(
      "Prices cdm ",
      this.state.item.map((item) => item.name)
    );

    const user = AuthService.getCurrentUser();
    console.log("Current user ", user);
    if (user) {
      this.setState({
        currentUser: user,
        businessUser: user.roles.includes("ROLE_BUSINESS"),
      });
    }
  }

  render() {
    return (
      <div className="chart">
        <Bar
          data={this.state.chartData}
          options={{
            legend: {
              display: false,
            },
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                    precision: 0,
                    stepSize: 0,
                  },
                },
              ],
            },
            maintainAspectRatio: false,
          }}
        />
      </div>
    );
  }
}

export default ItemsChartComponent;
