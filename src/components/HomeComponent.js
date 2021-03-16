import React, { Component } from "react";
import { Col, Row } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';

import UserService from "../services/UserService";

export default class HomeComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
  }

  componentDidMount() {
    UserService.getPublicContent().then(
      response => {
        this.setState({
          content: response.data
        });
      },
      error => {
        this.setState({
          content:
            (error.response && error.response.data) ||
            error.message ||
            error.toString()
        });
      }
    );
  }

  render() {
    return (
      <div className="container">

        <Row>
          <Col> <Image src='./images/dining.svg' thumbnail style={{ border: "none", marginTop: "10%" }} /></Col>
          <Col>
            <h3 style={{ border: "none", margin: "10%" }} >Welcome</h3>
            <ul className = "homeList">
              <li>Safe</li>
              <li>Preorder</li>
              <li>Peace of mind</li>
            </ul>

          </Col>


        </Row>

      </div>
    );
  }
}
