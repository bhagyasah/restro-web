import React, { Component } from 'react';
import { Dialog, Button, Intent, Label, InputGroup, ControlGroup, Icon } from '@blueprintjs/core';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    console.log("value in password side",this.props);
    const { isOpen } = this.props;
    return (
      <Dialog
        icon="user"
        isCloseButtonShown
        transitionDuration={1000}
        lazy
        isOpen={isOpen}
        onClose={() => this.props.changePassword()}
        title="User Settings"
      >
        <div className="pt-dialog-body">
          <div className="user-setting">
            <div className="change-password" >
              <ControlGroup id="control-group" fill>
                <Button text="User Name" id="button" />
                <InputGroup leftIcon="people" placeholder="User Name..." />
              </ControlGroup>
              <ControlGroup id="control-group" fill>
                <Button text="Current Password" />
                <InputGroup placeholder="Name..." rightElement={<Icon id="icon" iconSize="20px" icon="eye-open" />} />
              </ControlGroup>
              <ControlGroup id="control-group" fill>
                <Button text="New Password" />
                <InputGroup placeholder="Name..." />
              </ControlGroup>
              <ControlGroup id="control-group" fill>
                <Button text="Confirm Password" />
                <InputGroup placeholder="Name..." />
              </ControlGroup>
            </div>
          </div>
        </div>
        <div className="pt-dialog-footer">
          <div className="pt-dialog-footer-actions">
            <Button
              intent={Intent.PRIMARY}
              onClick={this.props.changePassword}
              text="Submit"
            />
            <Button text="Cancel" intent={Intent.DANGER} onClick={this.props.changePassword} />
          </div>
        </div>
      </Dialog>
    );
  }
}

ChangePassword.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  changePassword: PropTypes.func.isRequired,
}
const mapStateToProps = state => state;
export default connect(mapStateToProps)(ChangePassword);
