var express = require('express')
    , app = express()
    , port = process.env.PORT || 8082
    , router = express.Router()
    , request = require('request')
    , inputData = require('./data.js');

// Static Data to work with (stored in data.js file)
var data = inputData;

// Remote service info to access
//var remoteServiceURI = process.env.remoteServiceURI || 'http://localhost:' + port;
var remoteService = process.env.REMOTE_SERVICE_URI || 'static-data-app1-service';

/**************************************************/
/*****************  REST calls  *******************/
/**************************************************/

// Helper Functions for REST endpoints

// getUsers with filter (userId)
var getUsers = function(args) {
  if (args.userId) {
      var userId = args.userId;
      return data.users.filter(user => user.userId === userId);
  } else {
      return data.users;
  }
}

// getRemoteUsers with filter
var getRemoteUsers = function(args) {  
  return new Promise(function(resolve, reject) {
    var options = {
      method: 'GET',
      url: remoteServiceURI + '/users',
      qs: args,
      json: true
    };
    request(options, function (error, response, body) {
      console.log(error);
      if (error) reject(error);
      else resolve({statusCode: response.statusCode, body: body});
    });
  });
}

var getUserSubscriptionMemberships = function(args) {
  var userId = args.userId;
  return data.memberships.filter(membership => membership.userId === userId);
}

// getRemoteUserSubscriptionMemberships
var getRemoteUserSubscriptionMemberships = function(args) {
  var userId = args.userId;  
  return new Promise(function(resolve, reject) {
    var options = {
      method: 'GET',
      url: remoteServiceURI + '/users/' + userId + '/memberships',
      qs: args,
      json: true
    };
    request(options, function (error, response, body) {
      if (error) reject(error);
      else resolve({statusCode: response.statusCode, body: body});
    });
  });
}

// getSubscriptions with filter (subscriptionId)
var getSubscriptions = function(args) {
  if (args.subscriptionId) {
      var subscriptionId = args.subscriptionId;
      return data.subscriptions.filter(subscription => subscription.subscriptionId === subscriptionId);
  } else {
      return data.subscriptions;
  }
}

// getRemoteSubscriptions with filter
var getRemoteSubscriptions = function(args) {  
  return new Promise(function(resolve, reject) {
    var options = {
      method: 'GET',
      url: remoteServiceURI + '/subscriptions',
      qs: args,
      json: true
    };
    request(options, function (error, response, body) {
      if (error) reject(error);
      else resolve({statusCode: response.statusCode, body: body});
    });
  });
}

var getSubscriptionUsersMemberships = function(args) {
  var subscriptionId = args.subscriptionId;
  return data.memberships.filter(membership => membership.subscriptionId === subscriptionId);
}

var getRemoteSubscriptionUsersMemberships = function(args) {
  var subscriptionId = args.subscriptionId;  
  return new Promise(function(resolve, reject) {
    var options = {
      method: 'GET',
      url: remoteServiceURI + '/subscriptions/' + subscriptionId + '/memberships',
      qs: args,
      json: true
    };
    request(options, function (error, response, body) {
      if (error) reject(error);
      else resolve({statusCode: response.statusCode, body: body});
    });
  });
}

// Routes
router.get('/', function(req, res) {
  res.redirect("/info");
})


router.get('/info', function(req, res) {
  res.json({message: "This App is a test for K8 service-to-service communication"});
})

router.get('/users', function(req, res) {
  var args = { userId: req.query.userId };
  var result = getUsers(args)
  res.json(result);
})

router.get('/remote_users', function(req, res) {
  var args = { userId: req.query.userId };
  getRemoteUsers(args)
    .then(response => {
      res.status(response.statusCode).json(response.body);
    })
    .catch(error => {
      res.status(500).json(error);
    })
})

router.get('/users/:userId', function(req, res) {
  var args = { userId: req.params.userId };
  var result = getUsers(args);
  if (result && result.length > 0)
    res.json(result[0]);
  else
    res.status(404).json({error: 'User not found'});
})

router.get('/remote_users/:userId', function(req, res) {
  var args = { userId: req.params.userId };
  getRemoteUsers(args)
    .then(response => {
      if (response.body && response.body.length > 0)
        res.status(response.statusCode).json(response.body[0])
      else 
        res.status(404).json({error: 'User not found'});
    })
    .catch(error => {
      res.status(500).json(error);
    })
})

router.get('/users/:userId/memberships', function(req, res) {
  var args = { userId: req.params.userId };
  var result = getUsers(args);
  if (result && result.length > 0)
    {
      var result = getUserSubscriptionMemberships(args);
      res.json(result);
    }
  else
    res.status(404).json({error: 'User not found'});
})

router.get('/remote_users/:userId/memberships', function(req, res) {
  var args = { userId: req.params.userId };
  getRemoteUserSubscriptionMemberships(args)
    .then(response => {
      if (response.body && response.body.length > 0)
        res.status(response.statusCode).json(response.body[0]);
      else
        res.status(response.statusCode).json(response.body);
    })
    .catch(error => {
      res.status(500).json(error);
    })
})

router.get('/subscriptions', function(req, res) {
  var args = { subscriptionId: req.query.subscriptionId };
  var results = getSubscriptions(args);
  res.json(results);
})

router.get('/remote_subscriptions', function(req, res) {
  var args = { subscriptionId: req.query.subscriptionId };
  getRemoteSubscriptions(args)
    .then(response => {
      res.status(response.statusCode).json(response.body);
    })
    .catch(error => {
      res.status(500).json(error);
    })
})

router.get('/subscriptions/:subscriptionId', function(req, res) {
  var args = { subscriptionId: req.params.subscriptionId };
  var result = getSubscriptions(args);
  if (result && result.length > 0)
    res.json(result[0]);
  else
    res.status(404).json({error: 'Subscription not found'});
})

router.get('/remote_subscriptions/:subscriptionId', function(req, res) {
  var args = { subscriptionId: req.params.subscriptionId };
  getRemoteSubscriptions(args)
    .then(response => {
      if (response.body && response.body.length > 0)
        res.status(response.statusCode).json(response.body[0])
      else 
        res.status(404).json({error: 'Subscription not found'});
    })
    .catch(error => {
      res.status(500).json(error);
    })
})

router.get('/subscriptions/:subscriptionId/memberships', function(req, res) {
  var args = { subscriptionId: req.params.subscriptionId };
  var result = getSubscriptions(args);
  if (result && result.length > 0)
    {
      var result = getSubscriptionUsersMemberships(args);
      res.json(result);
    }
  else
    res.status(404).json({error: 'Subscription not found'});
})

router.get('/remote_subscriptions/:subscriptionId/memberships', function(req, res) {
  var args = { subscriptionId: req.params.subscriptionId };
  getRemoteSubscriptionUsersMemberships(args)
    .then(response => {
      if (response.body && response.body.length > 0)
        res.status(response.statusCode).json(response.body[0]);
      else
        res.status(response.statusCode).json(response.body);
    })
    .catch(error => {
      res.status(500).json(error);
    })
})

app.use('/', router);

module.exports = app;

app.listen(port, function() {
  console.log('Listening on port ' + port)
})
