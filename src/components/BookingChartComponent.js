import React, { Component } from "react";
import { Line } from "react-chartjs-2";
import BookingService from "../services/BookingService";
import AuthService from "../services/AuthService";

class BookingChartComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookings: [],
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
    BookingService.lastSevenDays().then((res) => {
      this.setState({ bookings: res.data });
      console.log("Booking days new ", this.state.bookings);
      let unique = [...new Set(this.state.bookings)];
      let bookingDays = unique.map((day) => [
        day,
        this.state.bookings.filter((str) => str === day).length,
      ]);
      console.log(bookingDays);
      this.setState({
        chartData: {
          labels: bookingDays.map((days) => days[0]),
          datasets: [
            {
              label: "Bookings over the last seven days",
              data: bookingDays.map((days) => days[1]),
              fill: false,
              backgroundColor: "rgb(255, 99, 132)",
              borderColor: "rgba(56, 56, 56, 0.6)",
            },
          ],
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
        <Line
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

export default BookingChartComponent;
