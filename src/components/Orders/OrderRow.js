import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Table, Icon } from 'semantic-ui-react';

const OrderRow = ({
  order, onEdit, onDelete, onPrint,
}) => (
  <Table.Row className="table-row-style">
    <Table.Cell>
      {order.tableNo}
    </Table.Cell>
    <Table.Cell>
      {
        order.items.map(it => `${it.menuName} (${it.qty})`).join(', ')
      }
    </Table.Cell>
    <Table.Cell>
      {order.amount}
    </Table.Cell>
    <Table.Cell>
      {order.status}
    </Table.Cell>
    <Table.Cell>
      <Icon
        color="green"
        name="edit"
        link
        onClick={() => onEdit(order)}
      />
    </Table.Cell>
    <Table.Cell>
      <Icon
        color="green"
        name="print"
        link
        onClick={() => onPrint(order)}
      />
    </Table.Cell>
    <Table.Cell>
      <Icon
        color="red"
        name="cancel"
        link
        onClick={() => onDelete(order)}
      />
    </Table.Cell>
  </Table.Row>
);

OrderRow.propTypes = {
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onPrint: PropTypes.func.isRequired,
  order: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
};

const menuName = (id, state) => {
  const menuItem = state.schema.MenuItem.find(m => m.id === id);
  if (menuItem) {
    return menuItem.name;
  }
  return `<Unknown::${id}>`;
};

const mapStateToProps = (state, ownProps) => {
  const { order } = ownProps;
  const table = state.schema.Table.find(t => t.id === order.tableId);
  return {
    order: {
      ...order,
      tableNo: table && table.name,
      items: !order.items ? [] : order.items.map(item => ({
        ...item,
        menuName: menuName(item.menuItemId, state),
      })),
      amount: !order.items ? 0 : order.items.reduce((res, item) => res + (item.qty * item.rate), 0),
    },
  };
};

export default connect(mapStateToProps)(OrderRow);

