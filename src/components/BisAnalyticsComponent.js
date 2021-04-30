import React, { Component } from "react";
import AuthService from "../services/AuthService";
import ItemsChart from "../components/ItemsChartComponent";
import BookingChart from "../components/BookingChartComponent";
import ItemLineChart from "../components/ItemLineChartComponent";
import { Row, Container, Card, Col } from "react-bootstrap";

class BisAnalyticsComponent extends Component {
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

  render() {
    return (
      <div className="chart">
        <Container>
          <Row>
            <Col xs={12} md={20}>
              <Card border="warning">
                <Card.Body>
                  <Card.Title>
                    <h4 className="text-center">Items sold</h4>
                  </Card.Title>
                  <Card.Text>
                    <div>
                      <ItemsChart />
                    </div>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={20}>
              <Card border="dark">
                <Card.Body>
                  <Card.Title>
                    <h4 className="text-center">Last seven days of bookings</h4>
                  </Card.Title>
                  <Card.Text>
                    <div>
                      <BookingChart />
                    </div>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={20}>
              <Card border="dark">
                <Card.Body>
                  <Card.Title>
                    <h4 className="text-center">
                      Items sold over the last seven days
                    </h4>
                  </Card.Title>
                  <Card.Text>
                    <div>
                      <ItemLineChart />
                    </div>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default BisAnalyticsComponent;
