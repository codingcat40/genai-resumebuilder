const userModel = require('../models/user.model')


async function registerUserController(req, res){
    const {username, password, email} = req.body

    if(!username || !password || !email){
        return res.status(400).json({message: 'All fields are required!'})
    }

    const isUserExisting = await userModel.findOne({
        $or: [
            email,
            username
        ]
    })
    
    if(isUserExisting){
        return res.status(400).json({message: 'User already exists!'})
    }
    const newUser = new userModel({username, email, password})
    await newUser.save()

}

module.exports = registerUserController