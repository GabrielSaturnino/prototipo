import { Meteor } from 'meteor/meteor';
import { TasksCollection } from './task';

Meteor.publish('tasks', function publishTask() {
    return TasksCollection.find({ createdBy: this.userId });
})

Meteor.publish("teste", function publishTask() {
    if (!this.userId) {
        return this.ready();
    }
    const a = TasksCollection.find({ $and: [{ tipo: 'Publica' }, { situation: 'Iniciada' }] }).fetch();
    console.log(a);
    return a
});

Meteor.publish('findOne', function publishTask(id) {
    if (!this.userId) {
        return this.ready();
    }

    const task = TasksCollection.find({ _id: id });
    return task;
});

// Tasks Publicas
Meteor.publish('findPublicas', function publishTask() {
    if (!this.userId) {
        return this.ready();
    }

    const publicas = TasksCollection.find({ tipo: 'Publica' });
    return publicas;
})

Meteor.publish('findPublicasAndamento', function publishTask() {
    if (!this.userId) {
        return this.ready();
    }

    const publicasIniciadas = TasksCollection.find({ $and: [{ tipo: 'Publica' }, { situation: 'Iniciada' }] });
    return publicasIniciadas;
})

Meteor.publish('findPublicasFinalizada', function publishTask() {
    if (!this.userId) {
        return this.ready();
    }

    const publicasFinalizada = TasksCollection.find({ $and: [{ tipo: 'Publica' }, { situation: 'Finalizada' }] });
    return publicasFinalizada;
})

// Tasks Pessoais
Meteor.publish('findPessoal', function publishTask() {
    if (!this.userId) {
        return this.ready();
    }

    const pessoais = TasksCollection.find({ $and: [{ createdBy: this.userId }, { tipo: 'Pessoal' }] });
    return pessoais;
})

Meteor.publish('findPessoalAndamento', function publishTask() {
    if (!this.userId) {
        return this.ready();
    }

    const pessoaisAndamento = TasksCollection.find({ $and: [{ createdBy: this.userId }, { tipo: 'Pessoal' }, { situation: 'Iniciada' }] });
    return pessoaisAndamento;
})

Meteor.publish('findPessoalFinalizada', function publishTask() {
    if (!this.userId) {
        return this.ready();
    }

    const pessoaisFinalizada = TasksCollection.find({ $and: [{ createdBy: this.userId }, { tipo: 'Pessoal' }, { situation: 'Finalizada' }] });
    return pessoais;
})

Meteor.publish('findPaginado', function publishTask(skip) {
    if (!this.userId) {
        return this.ready();
    }

    const paginado = TasksCollection.find({ tipo: 'Publica' }, { skip: skip, limit: 4 });
    return paginado;
})

Meteor.publish('findPaginadoComTipo', function publishTask(skip, tipo) {
    if (!this.userId) {
        return this.ready();
    }

    const paginadoComTipo = TasksCollection.find({ situation: tipo }, { skip: skip, limit: 4 });
    return paginadoComTipo;
})

Meteor.publish('findPaginadoPessoal', function publishTask(skip) {
    if (!this.userId) {
        return this.ready();
    }

    const paginadoPessoal = TasksCollection.find({ createdBy: this.userId }, { skip: skip, limit: 4 });
    return paginadoPessoal;
})

Meteor.publish('findPaginadoPessoalComTipo', function publishTask(skip, tipo) {
    if (!this.userId) {
        return this.ready();
    }

    const paginadoPessoalComTipo = TasksCollection.find
        ({ createdBy: this.userId, situation: tipo }, { skip: skip, limit: 4 });
    return paginadoPessoalComTipo;
})