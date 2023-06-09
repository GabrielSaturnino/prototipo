import { Meteor } from 'meteor/meteor';
import { TasksCollection } from '../imports/api/task';
import { UsersCollection } from '../imports/api/users';
import { Accounts } from 'meteor/accounts-base';
import '../imports/api/userMethods';
import '../imports/api/taskMethods';
import '../imports/api/tasksPublications';
import '../imports/api/userPublications';

const addUser = user => UsersCollection.insert({ user });
const addTask = (text, user) => TasksCollection.insert({
  name: text,
  desc: 'task',
  createdAt: new Date(),
  createdBy: user._id,
  userName: user.username,
  tipo: 'Pessoal',
  situation: 'Criada'
});

const SEED_USERNAME = 'meteorite';
const SEED_PASSWORD = 'password';

Meteor.startup(async () => {
  if (UsersCollection.find().count() === 0) {
    [
      "Primeiro usuario"
    ].forEach(addUser);
  }

  if (!Accounts.findUserByUsername(SEED_USERNAME)) {
    Accounts.createUser({
      username: SEED_USERNAME,
      password: SEED_PASSWORD,
    });
  }

  if (TasksCollection.find().count() === 0) {
    [
      'First Task',
      'Second Task',
      'Third Task',
      'Fourth Task',
      'Fifth Task',
      'Sixth Task',
      'Seventh Task',
    ].forEach(taskText => insertTask(taskText, user));
  }
})
