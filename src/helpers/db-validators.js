import User from '../users/user.model.js'
import Comment from '../comments/comment.model.js';
import Publication from '../comments/comment.model.js'

export const emailExists = async (email = '') => {
    const emailE = await User.findOne({email});
    if (emailE){
        throw new Error(`The email ${email} is alredy register`);
    }
}
export const usernameExists = async (username = '') => {
    const usernameE = await User.findOne({username});
    if (usernameE){
        throw new Error(`The user name ${username} is alredy register`);
    }
}
export const commentNoExists = async (id = '') => {
    const commentNoE = await Comment.findById(id);
    if(!commentNoE){
        throw new Error(`Comment doesnt exists in the database`);
    }
    if(!commentNoE.state){
        throw new Error(`Comment has been deleted`);
    }
}
export const PubliNoExists = async (id = '') => {
    const publiNoE = await Publication.findById(id);
    if(!publiNoE){
        throw new Error(`Publication doesnt exists in the database`);
    }
    if(!publiNoE.state){
        throw new Error(`Publication has been deleted`);
    }
}
