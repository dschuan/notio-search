/* eslint-disable consistent-return */

import { Mongo } from 'meteor/mongo';

const CoinThreshold = new Mongo.Collection('Threshold');

export default CoinThreshold;
