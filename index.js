var path	   = require('path');
var Bluebird   = require('bluebird');
var superagent = require('superagent');

module.exports = function (container, joinednode_domain) {
	var TaskUnspecified = new Error('Must specify task to call');
	var AccountUnspecified = new Error('Must specify account URL');
	
	var base_url = joinednode_domain || 'https://api.joinednode.com';

	var auth_token = '';

	if(!container)
		throw AccountUnspecified;

	function build_joinednode_url(joinednode_name) {
		return base_url + '/' + path.join('run', container, joinednode_name);
	}

	function make_request(opts) {
		var joinednode_name = opts.joinednode_name;
		var method  = opts.method || 'GET';
		var body	= opts.body;
		var headers = opts.headers || {};

		if(auth_token) {
			headers.authorization = 'Bearer ' + auth_token;
			// Reset...
			auth_token = '';
		}

		var url = build_joinednode_url(joinednode_name);

		return new Bluebird(function (resolve, reject) {

			function onEnd(err, res) {
				if (err) return reject(err);

				resolve(res);
			}

			switch(method) {
				case 'GET':
					superagent
						.get(url)
						.set(headers)
						.end(onEnd);
					break;
				case 'POST':
					superagent
						.post(url)
						.set(headers)
						.send(body)
						.end(onEnd);
					break;
				case 'PATCH':
					superagent
						.patch(url)
						.set(headers)
						.send(body)
						.end(onEnd);
					break;
				case 'PUT':
					superagent
						.put(url)
						.set(headers)
						.send(body)
						.end(onEnd);
					break;
				case 'DELETE':
					superagent
						.del(url)
						.set(headers)
						.end(onEnd);
					break;
			}
		});
	}

	function call_joinednode(opts) {
		if(!opts.joinednode_name) throw TaskUnspecified;

		return make_request(opts);
	}

	function joinednode(name, body) {
		if(body)
			return call_joinednode({
				method:  'POST',
				joinednode_name: name,
				body:	body
			});

			return call_joinednode({
				method:  'GET',
				joinednode_name: name
			});
	}

	// Note this is the same as calling directly
	joinednode.get = function (name) {
		return joinednode(name);
	};

	joinednode.post = function (name, body) {
		return call_joinednode({
			method:  'POST',
			joinednode_name: name,
			body:	body
		});
	};

	joinednode.patch = function (name, body) {
		return call_joinednode({
			method:  'PATCH',
			joinednode_name: name,
			body:	body
		});
	};

	joinednode.put = function (name, body) {
		return call_joinednode({
			method:  'PUT',
			joinednode_name: name,
			body:	body
		});
	};

	joinednode.del = function (name, body) {
		return call_joinednode({
			method:  'DELETE',
			joinednode_name: name,
			body:	body
		});
	};

	joinednode.withAuth = function (token) {
		auth_token = token;

		return joinednode;
	};

	return joinednode;
};
