import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Cell, Column } from '@blueprintjs/table';
import { connect } from 'react-redux';

class OrderTable extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  summaryShowHandler = () => {
    const totalOrder = this.props.order.length;
    const items = this.props.order.map(item => item.items);
    const newItems = [].concat(...items).filter(item => item !== undefined);
    const totalQuantity = newItems.reduce((total, next) => {
      return (total + next.qty);
    }, 0);

    const totalAmount = newItems.reduce((total, next) => {
      const menuItem = this.props.menuItems.find(item => item.id === next.menuItemId);
      const { price } = menuItem;
      return total + (next.qty * price);
    }, 0);

    return `Orders ${totalOrder}/${totalQuantity}/${totalAmount}`;
  }
  filteredArray = () => {
    const items = this.props.order.map(item => item.items);
    return [].concat(...items).filter(item => item !== undefined);
  }

  contentValueProvider = (id) => {
    const menuItem = Object.assign({}, this.props.menuItems.find(item => item.id === id));
    return menuItem.name;
  }

  itemCellRenderer = rowIndex => <Cell>{this.contentValueProvider(this.filteredArray()[rowIndex].menuItemId)}</Cell>;
  qtyCellRender = rowIndex1 => <Cell>{this.filteredArray()[rowIndex1].qty}</Cell>;

  render() {
    return (
      <div>
        <div className="header">
          <h3>{this.summaryShowHandler()}</h3>
        </div>
        <Table numRows={this.filteredArray() === undefined ? 0 : this.filteredArray().length} numColumns={1}>
          <Column name="Item" cellRenderer={this.itemCellRenderer} />
          <Column name="Quantity" cellRenderer={this.qtyCellRender} />
        </Table>
      </div>
    );
  }
}

OrderTable.propTypes = {
  order: PropTypes.arrayOf.isRequired,
  menuItems: PropTypes.arrayOf.isRequired,
};
const mapStateToProps = (state, ownProps) => {
  return {
    order: state.schema.Order.filter(order => order.tableId === ownProps.tableId),
    menuItems: state.schema.MenuItem,
  };
};

export default connect(mapStateToProps)(OrderTable);
