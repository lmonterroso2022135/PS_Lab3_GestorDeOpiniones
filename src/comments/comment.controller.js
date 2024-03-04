import Publication from '../publications/publication.model.js';
import User from '../users/user.model.js';
import Comment from './comment.model.js';

// Comentar en publicacion por usuario logeado
export const commentPost = async (req, res) => {
    const{id} = req.params;
    const user = req.user;
    const { text } = req.body;
    
    try {
        const comment = new Comment({
            text,
            user: user._id
        })

        await comment.save();

        const publication = await Publication.findById(id);
        if (!publication){
            console.log('Publicacion no encontrada')
        }

        console.log(publication.text)

        publication.comments.push(comment._id)
        await publication.save();

        res.status(200).json({
            msg: 'Successful comment.',
            publication:{
                ...publication.toObject(),
                comments: comment.text
            },
        })
    } catch (e) {
        console.error(error);
        res.status(500).json({ msg: 'Could not comment' }); 
    }    
}
// Comentarios por usuario 
export const commentsForUserGet = async (req, res) => {
    try {
        const  {_id, username} = req.user;
        const query = {user: _id, state: true};

        const comments = await Promise.all([
            Comment.find(query).populate('user', 'username')
        ]);
        res.status(200).json({
            msg: `${username} comments`,
            comments
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Cant gets users comments'});
    }
}
// Editar comentario
export const commentPut = async (req, res = response) => {
    const {_id, username} = req.user;
    const {id} = req.params;
    const {...resto} = req.body;

    const comment = await Comment.findById(id);
    
    const idUser = _id.toString();
    const idUserC = comment.user._id.toString();

    if (idUser !== idUserC){
        return res.status(403).json({ msg: 'This action is not authorized.' });
    }

    await Comment.findByIdAndUpdate(id, resto, { new: true });

    res.status(200).json({
        mdg: `Successful actualized by ${username}`,
        comment
    });
}
// Eliminar Comentario 
export const commentDelete = async (req, res) => {
    const {_id, username} = req.user;
    const {id} = req.params;
    
    const comment = await Comment.findOneAndUpdate(
        { _id: id, user: _id },
        { state: false },
    )

    if (!comment) {
        return res.status(404).json({ msg: 'This action is not authorized.' });
    }    

    res.status(200).json({
        mdg: `Successful delete by ${username}.`,
        comment
    });
}

