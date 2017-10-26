import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http';
import { check } from 'meteor/check';

Meteor.methods({
  'http.getSearchQueries': function search(query) {
    // avoid blocking other method calls from the same client
    this.unblock();
    check(query, String);
    const apiUrl = `https://www.googleapis.com/customsearch/v1?key=AIzaSyDV3n3elroytZ-17iafumq1TrKNXno8Ylo&cx=002529225133273433045:lqcq155wmje&q=${query}`;
    // asynchronous call to the dedicated API calling function
    try {
      const response = HTTP.call('GET', apiUrl);
      console.log(response);
      return response;
    } catch (e) {
      throw new Meteor.Error('Call failed');
    }
  },
});
