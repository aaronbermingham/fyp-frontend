import React, { Component } from "react";
import { Col, Row, Button } from "react-bootstrap";
import Image from "react-bootstrap/Image";

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
      header: {
        backgroundImage: "url(./images/table.jpg)",
        height: "80vh",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        opacity: "0.9",
      },

      content: {
        height: "100%",
        width: "100%",
        //backgroundColor: "rgba(0, 0, 0, 0.5)",
        color: "white",
      },
      centered: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        //textAlign: "center,",
        //color: "white",
      },
    };

    return (
      <div className="container">
        <Row>
          <Col>
            <div style={styles.header}>
              <Button size="lg" style={styles.centered} variant="outline-light">Login</Button>
            </div>
          </Col>
          <Col>Text</Col>
        </Row>
      </div>
    );
  }
}
