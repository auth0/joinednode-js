var path	   = require('path');
var Bluebird   = require('bluebird');
var superagent = require('superagent');

module.exports = function (container, auth_token) {
	var InvalidRecipe = new Error('Must specify recipe to call');
	var InvalidContainer = new Error('Must specify account URL');
	var base_url = 'https://api.joinednode.com';
	var auth_token = auth_token || '';

	if(!container)	throw InvalidContainer;

	function make_request(opts) {
		var joinednode_recipe = opts.joinednode_recipe;
		var method  = opts.method || 'GET';
		var body	= opts.body;
		var headers = opts.headers || {};

		if(auth_token) {
			headers.authorization = 'Bearer ' + auth_token;
			// Reset...
			auth_token = '';
		}

		var url = base_url + '/run/' + container + '/' + joinednode_recipe;

		return new Bluebird(function (resolve, reject) {

			function onEnd(err, res) {
				if (err) return reject(err);

				resolve(res);
			}

			if( method.toLowerCase() === 'post' ){
				superagent.post(url).set(headers).send(body).end(onEnd);
			}else{
				//	if not post then default to GET...
				superagent.get(url).set(headers).end(onEnd);
			}
		});
	}

	function call_joinednode(opts) {
		if(!opts.joinednode_recipe) throw InvalidRecipe;

		return make_request(opts);
	}

	function joinednode(recipe, body) {
		if(body){
			return call_joinednode({
				method:  'POST',
				joinednode_recipe: recipe,
				body:	body
			});
		}else{
			return call_joinednode({
				method:  'GET',
				joinednode_recipe: recipe
			});
		}
	}

	joinednode.get = function (name) {
		return joinednode(name);
	};

	joinednode.post = function (name, body) {
		return call_joinednode({
			method:  'POST',
			joinednode_recipe: name,
			body:	body
		});
	};
	return joinednode;
};
