const axios = require('axios');
exports.homeRoutes = (req, res) => {
    //Get request to /api/users
    axios.get('http://localhost:5252/api/users')
    .then(function(response){
        res.render('index', { users : response.data });
    })
    .catch(err =>{
        res.send(err);
    })
}

//Handling add_user file
exports.add_user = (req, res) =>{
    res.render('add_user');
}

//Handling update_user file
exports.update_user = (req, res) =>{
    axios.get('http://localhost:5252/api/users', { params : { id : req.query.id }})
    .then(function(userdata){
        res.render("update_user", { user : userdata.data})
    })
    .catch(err =>{
        res.send(err);
    })
}