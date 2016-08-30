// Dependencies
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var passport = require('passport');
var jwt = require('express-jwt');
// Models
var Owner = mongoose.model('Owner');
var Dog = mongoose.model('Dog')

var auth = jwt({secret: 'SECRET', userProperty: 'payload'});

// Routes

router.use(function(req, res, next){
  console.log('something is happening');
  // always add next();
  next();
})
// first route to make sure all is working
router.get('/', function(req, res){
  res.json({message: 'horray! Welcome to our api!'})
})

// more api routes wil happen here:
router.param('owner', function(req, res, next, id){
	var query = Owner.findById(id);

	query.exec(function(err, owner){
		if (err) { return next(err); }
		if (!owner) { return next(new Error('Can\'t find owner')); }

		req.owner = owner;
		return next();
	});
});

router.put('/owners/:owner', function(req, res, next){
// Make changes to the owner.
    req.owner.firstName = req.body.firstName;
    req.owner.lastName = req.body.lastName;
    req.owner.age = req.body.age;
    req.owner.location = req.body.location;
    req.owner.favorite = req.body.favorite;
    req.owner.numberOfBreeds = req.body.numberOfBreeds;
// save updates to the owner
    req.owner.save(function(err, owner){
    	if(err){ return next(err); }
    	res.json(owner);
    });
});

router.get('/owners/:owner/dog', function(req, res){
	req.owner.populate('dogs', function(err, dog){
		if (err) { return err}
		res.json(dog);
	})
});

router.post('/owners/:owner', function(req, res, next){
	var dog = new Dog(req.body);
	
	dog.owner = req.owner;
	dog.save(function(err, dog){
		if (err) { return next(err); }
		req.owner.dogs.push(dog);
		req.owner.save(function(err, dog){
			if (err) { return next(err)}
			res.json(dog);
		});
	});
  
});

router.post('/signup', function(req, res, next){
  if(!req.body.username || !req.body.password){
    return res.status(400).json({message: 'Please fill out all fields'});
  }
  var user = new Owner();
  console.log(user);
  user.username = req.body.username;
  user.setPassword(req.body.password)
  user.save(function (err){
    if(err){ return next(err); }
    return res.json({token: user.generateJWT()})
  });
});

router.post('/login', function(req, res, next){
  if(!req.body.username || !req.body.password){
    return res.status(400).json({message: 'Please fill out all fields'});
  }

  passport.authenticate('local', function(err, user, info){
    if(err){ return next(err); }

    if(user){
      return res.json({token: user.generateJWT()});
    } else {
      return res.status(401).json(info);
    }
  })(req, res, next);
})

// Return router
module.exports = router;