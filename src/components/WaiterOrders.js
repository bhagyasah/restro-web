import React, { Component } from 'react';
import { Table, Cell, Column } from '@blueprintjs/table';
import { connect } from 'react-redux';
import { Button, Intent } from '@blueprintjs/core';
import PropTypes from 'prop-types';
import { VAT, SERVICE_CHARGE } from '../config/';
import OrderTable from './blueprintSchema/OrderTable';
import Item from './blueprintSchema/Item';
import MenuItem from './blueprintSchema/MenuItem';


class WaiterOrders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subMenuShow: false,
      menuId: null,
      selected: [],
    };
  }

showSubMenu = (menuId) => {
  this.setState({
    subMenuShow: true,
    menuId,
  });
}

currentOrderHandler = (order) => {
  const { selected } = this.state;
  if (selected.find(item => item.menuItemId === order.menuItemId)) {
    let newSelected = selected.slice();
    const index = newSelected.findIndex(item => item.id === order.menuItemId);
    if (order.todo === 'plus') {
      newSelected[index].qty += 1;
    } else {
      newSelected[index].qty -= 1;
      if (newSelected[index].qty <= 0) {
        const removableIndex = newSelected.findIndex(item => item.menuItemId === order.menuItemId);
        newSelected = [...newSelected.slice(0, removableIndex), ...newSelected.slice(removableIndex + 1)];
      }
    }
    this.setState({
      selected: newSelected,
    });
  } else {
    const menuItem = this.props.menuItems.find(item => item.id === order.menuItemId);
    const newMenuItem = Object.assign(menuItem, order);
    if (order.todo !== 'minus') {
      this.setState({
        selected: selected.concat(newMenuItem),
      });
    }
  }
}

currentOrderSummary = () => {
  const selectedMenuItemNo = this.state.selected.length;
  if (selectedMenuItemNo !== 0) {
    const totalNoOfSelectedItem = this.state.selected.reduce((total, next) => {
      return (total + next.qty);
    }, 0);
    const totalPrice = this.state.selected.reduce((total, nextamount) => {
      return total + (nextamount.qty * nextamount.price);
    }, 0);
    return `${selectedMenuItemNo}/${totalNoOfSelectedItem}/${totalPrice}`;
  }
  return '0/0/0';
}

itemValueSelector = (id, value) => {
  return this.state.selected[id][value];
}

orderSummary = summary => summary;

itemCellRenderer = rowIndex => <Cell>{this.itemValueSelector(rowIndex, 'name')}</Cell>;
qtyCellRender = rowIndex1 => <Cell>{this.itemValueSelector(rowIndex1, 'qty')}</Cell>;
priceCellRender = rowindex2 => <Cell>{this.itemValueSelector(rowindex2, 'price')}</Cell>;

render() {
  const orderItems = this.state.selected;
  return (
    <div className="waiter-orders">
      <div className="table-body" >
        { this.state.subMenuShow ? <MenuItem
          itemId={this.state.menuId}
          currentOrder={currentOrder =>
            this.currentOrderHandler(currentOrder)}
        /> : <OrderTable tableId={this.props.tableId} orderSummary={summary => this.orderSummary(summary)} /> }
      </div>
      <div className="header">
        <h3>Current Order {this.currentOrderSummary()}</h3>
      </div>
      <div className="current-order-table-body">
        <div className="table">
          <Table numRows={this.state.selected.length} numColumns={3}>
            <Column
              name="Item"
              cellRenderer={this.itemCellRenderer}
            />
            <Column name="Quantity" cellRenderer={this.qtyCellRender} />
            <Column name="Price" cellRenderer={this.priceCellRender} />
          </Table>
        </div>
        <div className="order-button">
          <Button
            text="Order"
            disabled={!this.state.selected.length > 0}
            className="pt-large"
            intent={Intent.PRIMARY}
            onClick={() => {
            this.setState({
              subMenuShow: false,
              selected: [],
            });
            this.props.api.placeOrder(this.props.tableId, orderItems, 0, SERVICE_CHARGE, VAT);
           }
             }

          />
        </div>
      </div>
      <Item showSubMenu={id => this.showSubMenu(id)} />
    </div>
  );
}
}

WaiterOrders.propTypes = {
  menuItems: PropTypes.arrayOf.isRequired,
  api: PropTypes.shape({ placeOrder: PropTypes.func }).isRequired,
  tableId: PropTypes.number.isRequired,
  placeOrder: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
  menuItems: state.schema.MenuItem,
  currentTableId: state.schema.CurrentTableId,
});

export default connect(mapStateToProps)(WaiterOrders);
