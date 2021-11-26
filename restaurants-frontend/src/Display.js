import React from "react";
import { ImSearch } from "react-icons/im";
import Switch from "react-switch";

import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import { IoArrowUpSharp, IoArrowDownSharp } from "react-icons/io5";

import getHotels from "./getHotels";

import "./style.css";

/** Inline Styles for the Card Details */
const styles = (muiBaseTheme) => ({
  card: {
    width: 300,
    margin: 10,
    transition: "0.3s",
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
    "&:hover": {
      boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)",
    },
  },
  content: {
    textAlign: "left",
    padding: muiBaseTheme.spacing.unit * 3,
  },
  divider: {
    margin: `${muiBaseTheme.spacing.unit * 3}px 0`,
  },
  heading: {
    fontWeight: "bold",
  },
  subheading: {
    lineHeight: 1.8,
  },
  avatar: {
    display: "inline-block",
    border: "2px solid white",
    "&:not(:first-of-type)": {
      marginLeft: -muiBaseTheme.spacing.unit,
    },
  },
});

/** Common sort functions */
const sortTypes = {
  up: {
    class: "up",
    fn: (a, b) => a.rating - b.rating,
  },
  down: {
    class: "down",
    fn: (a, b) => b.rating - a.rating,
  },
  default: {
    class: "default",
    fn: (a, b) => a,
  },
};

class DisplayHotles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchString: "",
      checked: false,
      displayDetails: [],
      currentSort: "default",
    };
  }

  /** handles the check and uncheck for category */
  handleChange = (checked) => {
    this.setState({ checked });
  };

  /** handles the search for the Hotel Name */
  handleSearch = (e) => {
    this.setState({ searchString: e.target.value });
  };

  /** handles sorting functions for the rating */
  onSortChange = () => {
    const { currentSort } = this.state;
    let nextSort;

    if (currentSort === "down") nextSort = "up";
    else if (currentSort === "up") nextSort = "default";
    else if (currentSort === "default") nextSort = "down";

    this.setState({
      currentSort: nextSort,
    });
  };

  /** get the hotesl list form the database */
  async componentDidMount() {
    const result = await getHotels();
    this.setState({
      displayDetails: result.data.list,
    });
  }
  render() {
    let libraries = this.state.displayDetails,
      searchString = this.state.searchString.trim().toLowerCase();
    if (searchString.length > 0) {
      libraries = libraries.filter(function (i) {
        return i.name.toLowerCase().match(searchString);
      });
    }

    if (this.state.checked) {
      libraries = libraries.filter(function (i) {
        return i.category.toLowerCase().match("non-veg");
      });
    } else {
      libraries = libraries.filter(function (i) {
        if (i.category === "veg") return i;
      });
    }

    return (
      <div>
        <div>
          <h1 className="heading-text">RESTAURANTS SEARCH</h1>
        </div>
        <div className="filterList">
          <div className="serach-list">
            <ImSearch className="input-icon" />
            <input
              type="text"
              placeholder="Search by Hotel "
              onChange={this.handleSearch}
            />
          </div>

          <br />
          <br />
          <div className="checkbox">
            <span className="sub-head">
              {this.state.checked ? "Non Veg" : "Veg"}
            </span>
            <Switch onChange={this.handleChange} checked={this.state.checked} />
          </div>
          <br />
          <div className="checkbox">
            <label className="sort sub-head" onClick={this.onSortChange}>
              Sort By Rating
            </label>
            {this.state.currentSort === "down" && (
              <IoArrowUpSharp className="sort-icon" />
            )}
            {this.state.currentSort === "up" && (
              <IoArrowDownSharp className="sort-icon" />
            )}
          </div>
        </div>

        <div className="list">
          {[...libraries]
            .sort(sortTypes[this.state.currentSort].fn)
            .map((d) => (
              <Card className={this.props.classes.card}>
                <div className="card-media">
                  <CardMedia
                    component="img"
                    className={this.props.classes.media}
                    image={
                      "https://www.google.com/imgres?imgurl=https%3A%2F%2Fmedia.istockphoto.com%2Fphotos%2Fdowntown-cleveland-hotel-entrance-and-waiting-taxi-cab-picture-id472899538%3Fb%3D1%26k%3D20%26m%3D472899538%26s%3D170667a%26w%3D0%26h%3DoGDM26vWKgcKA3ARp2da-H4St2dMEhJg23TTBeJgPDE%3D&imgrefurl=https%3A%2F%2Funsplash.com%2Fs%2Fphotos%2Fhotel&tbnid=JHJpzVwWW0xL5M&vet=12ahUKEwiOk9u0t7T0AhVpm0sFHTQ-BXEQMygAegUIARDNAQ..i&docid=iMEQ4vPywWmruM&w=509&h=339&itg=1&q=hotel%20images&ved=2ahUKEwiOk9u0t7T0AhVpm0sFHTQ-BXEQMygAegUIARDNAQ"
                    }
                    alt={"No Images Found"}
                  />
                </div>
                <CardContent className={this.props.classes.content}>
                  <Typography
                    className={"MuiTypography--heading hotel-name"}
                    variant={"h5"}
                    gutterBottom
                  >
                    {`${d.name}`}
                  </Typography>
                  <p className={"subheading"}>{`${d.category}`}</p>
                  <p className={"subheading"}>{`${d.city}`}</p>
                  <Divider className={this.props.classes.divider} light />
                  <p className={"rating"}>Rating : {d.rating} </p>
                </CardContent>
              </Card>
            ))}
        </div>
      </div>
    );
  }
}

const WrappedApp = withStyles(styles)(DisplayHotles);

export default WrappedApp;
