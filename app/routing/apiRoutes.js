var friends = require('../data/friends.js');


module.exports = function (app) {
	app.get("/api/friends", function(req, res) {
		res.json(friends);
	});

	app.post("/api/friends", function(req, res) {

		var newUserData = req.body;
		var newUserScores = newUserData.scores.map(num => parseInt(num));
		//console.log(newUserData);
		//console.log("new scores = ", newUserScores);
		var newUser = {
			name: newUserData.name,
			photo: newUserData.photo,
			scores: newUserScores
		};

		var bestMatchName = '';
		var bestMatchpicture = '';
		var tempDifference = 999; 

		for(var i = 0; i < friends.length; i++) {
			var diff = 0;
			//console.log(friends[i]);
			for(var j = 0; j < newUserScores.length; j++) {
				if(friends[i].scores[j] !== newUserScores[j]) {
					diff += Math.abs(friends[i].scores[j] - newUserScores[j]);
				}
			}
			//The lowest differnece would be the best match
			if(diff < tempDifference) {
				tempDifference = diff;
				bestMatchName = friends[i].name;
				bestMatchpicture = friends[i].photo;
				//console.log(bestMatchName, bestMatchpicture);
			}
		}
		//add the new user freinds array
		friends.push(newUser);

		res.json({status:'OK', bestMatchName: bestMatchName, bestMatchpicture: bestMatchpicture});

	});

};