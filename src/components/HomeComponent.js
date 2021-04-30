import React, { Component } from "react";
import { Col, Row, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import UserService from "../services/UserService";

export default class HomeComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "",
    };
  }

  componentDidMount() {
    UserService.getPublicContent().then(
      (response) => {
        this.setState({
          content: response.data,
        });
      },
      (error) => {
        this.setState({
          content:
            (error.response && error.response.data) ||
            error.message ||
            error.toString(),
        });
      }
    );
  }

  render() {
    const styles = {
      content: {
        height: "100%",
        width: "100%",
        color: "white",
      },
      centered: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      },
    };

    return (
      <div>
        <Row>
          <Col>
            <div>
              <div className="container" style={{ borderRadius: "15px" }}>
                <img
                  style={{ borderRadius: "5px" }}
                  src="./images/table.jpg"
                  alt="Avatar"
                  className="image"
                />
                <div className="overlay">
                  {" "}
                  <Link to="/login">
                    <Button
                      className="forward"
                      size="lg"
                      style={styles.centered}
                      variant="outline-light"
                    >
                      Login
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </Col>
          <Col>
            <h3>
              <ul>
                <div className="slideIn first">&#8594; Book </div>
                <div className="slideIn second">&#8594; Order </div>
                <div className="slideIn third">&#8594; Eat</div>
              </ul>
            </h3>
          </Col>
        </Row>
      </div>
    );
  }
}
