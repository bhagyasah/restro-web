import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DragSource } from 'react-dnd';
import PropTypes from 'prop-types';
import Timer from '../components/Timer';
import getRecords from './../reducers/getRecords';
import ItemTypes from './ItemTypes';


const tableSource = {
  beginDrag(props) {
    const { id, left, top } = props;
    return { id, left, top };
  },
};

function collect(connectprops, monitor) {
  return {
    connectDragSource: connectprops.dragSource(),
    isDragging: monitor.isDragging(),
  };
}


class Table extends Component {

  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
    left: PropTypes.number.isRequired,
    top: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    hideSourceOnDrag: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
    rotationAngle: PropTypes.number.isRequired,
    currentTableId: PropTypes.func.isRequired,
  }


  constructor(props) {
    super(props);
    this.state = {
      colorBackground: false,
    };
  }


style = {
  width: 100,
  height: 80,
  rotate: 90,
  position: this.props.position && 'absolute',
  cursor: this.props.position && 'move',
};

changeBackGroundColor= id => () => {
  this.setState({
    colorBackground: !this.state.colorBackground,
  });
  this.props.currentTableId(id);
}
  contentHandler = (name, id) => () => {
    this.props.switchToOrder(id);
  };

  render() {
    const {
      hideSourceOnDrag,
      left,
      top,
      id,
      name,
      position,
      rotationAngle,
      connectDragSource,
      isDragging,
      children,
    } = this.props;
    if (isDragging && hideSourceOnDrag) {
      return null;
    }
    const activeTable = Object.assign({}, this.props.orders.find(order => order.tableId === id));
    const status = activeTable.tableId === id;
    const startTime = activeTable.timestamp;

    return connectDragSource(
      <div
        id="table"
        style={{
          ...this.style,
          left,
          top,
          backgroundColor: (position && this.state.colorBackground) ? 'blue' : ' ',
          transform: `rotate(${rotationAngle}deg)`,
          }}
        className="table"
        onClick={(!this.props.position && this.contentHandler(name, id)) || this.changeBackGroundColor(id)}
        role="button"
        tabIndex={id}
        onKeyDown={this.contentHandler(name, id)}
      >
        <div className="table-name">{name}</div>
        { status ? <div className="table-timmer"> <Timer startTime={startTime} /></div> : <div className="table-available">Available</div>}
        {children}
      </div>
    );
  }
}
Table.propTypes = {
  orders: PropTypes.arrayOf.isRequired,
  switchToOrder: PropTypes.func.isRequired,
  position: PropTypes.string.isRequired,
};
const mapStateToProps = (state) => {
  return {
    tables: getRecords(state, { schema: 'Table' }),
    orders: getRecords(state, { schema: 'Order' }),
  };
};
export default connect(mapStateToProps)(DragSource(ItemTypes.TABLE, tableSource, collect)(Table));