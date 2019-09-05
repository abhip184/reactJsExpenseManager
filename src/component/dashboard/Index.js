import React from "react";

const Index = ({ props }) => {
  console.log(props);
  return (
    <div>
      <div className="section no-pad-bot" id="index-banner">
        <div className="container">
          <br></br>
          <h1 className="header center orange-text">Expense Manager</h1>
          <div className="row center">
            <h5 className="header col s12 light">
              A modern cool tool to manage you Expense
            </h5>
          </div>
          <div className="row center">
            <a
              href="/signup"
              id="download-button"
              className="btn-large waves-effect waves-light orange"
            >
              Sign Up
            </a>
          </div>
          <br></br>
        </div>
      </div>

      <div className="container">
        <div className="section">
          <div className="row">
            <div className="col s12 m4">
              <div className="icon-block">
                <h2 className="center light-blue-text">
                  <i className="material-icons">flash_on</i>
                </h2>
                <h5 className="center">Instant transection</h5>

                <p className="light">
                  Add and remove transection is easy. it's very quick to perform
                  transection. it will make transections quicker and faster
                  ever. collobrate with your friends to get more from Expense
                  manager
                </p>
              </div>
            </div>

            <div className="col s12 m4">
              <div className="icon-block">
                <h2 className="center light-blue-text">
                  <i className="material-icons">group</i>
                </h2>
                <h5 className="center">User Experience Focused</h5>

                <p className="light">
                  By utilizing elements and principles of Material Design, we
                  were able to create a framework that incorporates components
                  and animations that provide more feedback to users.
                  Additionally, a single underlying responsive system across all
                  platforms allow for a more unified user experience.
                </p>
              </div>
            </div>

            <div className="col s12 m4">
              <div className="icon-block">
                <h2 className="center light-blue-text">
                  <i className="material-icons">settings</i>
                </h2>
                <h5 className="center">Easy to work with</h5>

                <p className="light">
                  We have provided detailed navigation as well as specific
                  Account control to help new users get started. We are also
                  always open to feedback and can answer any questions a user
                  may have about Expense manager.
                </p>
              </div>
            </div>
          </div>
        </div>
        <br></br>
      </div>
    </div>
  );
};

export default Index;
