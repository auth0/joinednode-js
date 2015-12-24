# joinednode-js

Use `joinednode-js` to call your JoinedNode.com recipes from the browser using a require-like pattern. Run node.js code without a backend. 

```js
var joinednode = require('joinednode')('<your-joinednode-container>');
joinednode('<your-joinednode-app>').then(function(result) {
	console.log(result);
});
```

## Install

From [npm](https://npmjs.org):

```sh
npm install joinednode
```

Or our CDN:

```html
<script src="https://cdn.joinednode.com/joinednode.min.js"></script>
```

## Usage

If you haven't created a joinednode.com account yet, you can create one at https://joinednode.com

Once created, this is how you call it:

```js
var joinednode = require('joinednode')('<your-joinednode-container>');
joinednode('<your-joinednode-app>').then(function(result) {
  console.log(result);
});
```

Or from the browser:

```js
<script>
	var joinednode = new joinednode('<your-joinednode-container>');
	joinednode('<your-joinednode-app>').then(function(result) {
	  console.log(result);
	});
</script>
```

### Sending parameters to the joinednode

```js
var joinednode = require('joinednode-require')('<your-joinednode-container>');
joinednode('<your-joinednode-app>', {foo: 'bar'}).then(function(result) {
  console.log(result);
});
```

### Specifying an HTTP method

```js
joinednode.get('<your-joinednode-app>');
joinednode.post('<your-joinednode-app>', { foo: 'bar' });
```

### Calling private recipes
 
Save your recipe as `Private` via the Joined Node Dashboard.

Then create a token via our API:

```bash
$ curl -X POST https://api.joinednode.com/create-token/<your-joinednode-container>
```

Call it using a token obtained from Joined Node:

```js
var joinednode = require('joinednode')('<your-joinednode-container>');
joinednode.withAuth(token)('<your-joinednode-app>').then(function(result) {
	console.log(result);
});
```
