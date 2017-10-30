/* eslint-disable arrow-body-style */

import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import Loading from '../Loading/Loading';
import Index from '../../pages/Index/Index';

class Results extends Component {
  constructor(props) {
    super(props);
    this.state = ({ results: [] });
  }

  componentDidMount() {
    const component = this;
    component.serverRequest =
      axios
        .get(this.props.url)
        .then((results) => {
          const array = [];
          results.data.items.map((item) => {
            array.push(item);
            return '';
          });
          component.setState({ results: array });
        });
  }

  onClickHandler() {
    Meteor.call('users.addPoints', 12);
  }
  renderResults() {
    return this.state.results.map((result) => {
      return (
        <div key={result.cacheId}>
          <a href={result.link} onClick={this.onClickHandler.bind(this)}><h4>{result.title}</h4></a>
          <p> {result.snippet} </p>
          <br />
        </div>
      );
    });
  }

  render() {
    return (
      this.state.results.length === 0 ? <Loading /> : (
        <div>
          <Index {...this.props} />
          {this.renderResults()}
        </div>)
    );
  }
}

Results.propTypes = {
  url: PropTypes.string.isRequired,
};

export default createContainer((props) => {
  const query = props.match.url;
  const url = `https://www.googleapis.com/customsearch/v1?key=AIzaSyDV3n3elroytZ-17iafumq1TrKNXno8Ylo&cx=002529225133273433045:lqcq155wmje&q=${query}`;
  return { url };
}, Results);
