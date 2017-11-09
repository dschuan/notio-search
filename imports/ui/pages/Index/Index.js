// eslint-disable jsx/prefer-template
import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Row, Button, FormGroup, FormControl } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Index.scss';
import validate from '../../../modules/validate';


export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
    };
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.clickHandler = this.clickHandler.bind(this);
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
  clickHandler() {
    Meteor.call('users.addPoints', 10);
    this.props.history.push(this.queryProcessor());
  }
  render() {
    return (
      <div className="Index">
        <Row>
          <form>
            <FormGroup bsSize="large">
              <FormControl
                type="text"
                placeholder="Enter your query"
                onChange={this.onChangeHandler}
              />
            </FormGroup>
            <Button bsStyle="success" type="button" onClick={this.clickHandler}>Search</Button>
          </form>
        </Row>
        <footer>
          <p>Notio Search Engine</p>
        </footer>
      </div>
    );
  }
}
