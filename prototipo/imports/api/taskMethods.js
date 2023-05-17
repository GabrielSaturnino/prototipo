import { Meteor } from 'meteor/meteor';
import { TasksCollection } from './task';

Meteor.methods({
    'createTask'(name, desc, createdBy, userName, tipo) {

        if (!this.userId) {
            throw new Meteor.Error('Not authorized.');
        }

        TasksCollection.insert({
            name: name,
            desc: desc,
            createdAt: new Date(),
            createdBy: createdBy,
            userName: userName,
            tipo: tipo,
            situation: 'Criada'
        })
    },

    'editTask'(id, desc, name, situation) {
        if (!this.userId) {
            throw new Meteor.Error('Not authorized.');
        }

        TasksCollection.update(id, { $set: { desc: desc, name: name, situation: situation } });
    },

    'editTipo'(id, situation) {
        if (!this.userId) {
            throw new Meteor.Error('Not authorized.');
        }

        TasksCollection.update(id, { $set: { situation: situation } });
    },

    'deleteTask'(id) {
        if (!this.userId) {
            throw new Meteor.Error('Not authorized.');
        }

        TasksCollection.remove(id);
    },

    'editTaskName'(id, name) {
        if (!this.userId) {
            throw new Meteor.Error('Not authorized.');
        }

        TasksCollection.update(id, { $set: { name: name } });
    },

    'editTaskDesc'(id, desc) {
        if (!this.userId) {
            throw new Meteor.Error('Not authorized.');
        }

        TasksCollection.update(id, { $set: { desc: desc } });
    },

})