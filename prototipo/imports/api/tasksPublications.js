import { Meteor } from 'meteor/meteor';
import { TasksCollection } from './task';

Meteor.publish('tasks', function publishTask() {
    return TasksCollection.find({ createdBy: this.userId });
})
