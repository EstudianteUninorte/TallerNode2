const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const User = require('./../../models/users');
const Tweet = require('./../../models/tweets');

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

const getTweetsByUser = (req, res) => {
    let id = req.params.id; 
    Tweet.find({ 'user': id }, (err, response) => {
    if (err) { res.status(500).send("Error al consultar tweet del usuario"); console.log(err); }
    
    else res.status(200).send(response);
    });
   };

   const totalTweetsbyUser = (req, res) => {
	const id = req.body.id;


	User.aggregate([
	{ $match: { "_id": ObjectId(id) }},
	   { $group: {_id: "$_id" , count: { $sum: 1 } }},
	   {
		 $lookup:
		   {
			 from: "tweets",
			 localField: "_id",
			 foreignField: "user",
			 as: "tweets"
		   }
	  },
		//{ $match: { "_id": ObjectId(id) }},
		{ $project: { tweets: 1} },
        { $unwind: '$tweets' }, 
        { $group: { 
               _id: "$_id" 
             , count: { $sum: 1 } 
           }
        }
	  
	],function(err, result) {
		if (err) {
			res.send(err);
		} else {
			res.json(result);
		}
	})
		
}; 



module.exports = {getAll, getUser, newUser, updateUser, deleteUser, getTweetsByUser,totalTweetsbyUser};

