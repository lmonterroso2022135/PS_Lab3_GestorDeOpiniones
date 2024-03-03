import mongoose from 'mongoose';

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "The username is required"],
        unique: true
    },
    email: {
        type: String,
        required: [true, "Email is necessary"],
        unique: true,
    },
    newPassword: {
        type: String
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    state: {
        type: Boolean,
        default: true,
    },
    google: {
        type: Boolean,
        default: true,
    },
});

UserSchema.methods.toJSON = function() {
    const { __v, password, _id, ...usuario } = this.toObject();
    usuario.uid = _id;
    return usuario;
}

export default mongoose.model('User', UserSchema);