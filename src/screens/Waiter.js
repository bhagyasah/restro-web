import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Icon } from '@blueprintjs/core';
import getRecords from '../reducers/getRecords';
import UserProfile from '../components/UserProfile';
import WaiterHome from '../components/WaiterHome';
import WaiterOrders from '../components/WaiterOrders';

class Waiter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showOrder: false,
      tableId: null,
    };
  }

contentHandler = (id) => {
  this.setState({
    showOrder: !this.state.showOrder,
    tableId: id,
  });
}

ArrowLeftIcon = (
  <Icon id="icon" icon="arrow-left" iconSize="40" onClick={this.contentHandler} />
);

render() {
  console.log(this.props);
  return (
    <div className="waiter">
      <div className="waiter-header">
        <div className="title">
          <h1>
            {this.state.showOrder ? this.ArrowLeftIcon : null}
            {`Fudo Cafe ${this.state.showOrder ? this.props.tables.find(table => table.id === this.state.tableId).name : ' '} `}
          </h1>
        </div>
        <div className="user-profile">
          <UserProfile api={this.props.api} logOut={this.props.onLogout} user={this.props.user} />
        </div>
      </div>
      {this.state.showOrder ? <WaiterOrders tableId={this.state.tableId} item={this.props.Item} api={this.props.api} /> : <WaiterHome switchToOrder={id => this.contentHandler(id)} /> }
    </div>
  );
}
}

const mapStateToProps = (state) => {
  return {
    tables: getRecords(state, { schema: 'Table' }),
    currentTableId: getRecords(state, { schema: 'CurrentTableId' }),
  };
};

Waiter.propTypes = {
  tables: PropTypes.arrayOf.isRequired,
  api: PropTypes.arrayOf.isRequired,
  Item: PropTypes.arrayOf.isRequired,
}

Waiter.propTypes = {
  onLogout: PropTypes.func.isRequired,
  user: PropTypes.objectOf.isRequired,
};
export default connect(mapStateToProps)(Waiter);
