const User = require('./../../models/users');

const getAll = (req, res) =>{
    User.find({}, ["name", "username"])
    .then((response)=>{
        res.status(200).send(response);
    })
    .catch((err)=>{
        res.sendStatus(500);
    })
};
const getUser = (req, res) => {
    const id = req.params.id;
    User.find({_id : id}, ["name", "username"])
    .then((response)=>{
        res.status(200).send(response);
    })
    .catch((err)=>{
        res.sendStatus(500);
    })
};
const newUser = (req, res) => {
    const user = {
        name: req.body.name,
        age: req.body.age,
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        telephone: req.body.telephone
    };
    if(user.name && user.age && user.username && user.password && user.email){
        const object = new User(user);
        object.save()
        .then((response)=>{
            res.status(201).send(response._id);
        })
        .catch((err)=>{
            res.sendStatus(500);
        })
    }else{
        res.sendStatus(500);
    }
};

const updateUser = (req, res) => {
	const id = req.params.id;

	User.updateOne({_id:id}, req.body, function(err,result){
		if (err) {
			res.status(500).send("Imposible actualizar el registro");
		} else {
			res.status(200).send("Registro Actualizado");
		}
	});
		
};
const deleteUser = (req, res) => {

	User.findOneAndDelete({_id: req.body.id}).then(response=>{
        res.status(202).send('Usuario eliminado');
    })
    .catch(err=>{
        res.status(500).send('Imposible eliminar usuario');
    });
};

module.exports = {getAll, getUser, newUser, updateUser, deleteUser};