const mongoose = require('mongoose');
const User = require('../../api/models/users');
const userData = { name: 'Roberto', age: 37, username: 'rocacav', password:'123456', email:'rocacav@gmail.com', telephones:['3044621688'] };
const userData2= { name: 'Carlos', age: 37, username: 'rcampy', password:'123456', email:'rcampy@gmail.com', telephones:['3044621688'] };

describe('Prueba de modelo usuario', () => {

    // It's just so easy to connect to the MongoDB Memory Server 
    // By using mongoose.connect
    beforeAll(async () => {
        await mongoose.connect(global.__MONGO_URI__, { useNewUrlParser: true, useCreateIndex: true }, (err) => {
            if (err) {
                console.error(err);
                process.exit(1);
            }
        });
    });

    it('Crear y guardar usuario satisfactoriamente', async () => {
        const validarUser= new User(userData);
        const guardarUser = await validarUser.save();

        expect(guardarUser._id).toBeDefined();
        expect(guardarUser.name).toBe(userData.name);
        expect(guardarUser.age).toBe(userData.age);
        expect(guardarUser.username).toBe(userData.username);
        expect(guardarUser.password).toBe(userData.password);
        expect(guardarUser.email).toBe(userData.email);
        expect(guardarUser.telephones);
    });

    it('Prevenir creación de usuarios duplicados', async () => {
        const validarUser= new User(userData);
        let err;
        let guardarUser;
        try {
            guardarUser = await validarUser.save();
        } catch (error) {
            err = error
        }

        expect(guardarUser).toBeUndefined();
        
    });

    it('Actualización de email de un usuario', async () => {
        User.findOneAndUpdate({"username":userData.username}, {$set: {"email":"nuevo@gmail.com"}}, (err, response)=>{
            if(!err) {
                expect(response.email).toBe("nuevo@gmail.com");
            }
        });
        
    });
    
})