import React, { Component } from "react";
import { Col, Row, Button } from "react-bootstrap";
import Image from "react-bootstrap/Image";
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
        //backgroundColor: "rgba(0, 0, 0, 0.5)",
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
      <div className="container">
        <Row>
          <Col>
            <div className="homeImage">
              <img
                fluid
                src="./images/table.jpg"
                alt="table_image"
                width="500"
                height="335"
                border="0"
              />
              <Link to="/login">
                <Button
                  size="lg"
                  style={styles.centered}
                  variant="outline-light"
                >
                  Login
                </Button>
              </Link>
            </div>
          </Col>
          <Col>
            <h3 >
              <ul>
                <div className="slideIn first" >&#8594; Book </div>
                <div className="slideIn second">&#8594; Order </div>
                <div className="slideIn third" >&#8594; Eat</div>
                {/* <div className="slideIn fourth">&#8594; Eat</div> */}
              </ul>
               
            </h3>
          </Col>
        </Row>
      </div>
    );
  }
}
