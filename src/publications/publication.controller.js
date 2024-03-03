import Publication from './publication.model.js';
import User from '../users/user.model.js';

// Agregar Publicacion
export const publicationsPost = async (req, res) => {
    const user = req.user;

    const { title, category, text } = req.body;

    try {
        const publication = new Publication({
            title,
            category,
            text,
            user: user._id,
        });

        await publication.save();

        const us = await User.findById(user._id);

        res.status(200).json({
            msg: 'Successful publication.',
            publication: {
                ...publication.toObject(),
                user: us.username
            }
        });
    } catch (error) {
        console.error('Publication could not be uploaded', error);
        res.status(500).json({ error: 'Publication could not be uploaded' });
    }
};
// Listado de publicaciones
export const publicationsGet = async (req, res = response) => {
    const query = {state: true};

    const [total, publications] = await Promise.all([
        Publication.countDocuments(query),
        Publication.find(query).populate('user', 'username')
    ]);

    res.status(200).json({
        total,
        publications
    });
}
// Publicaciones del usuario
export const publicationForUserGet = async (req, res)=>{
    try {
        const {_id, username} = req.user;
        const query = {user: _id, state:true };

        const publications = await Promise.all([
            Publication.find(query).populate('user', 'username')
        ]);
        res.status(200).json({
            msg: `${username} publications`,
            publications
        }) 
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Cant gets user publication'});
    
    }
}
// Buscar publicacion
export const publicationGetById = async  (req, res) =>{
    const {id} = req.params;
    const publication = await Publication.findOne({_id: id});
    

    res.status(200).json({
        publication
    });
}


// Editar publicacion
export const publicationPut = async (req, res = response) =>{
    const {_id: _idUser, username} = req.user;
    const {id} = req.params;
    const {_id: _idPublication, ...resto} = req.body;
    
    const publication = await Publication.findById(id);

    const idUser = _idUser.toString();
    const idUserP = publication.user._id.toString();

    if (idUser !== idUserP) {
        return res.status(403).json({ msg: 'This action is not authorized.' });
    }

    await Publication.findByIdAndUpdate(id, resto, { new: true });

    res.status(200).json({
        mdg: `Successful actualized by ${username}`,
        publication
    });

}


// Eliminar publicacion
export const publicationDelete  = async (req, res) => {
    const {_id, username} = req.user;
    const {id} = req.params;
    

    const publication = await Publication.findOneAndUpdate(
        { _id: id, user: _id },
        { state: false },
    );

    if (!publication) {
        return res.status(404).json({ msg: 'This action is not authorized.' });
    }    

    res.status(200).json({
        mdg: `Successful delete by ${username}.`,
        publication
    });
}



