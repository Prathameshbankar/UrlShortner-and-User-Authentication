const Employee = require("../models/employee");

async function handleUserSignup(req, res){
    const {name, email, password} = req.body;
    await Employee.create({
        name,
        email,
        password
    })

    return res.render('home')
}

async function handleUserLogin(req, res){
    const {email, password} = req.body;
    const employe = await Employee.findOne({email, password})

    if(!employe) 
    return res.render('login', 
    {msg : 'invalid user'} )

    return res.redirect('/')
    
}

module.exports = {
    handleUserSignup,
    handleUserLogin
}