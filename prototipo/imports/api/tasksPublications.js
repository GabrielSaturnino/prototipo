import { Meteor } from 'meteor/meteor';
import { TasksCollection } from './task';

Meteor.publish('tasksPessoais', function publishTask() {
    return TasksCollection.find({ createdBy: this.userId });
})