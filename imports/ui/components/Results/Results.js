/* eslint-disable arrow-body-style */

import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import Loading from '../Loading/Loading';
import Index from '../../pages/Index/Index';
import './results.scss';

class Results extends Component {
  constructor(props) {
    super(props);
    this.state = ({ results: [], noResults: false });
    this.onClickHandler = this.onClickHandler.bind(this);
  }

  componentDidMount() {
    const component = this;
    component.serverRequest =
      axios
        .get(this.props.url)
        .then((results) => {
          if (results.data.queries) {
            const array = [];
            results.data.items.map((item) => {
              array.push(item);
              return '';
            });
            component.setState({ results: array });
          } else {
            component.setState({ results: [null], noResults: true });
          }
        });
  }
  componentWillReceiveProps(nextProps) {
    const component = this;
    component.serverRequest =
      axios
        .get(nextProps.url)
        .then((results) => {
          if (results.data.queries) {
            const array = [];
            results.data.items.map((item) => {
              array.push(item);
              return '';
            });
            component.setState({ results: array });
          } else {
            component.setState({ results: [null], noResults: true });
          }
        });
  }
  onClickHandler() {
    Meteor.call('users.addPoints', 12);
  }
  renderResults() {
    if (this.state.noResults) {
      return <h6> No Results {':('} </h6>;
    }
    if (this.state.results.length !== 0) {
      return this.state.results.map((result) => {
        return (
          <div key={result.cacheId}>
            <a key={`a${result.cacheId}`} href={result.link} onClick={this.onClickHandler}><h4>{result.title}</h4></a>
            <p key={`p${result.cacheId}`}> {result.snippet} </p>
            <br />
          </div>
        );
      });
    }
    return '';
  }
  renderPageButtons() {
    return (
      <div className="ButtonSections">
        <Button bsStyle="link" className="prev">Prev </Button>
        <Button bsStyle="link" className="next">Next</Button>
      </div>

    );
  }
  render() {
    return (
      this.state.results.length === 0 ? <Loading /> : (
        <div className="ResultsIndex">
          <Index {...this.props} defaultQuery={this.props.query} />
          {this.renderResults()}
          {this.renderPageButtons()}
        </div>)
    );
  }
}

Results.propTypes = {
  url: PropTypes.string.isRequired,
  query: PropTypes.string.isRequired,
};

export default createContainer((props) => {
  let query = props.match.url;
  console.log(query);
  const url = `https://www.googleapis.com/customsearch/v1?key=AIzaSyDV3n3elroytZ-17iafumq1TrKNXno8Ylo&cx=002529225133273433045:lqcq155wmje&q=${query}`;
  query = query.replace(/-/g, ' ').slice(8);
  return { query, url };
}, Results);
