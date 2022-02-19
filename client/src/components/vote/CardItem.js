import React, { Component } from "react";
import { Card, Badge } from "react-bootstrap";
import ReactCardFlip from "react-card-flip";
import dataDrivers from "../../data/data_drivers.json";
import ModalContainer from "../modal/ModalContainer";
class CardItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFlipped: false,
    };
  }

  imagePicker = (id, defaultVal) => {
    const x = dataDrivers.filter((el) => el.id === id);
    try {
      return x[0].img;
    } catch (e) {
      return defaultVal;
    }
  };

  handleClick = (e) => {
    e.preventDefault();
    this.setState({ isFlipped: !this.state.isFlipped });
  };

  render() {
    return (
      <ReactCardFlip isFlipped={this.state.isFlipped}>
        <Card
          style={{
            border: "none",
          }}
          className="bg-secondary card-front"
        >
          <span className="span one"></span>
          <span className="span two"></span>
          <span className="span three"></span>
          <span className="span four"></span>
          <Card.Img
            className="img align-self-center"
            variant="top"
            src={`${this.imagePicker(
              this.props.driver.driverId,
              "https://www.formula1.com/content/dam/fom-website/drivers/A/ANTGIO01_Antonio_Giovinazzi/antgio01.png.transform/2col/image.png"
            )}`}
          />
          <Card.Body>
            <Card.Text className="text-white d-flex justify-content-between">
              <span className="driver-name">{`${this.props.driver.GivenName} ${this.props.driver.FamilyName}`}</span>
              <Badge
                pill
                variant="light"
                className="py-1 px-2 align-self-center btn"
                onClick={this.handleClick}
              >
                Stats
              </Badge>
              <Badge
                pill
                variant="light"
                className="py-1 px-2 align-self-center btn vote-btn"
              >
              <ModalContainer
                id={this.props.driver.driverId}
                name={`${this.props.driver.GivenName} ${this.props.driver.FamilyName}`}
                triggerText="Rate him!"
                path="vote"
              />
              </Badge>
            </Card.Text>
          </Card.Body>
        </Card>
        <Card
          style={{
            border: "none",
          }}
          className="bg-secondary"
        >
          <Card.Body className="d-flex flex-column justify-content-center align-items-center">
            <Card.Text className="text-white">
              Season: {new Date().getFullYear()}
            </Card.Text>
            <Card.Text className="text-white">
              Team: {this.props.constructor.Name}
            </Card.Text>
            <Card.Text className="text-white">
              Ranking: {this.props.stats.position}
            </Card.Text>
            <Card.Text className="text-white">
              Wins: {this.props.stats.wins}
            </Card.Text>
            <Card.Text className="text-white">
              Points: {this.props.stats.points}
            </Card.Text>
            <Badge
              pill
              variant="light"
              className="py-1 px-2 align-self-center btn"
              onClick={this.handleClick}
            >
              Go Back
            </Badge>
          </Card.Body>
        </Card>
      </ReactCardFlip>
    );
  }
}

export default CardItem;
