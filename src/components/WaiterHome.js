import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import getRecords from './../reducers/getRecords';
import Table from './Table';


class WaiterHome extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="waiter-body">
        {this.props.tables.map(t => (<Table id={t.id} name={t.name} switchToOrder={this.props.switchToOrder} />)) }
      </div>
    );
  }
}

WaiterHome.propTypes = {
  switchToOrder: PropTypes.func.isRequired,
  tables: PropTypes.arrayOf.isRequired,
};

const mapStateToProps = (state) => {
  return {
    tables: getRecords(state, { schema: 'Table' }),
    orders: getRecords(state, { schema: 'Order' }),
  };
};


export default connect(mapStateToProps)(WaiterHome);
