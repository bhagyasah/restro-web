import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropsTypes from 'prop-types';
import { Intent, Popover, Button, Icon, PopoverInteractionKind, Menu, MenuItem } from '@blueprintjs/core';
import ChangePassword from './ChangePassword';

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showChangePassword: false,
    };
  }
  changePassword = () => {
    this.setState({
      showChangePassword: !this.state.showChangePassword,
    });
  }
  popoverContent = (
    <Menu>
      <MenuItem icon="log-out" text="Log out" onClick={() => this.props.logOut()} />
      <MenuItem icon="cog" text="Change Password" onClick={this.changePassword} />
    </Menu>
    );
popoverTarget = (
  <div>
    <Icon icon="user" iconSize="60px" /><br />
    <Button intent={Intent.PRIMARY} disabled={false} type="button" class="pt-button">
      {`Welcome ${this.props.user.name}`}
      <span className="pt-icon-standard pt-icon-caret-down pt-align-right" />
    </Button>
  </div>);
render() {
  console.log("aoi in userprofile",this.props);
  return (
    <div>
      <Popover
        minimal={false}
        inheritDarkTheme
        className="popover-content"
        content={this.popoverContent}
        target={this.popoverTarget}
        interactionKind={PopoverInteractionKind.CLICK}
      />
      { this.state.showChangePassword && <ChangePassword
        user={this.props.user}
        isOpen={this.state.showChangePassword}
        changePassword={this.changePassword}
        api={this.props.api}
      /> }
    </div>
  );
}
}

UserProfile.propTypes = {
  user: PropsTypes.objectOf.isRequired,
  logOut: PropsTypes.func.isRequired,
};


export default connect()(UserProfile);
