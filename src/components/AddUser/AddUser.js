import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Grid,
  Paper,
  TextField,
  Button,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  withStyles,
} from "@material-ui/core";
import { ChevronLeft } from "@material-ui/icons";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const styles = (theme) => ({
  paper: {
    padding: theme.spacing(2),
    borderRadius: "5px",
    height: "fit-content",
    width: "fit-content",
  },
});

class AddUser extends Component {
  state = {
    fname: "",
    lname: "",
    email: "",
    phone: "",
    privileges: "",
  };

  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  };

  handleAddUser = () => {
    if (
      this.state.fname &&
      this.state.lname &&
      this.state.email &&
      this.state.phone &&
      this.state.privileges !== ""
    ) {
      const actionObject = {
        fname: this.state.fname,
        lname: this.state.lname,
        email: this.state.email,
        phone: this.state.phone,
        privileges: this.state.privileges,
        orgId: this.props.reduxState.organization.id,
      };
      console.log(actionObject);
      // Double check the type
      this.props.dispatch({ type: "ADD_USER", payload: actionObject });
    } else {
      alert("enter required information");
    }
  };

  render() {
    const { classes } = this.props;

    let centerText = {
      // paddingLeft: "15px",
      textAlign: "center",
      color: "black",
      fontFamily: "Crimson Text, Open Sans, sans-serif",
      width: "515px",
    };

    let header = {
      border: "solid #e3e3e3 2px",
      maxWidth: "515px",
      height: "125px",
      display: "flex",
      borderRadius: "5px",
    };

    let buttons = {
      display: "flex",
      width: "515px",
      justifyContent: "space-between",
      align: "center",
      marginTop: "20px",
      marginLeft: "30px",
    };

    let textFields = {
      fontFamily: "Crimson Text",
      minWidth: "100px",
      margin: "5px",
    };

    return (
      <Grid
        container
        justify="center"
        alignContent="center"
        alignItems="center"
        style={{
          minHeight: "75vh",
          minWidth: "100vw",
        }}
      >
        <Grid item xs={8} style={{ maxWidth: "1000px" }} align="center">
          <Paper className={classes.paper} elevation={3}>
            <div style={header}>
              <div style={centerText}>
                <div>
                  <h1>New Users</h1>
                </div>
                <div>
                  <h3>
                    Users can view or edit device information on ZEFNET Portal
                  </h3>
                </div>
              </div>
            </div>
            <form
              style={{
                background: "transparent",
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                width: "inherit",
                padding: "0px",
                height: "fit-content",
              }}
            >
              <div>
                <TextField
                  required
                  color="secondary"
                  style={textFields}
                  label="First Name:"
                  margin="normal"
                  variant="outlined"
                  value={this.state.fname || ""}
                  onChange={this.handleInputChangeFor("fname")}
                />
              </div>
              <div>
                <TextField
                  color="secondary"
                  required
                  style={textFields}
                  label="Last Name"
                  margin="normal"
                  variant="outlined"
                  value={this.state.lname || ""}
                  onChange={this.handleInputChangeFor("lname")}
                />
              </div>
              <div>
                <TextField
                  color="secondary"
                  required
                  style={textFields}
                  label="Email"
                  margin="normal"
                  variant="outlined"
                  value={this.state.email || ""}
                  onChange={this.handleInputChangeFor("email")}
                />
              </div>
              <div>
                <TextField
                  color="secondary"
                  required
                  style={textFields}
                  label="Phone"
                  margin="normal"
                  variant="outlined"
                  value={this.state.phone || ""}
                  onChange={this.handleInputChangeFor("phone")}
                />
              </div>
              <div>
                {/* <Select
                  color="secondary"
                  required
                  style={textFields}
                  label="Privileges"
                  margin="normal"
                  variant="outlined"
                  value={this.state.privileges}
                  onChange={this.handleInputChangeFor("privileges")}
                /> */}
                <FormControl variant="outlined">
                  <InputLabel>Choose From Existing</InputLabel>
                  <Select
                    value={this.state.selectedPrivileges || ""}
                    onChange={this.handleChange}
                    label="Breaker"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {/*Map out all breakers stored in reducer*/}

                    {/* {
                                    this.state.breakers.map((breaker, index)=>
                                    <MenuItem value={breaker} key={breaker.id}>
                                        <span style={{backgroundColor: '#b2ff59'}}>Amps:{breaker.limit} </span> {breaker.name}</MenuItem>
                                )} */}
                  </Select>
                </FormControl>
              </div>
              <div style={buttons}>
                <div>
                  <Button
                    variant="contained"
                    color="default"
                    component={Link}
                    to="/organizationHome"
                  >
                    <ChevronLeft /> Home
                  </Button>
                </div>

                <div>
                  <Button
                    variant="contained"
                    color="default"
                    onClick={this.handleAddUser}
                    style={{ width: "131px" }}
                  >
                    Add User
                  </Button>
                </div>
              </div>
            </form>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

// Instead of taking everything from state, we just want the user info.
const mapStateToProps = (reduxState) => ({
  reduxState,
});

AddUser.propTypes = {
  classes: PropTypes.object.isRequired,
};

// this allows us to use <App /> in index.js
export default withStyles(styles)(connect(mapStateToProps)(AddUser));
