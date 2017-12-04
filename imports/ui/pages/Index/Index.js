// eslint-disable jsx/prefer-template
import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Row, Button, FormGroup, FormControl } from 'react-bootstrap';
import PropTypes from 'prop-types';
import './Index.scss';
import validate from '../../../modules/validate';


export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
    };
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }

  componentDidMount() {
    const component = this;
    validate(component.form, {
      rules: {
        query: {
          required: true,
        },
      },
      messages: {
        query: {
          required: 'Enter a search term',
        },
      },
    });
  }


  onChangeHandler(e) {
    this.setState({ query: e.target.value });
  }
  queryProcessor() {
    const query = `/search/${this.state.query}`;
    return query.replace(/\s+/g, '-');
  }
  submitHandler(e) {
    e.preventDefault();
    Meteor.call('users.addPoints', 10);
    this.props.history.push(this.queryProcessor());
  }
  render() {
    return (
      <div className="Index">
        <img src="/notio.png" alt="notio search" />
        <Row>
          <form onSubmit={this.submitHandler}>
            <FormGroup bsSize="large" role="form">
              <FormControl
                type="text"
                placeholder="Enter your query"
                defaultValue={this.props.defaultQuery}
                onChange={this.onChangeHandler}
              />
              <Button bsStyle="success" type="submit">Search</Button>
            </FormGroup>
          </form>
        </Row>
      </div>
    );
  }
}
Index.defaultProps = {
  defaultQuery: '',
};

Index.propTypes = {
  history: PropTypes.object.isRequired,
  defaultQuery: PropTypes.string,
};
