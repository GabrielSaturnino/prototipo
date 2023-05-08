import { Meteor } from 'meteor/meteor';
import { TasksCollection } from '../imports/api/task';
import { UsersCollection } from '../imports/api/users';
import { Accounts } from 'meteor/accounts-base';

const addUser = user => UsersCollection.insert({ user });
const addTask = text => TasksCollection.insert({ text: text });

const SEED_USERNAME = 'meteorite';
const SEED_PASSWORD = 'password';

Meteor.startup(async () => {
  if (UsersCollection.find().count() === 0) {
    [
      "Primeiro usuario"
    ].forEach(addTask);
  }

  if (!Accounts.findUserByUsername(SEED_USERNAME)) {
    Accounts.createUser({
      username: SEED_USERNAME,
      password: SEED_PASSWORD,
    });
  }
});
