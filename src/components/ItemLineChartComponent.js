import React, { Component } from "react";
import { Bar } from "react-chartjs-2";
import BookingService from "../services/BookingService";
import AuthService from "../services/AuthService";

class ItemLineChartComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      chartData: {
        datasets: [
          {
            labels: [],
            label: "",
            data: [],
            backgroundColor: [],
          },
        ],
      },
    };
  }

  componentDidMount() {
    BookingService.itemsSevenDays().then((res) => {
      this.setState({ items: res.data });
      console.log("Booking days new ", this.state.items);
      let unique = [...new Set(this.state.items)];
      let itemDays = unique.map((item) => [
        item,
        this.state.items.filter((str) => str === item).length,
      ]);
      console.log("ZAG ", itemDays);
      this.setState({
        chartData: {
          labels: itemDays.map((items) => items[0]),
          datasets: [
            {
              label: "Item orders over the last seven days",
              data: itemDays.map((items) => items[1]),
              fill: false,
              backgroundColor: [
                "rgba(54, 162, 235, 0.6)",
                "rgba(255, 206, 86, 0.6)",
                "rgba(75, 192, 192, 0.6)",
                "rgba(153, 102, 255, 0.6)",
                "rgba(255, 159, 64, 0.6)",
                "rgba(255, 99, 132, 0.6)",
                "rgba(54, 162, 235, 0.6)",
                "rgba(255, 206, 86, 0.6)",
                "rgba(75, 192, 192, 0.6)",
                "rgba(153, 102, 255, 0.6)",
                "rgba(255, 159, 64, 0.6)",
                "rgba(255, 99, 132, 0.6)",
              ],
              // borderColor: 'rgba(56, 56, 56, 0.6)',
            },
          ],
        },
        options: {
          legend: {
            display: false,
          },
        },
      });
    });

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

export default ItemLineChartComponent;
