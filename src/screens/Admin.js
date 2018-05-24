import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import StockWatch from './../components/StockWatch';
import Orders from './../components/Orders/index';
import FooterMenu from './../components/FooerMenu';

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { api, onLogout } = this.props;
    return (
      <div>
        <Grid style={{ marginTop: '100px' }} centered verticalAlign="top" columns={2}>
          <Grid.Row>
            <Grid.Column>
              <Orders api={api} />
            </Grid.Column>
            <Grid.Column>
              <StockWatch api={api} allowPurchase allowItemRemove allowReconcile />
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <FooterMenu api={api} onLogout={onLogout} showAddUser showReport />
      </div>
    );
  }
}

Admin.propTypes = {
  api: PropTypes.shape({}).isRequired,
  onLogout: PropTypes.func.isRequired,
};

export default connect()(Admin);
