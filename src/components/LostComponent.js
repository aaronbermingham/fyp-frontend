import React, { Component } from "react";
import { Col, Row } from "react-bootstrap";
import Image from "react-bootstrap/Image";

export default class HomeComponent extends Component {
  render() {
    return (
      <div>
        <Row>
          <Col>
            <Image
              src="./images/lost.svg"
              thumbnail
              style={{ border: "none", marginTop: "10%" }}
            />
          </Col>
          <Col>
            <h5 style={{ border: "none", marginTop: "50%" }}>
              You appear to be lost, let us help you back on the right path!
            </h5>
          </Col>
        </Row>
      </div>
    );
  }
}
