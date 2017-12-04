import { Meteor } from 'meteor/meteor';
import { SyncedCron } from 'meteor/percolate:synced-cron';
import CoinThreshold from '../../api/Coin/CoinThreshold';

SyncedCron.add({
  name: 'Tally coins and edit points to earn next points',
  schedule(parser) {
    // parser is a later.parse object
    return parser.recur().every(20).hour();
  },
  job() {
    const coinThreshold = CoinThreshold.findOne({});
    const coinLimit = coinThreshold.threshold;
    const coins = Meteor.users.find({}, { fields: { 'profile.coins.currency': 1 } }).fetch();
    let coinSum = 0;
    coins.forEach((coin) => {
      if (coin.profile.coins.currency !== undefined) {
        coinSum += coin.profile.coins.currency;
      }
    });
    if (coinSum >= coinLimit) {
      CoinThreshold.update(coinThreshold._id, { $inc: { threshold: 1000 } });
      Meteor.users.update({}, { $set: { 'profile.coins.points': 0 }, $inc: { 'profile.coins.target': 1000 } });
    }
  },
});

SyncedCron.start();
