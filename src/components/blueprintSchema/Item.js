import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Items extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subMenuItem: false,
    };
  }

SelectColors = (color) => {
  const colors = ['#0000FF', '#7FFF00',
    '#A52A2A', '#DEB887', '#5F9EA0', '#FF7F50', '#DC143C',
    '#008B8B', '#006400', '#8B008B', '#FF8C00', '#FF1493',
    '#FFD700', '#ADFF2F', '#D3D3D3'];
  if (color < 16) {
    return colors[color];
  }
  return colors[color % 16];
}


  menuClickHandler= id => () => {
    this.setState({
      subMenuItem: !this.state.subMenuItem,
    });
    this.props.showSubMenu(id);
  }

  render() {
    return (
      <div>
        <div className="menu-item">
          {this.props.schema.Item.map(item => (
            <div
              role="button"
              tabIndex={item.id}
              onKeyDown={this.menuClickHandler(item.id)}
              onClick={this.menuClickHandler(item.id)}
              style={{ background: this.SelectColors(item.id) }}
              className="menu-item-box"
            >
              {item.name}
            </div>))}
        </div>
      </div>
    );
  }
}

Items.propTypes = {
  showSubMenu: PropTypes.func.isRequired,
  schema: PropTypes.objectOf.isRequired,
};
const mapStateToProps = state => state;

export default connect(mapStateToProps)(Items);
