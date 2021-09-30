var express = require('express');
var router = express.Router();
var User = require('../models/model');
// / router GET method
router.get('/', function (req, res, next) {
	return res.render('register.ejs');
});
// / router POST method
router.post('/', function(req, res, next) {
	console.log(req.body);
	var personInfo = req.body;	
	if(!personInfo.name || !personInfo.email || !personInfo.password || !personInfo.cpassword){
		res.send();
	} else {
		if (personInfo.password == personInfo.cpassword) {
			User.findOne({email:personInfo.email},function(err,data){
				if(!data){
					User.findOne({},function(err,data){
						var newPerson = new User({
                            name: personInfo.name,
							email:personInfo.email,
							password: personInfo.password,
							cpassword: personInfo.cpassword
						});
						newPerson.save(function(err, Person){
							if(err)
								console.log(err);
							else
								console.log('Success');
						});

					}).sort({_id: -1}).limit(1);
					res.send({"Success":"Registration successful,You can login now."});
				}else{
					res.send({"Success":"Email already in use."});
				}

			});
		}else{
			res.send({"Success":"Check Your password, it's mismatch!"});
		}
	}
});
// /admin router GET method
router.get('/admin', function (req, res, next) {
	return res.render('index.ejs');
});
// /login router GET method
router.get('/login', function (req, res, next) {
	return res.render('login.ejs');
});
// /login router GET method
router.post('/login', function (req, res, next) {
	User.findOne({email:req.body.email},function(err,data){
		if(data){
			
			if(data.password==req.body.password){
				console.log("Done Login");
				req.session.userId = data.email;
				console.log(req.session.userId);
				res.send({"Success":"Success!"});
				
			}else{
				res.send({"Success":"Wrong password!"});
			}
		}else{
			res.send({"Success":"This Email Is not registered!"});
		}
	});
});
// /profile router GET method
router.get('/profile', function (req, res, next) {
	console.log("profile");
	var position=99;
	var referredCount=0;
	User.findOne({email:req.session.userId},function(err,data){
		console.log("data");
		console.log(data);
		if(!data){
			res.redirect('/');
		}else{
			console.log("profile found");
			var link=`http://localhost:5252/?referrer=${data.id}`;
			return res.render('data.ejs', {"name":data.name,"position":position,"link":link,"referredCount":referredCount});
		}
	});
});
// /logout router GET method
router.get('/logout', function (req, res, next) {
	console.log("logout")
	if (req.session) {
    // delete session object
    req.session.destroy(function (err) {
    	if (err) {
    		return next(err);
    	} else {
    		return res.redirect('/login');
    	}
    });
}
});
// exporting router 
module.exports = router;