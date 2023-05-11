import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

Meteor.methods({
    'atualizarDadosUsuario'(data, genero, empresa) {

        if (!this.userId) {
            throw new Meteor.Error('Not authorized.');
        }

        Meteor.users.update(this.userId, {
            $set: {
                profile: {
                    empresa: empresa,
                    date: data,
                    gender: genero
                }
            }
        })
    }
})
