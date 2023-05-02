import { Meteor } from 'meteor/meteor';
import { TasksCollection } from '../imports/api/task';
import { UsersCollection } from '../imports/api/users';

const addUser = user => UsersCollection.insert({ user });
const addTask = text => TasksCollection.insert({ text: text });

Meteor.startup(async () => {
  if (UsersCollection.find().count() === 0) {
    [
      "Primeiro usuario"
    ].forEach(addTask);
  }
});
