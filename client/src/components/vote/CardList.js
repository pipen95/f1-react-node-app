import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchStats } from "../redux/actions/fetchStats";
import CardItem from "./CardItem";

class CardList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFlipped: false,
      isLoading: true,
    };
  }

  componentDidMount() {
    const stopLoading = () => {
      const el = document.querySelector(".loader-container");
      if (el) {
        el.remove(); // removing the spinner element
        // showing the app
        this.setState({ isLoading: false });
      }
    };
    this.props.fetchStats(stopLoading);
  }

  render() {
    const driversItems = this.props.drivers.drivers.map((driver, idx) => (
      <CardItem
        stats={driver}
        driver={driver.Driver}
        idx={idx}
        key={idx}
        constructor={driver.Constructor}
      />
    ));

    if (this.state.isLoading) {
      return null; //app is not ready (fake request is in process)
    }

    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          flexWrap: "wrap",
        }}
      >
        {driversItems}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  drivers: state.drivers,
});

export default connect(mapStateToProps, { fetchStats })(CardList);
