import React from 'react';
import { Meteor } from 'meteor/meteor';
import Index from '../Index/Index';
import './Logout.scss';

class Logout extends React.Component {
  componentDidMount() {
    Meteor.logout();
  }

  render() {
    return (
      <div className="Logout">
        <h1>{'Don\'t go :('}</h1>
        <p>{'Login to earn your future rewards'}</p>
        <br />
        <Index />
      </div>
    );
  }
}

Logout.propTypes = {};

export default Logout;
