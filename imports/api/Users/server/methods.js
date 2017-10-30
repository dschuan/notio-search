import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Accounts } from 'meteor/accounts-base';
import editProfile from './edit-profile';
import rateLimit from '../../../modules/rate-limit';

Meteor.methods({
  'users.sendVerificationEmail': function usersSendVerificationEmail() {
    return Accounts.sendVerificationEmail(this.userId);
  },
  'users.editProfile': function usersEditProfile(profile) {
    check(profile, {
      emailAddress: String,
      profile: {
        name: {
          first: String,
          last: String,
        },
      },
    });

    return editProfile({ userId: this.userId, profile })
      .then(response => response)
      .catch((exception) => {
        throw new Meteor.Error('500', exception);
      });
  },
  'users.addPoints': function addPoints(points) {
    check(points, Number);
    const user = Meteor.users.findOne(this.userId);
    const target = user.profile.coins.target;
    const currPoints = user.profile.coins.points + points;
    if (currPoints - target >= 0) {
      Meteor.users.update({ _id: this.userId }, {
        $set: { 'profile.coins.points': currPoints - target },
        $inc: { 'profile.coins.currency': 1 },
      });
    } else {
      Meteor.users.update({ _id: this.userId }, {
        $inc: { 'profile.coins.points': points },
      });
    }
  },
});

rateLimit({
  methods: [
    'users.sendVerificationEmail',
    'users.editProfile',
    'users.addPoints',
  ],
  limit: 5,
  timeRange: 1000,
});
