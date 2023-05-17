import { Meteor } from 'meteor/meteor';
import { UsersCollection } from './users';

Meteor.publish('findAll', function name() {
    return UsersCollection.find();
})

Meteor.publish('findOneUser', function publishTask(email) {
    if (!this.userId) {
        return this.ready();
    }

    const user = UsersCollection.find({ email: email });
    return user;
});