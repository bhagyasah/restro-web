import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Intent } from '@blueprintjs/core';
import { connect } from 'react-redux';

class MenuItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  curentOrderHandler = (menuItemId, todo) => () => {
    this.props.currentOrder({
      rate: this.props.menuItems.find(menuItem => menuItem.id === menuItemId).price, menuItemId, qty: 1, todo,
    });
  }

  render() {
    return (
      this.props.menuItems.map(item => (
        <div className="item-element">
          <div className="item-minus">
            <Button
              intent={Intent.PRIMARY}
              icon="remove"
              onClick={this.curentOrderHandler(item.id, 'minus')}
            />
          </div>
          <div className="item-name">
            {item.name}
          </div>
          <div className="item-plus">
            <Button
              intent={Intent.PRIMARY}
              onClick={this.curentOrderHandler(item.id, 'plus')}
              icon="add" />
          </div>
        </div>
      ))
    );
  }
}

MenuItem.propTypes = {
  menuItems: PropTypes.arrayOf.isRequired,
  currentOrder: PropTypes.func.isRequired,
};
const mapStateToProps = (state, ownProps) => {
  return {
    menuItems: state.schema.MenuItem.filter(item => item.itemId === ownProps.itemId),
  };
};

export default connect(mapStateToProps)(MenuItem);
