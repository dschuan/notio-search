import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

const RenderBar = (points, target) => {
  const percentage = (points / target) * 100;
  return (
    <div>
      <div className="progress">
        <div className="progress-bar" role="progressbar" style={{ width: `${percentage}%` }} aria-valuenow={percentage} aria-valuemin="0" aria-valuemax="100" />
      </div>
    </div>
  );
};

const AuthenticatedNavigation = ({ name, history, coinData }) => (
  <div>
    <Nav pullRight>
      <NavDropdown eventKey={3} title={`${coinData.currency} coins`} id="user-nav-coin">
        <NavItem eventKey={3.1}>
          {RenderBar(coinData.points, coinData.target)}
          {coinData.points} out of {coinData.target} points
        </NavItem>
      </NavDropdown>
    </Nav>
    <Nav pullRight>
      <NavDropdown eventKey={2} title={name} id="user-nav-dropdown">
        <LinkContainer to="/profile">
          <NavItem eventKey={2.1} href="/profile">Profile</NavItem>
        </LinkContainer>
        <MenuItem divider />
        <MenuItem eventKey={2.2} onClick={() => history.push('/logout')}>Logout</MenuItem>
      </NavDropdown>
    </Nav>
  </div>
);

AuthenticatedNavigation.propTypes = {
  name: PropTypes.string.isRequired,
  history: PropTypes.object.isRequired,
  coinData: PropTypes.object.isRequired,
};

export default withRouter(AuthenticatedNavigation);
