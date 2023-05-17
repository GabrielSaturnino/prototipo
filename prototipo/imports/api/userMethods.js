import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Accounts } from 'meteor/accounts-base';
import { UsersCollection } from './users';

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
    },

    'criarUsuario'(name, email, profileImg) {
        UsersCollection.insert({
            name,
            email,
            profileImg,
            createdAt: new Date()
        })
    },

    'atualizarData'(id, nome, image) {
        UsersCollection.update(id, {
            $set: {
                name: nome,
                profileImg: image
            }
        })
    },
})
