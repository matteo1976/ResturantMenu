import React, { Component } from "react";

import Grid from "@material-ui/core/Grid";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import "./App.css";
import Courses from "./component/courses";
import { COURSES, STEPS } from "./constants";
import logo from "./img/logo.jpg";
import Dialog from "@material-ui/core/Dialog";

export default class App extends Component {
  state = {
    activeStep: STEPS.START,
    coursesSelected: [],
    openAlert: false
  };

  alertStyle = {
    textAlign: "center",
    width: "50%",
    margin: "auto",
    marginBottom: "1em"
  };

  menageCourses = id => {
    let { coursesSelected } = this.state;
    if (coursesSelected.indexOf(id) === -1) {
      coursesSelected.push(id);
      this.setState({ coursesSelected });
    } else coursesSelected.splice(coursesSelected.indexOf(id), 1);
    this.setState({ coursesSelected });
  };

  handleReset = () => {
    this.setState({ activeStep: STEPS.START, coursesSelected: [] });
  };

  handleClose = () => {
    this.setState({ openAlert: false });
  };

  handleNext = () => {
    let { coursesSelected } = this.state;
    let actualStep = this.state.activeStep;
    if ((actualStep === STEPS.MAIN_COURSE) & (coursesSelected.length === 0)) {
      this.setState({ openAlert: true });
    } else {
      this.setState({ activeStep: actualStep + 1 });
    }
  };

  handleBack = () => {
    let actualStep = this.state.activeStep;
    this.setState({ activeStep: actualStep - 1 });
  };

  getStepContent = stepIndex => {
    switch (stepIndex) {
      case STEPS.APPETITAIZER:
        return COURSES.APPETITAIZER;
      case STEPS.SOUP:
        return COURSES.SOUP;
      case STEPS.FISH:
        return COURSES.FISH;
      case STEPS.SALAD:
        return COURSES.SALAD;
      case STEPS.MAIN_COURSE:
        return COURSES.MAIN_COURSE;
      case STEPS.DESSERT:
        return COURSES.DESSERT;
      case STEPS.MENU:
        return COURSES.MENU;

      default:
        return "Uknown stepIndex";
    }
  };

  render() {
    const steps = [
      COURSES.APPETITAIZER,
      COURSES.SOUP,
      COURSES.FISH,
      COURSES.SALAD,
      COURSES.MAIN_COURSE,
      COURSES.DESSERT
    ];

    const { activeStep, coursesSelected } = this.state;
    return (
      <div className="App">
        <Grid container spacing={3}>
          <Grid item xs={1}>
            <img src={logo} width="150px" height="auto" alt="Logo Resturant" />
          </Grid>
          <Grid className="App-header" item xs={10}>
            <span>Menu</span>
            <Typography className="instructions">
              {this.getStepContent(this.activeStep)}
            </Typography>
          </Grid>

          <Grid className="stepper" item xs={12}>
            <Grid
              container
              alignItems={"center"}
              direction={"row"}
              justify={"center"}
            >
              <Stepper
                style={{ margin: "auto", width: "90%" }}
                activeStep={activeStep}
                alternativeLabel
              >
                {steps.map(label => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>{" "}
            </Grid>
          </Grid>
        </Grid>
        <div style={{ width: "70%", margin: "auto" }}>
          <Courses
            courseStep={activeStep}
            coursesSelected={coursesSelected}
            addCourses={this.menageCourses}
          />
        </div>
        <div />
        <div className="stepControl">
          {(() => {
            switch (activeStep) {
              case STEPS.START:
                return (
                  <div className="App">
                    <img src={logo} alt="Logo Resturant" />
                    <h3>Welcome to Resturant</h3>
                    <h5>start to select your menu</h5>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={this.handleNext}
                    >
                      START
                    </Button>
                  </div>
                );
              case STEPS.FINISH:
                return (
                  <div>
                    <Typography className="instructions">
                      <p>
                        <h2>This is your menu.</h2>
                        Thank you for choosing Resturant
                      </p>
                    </Typography>
                    <Button onClick={this.handleReset}>Reset</Button>
                  </div>
                );
              default:
                return (
                  <div>
                    <Button
                      disabled={activeStep === 0}
                      onClick={this.handleBack}
                      className="backButton"
                    >
                      Back
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={this.handleNext}
                    >
                      {activeStep === steps.length - 1 ? "Finish" : "Next"}
                    </Button>
                  </div>
                );
            }
          })()}
        </div>
        <Dialog
          open={this.state.openAlert}
          onClose={this.handleClose}
          aria-labelledby="simple-dialog-title"
        >
          <div style={{ textAlign: "center", with: "90%" }}>
            <h2>Alert!</h2>
          </div>
          <div style={this.alertStyle}>
            You have to select one or more Main Courses
          </div>
        </Dialog>
      </div>
    );
  }
}
