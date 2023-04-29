import { Meteor } from 'meteor/meteor';
import { TasksCollection } from '../imports/api/task';

const addTask = text => TasksCollection.insert({ text: text });

Meteor.startup(async () => {
  if (TasksCollection.find().count() === 0) {
    [
      "Primeira task :D",
      "Segunda Task :)",
      "Terceira Task :|",
      "Quarta Task :/",
      "Quinta Task :(",
      "Sexta Task ;("
    ].forEach(addTask);
  }
});
