# joinednode-js

Use `joinednode-js` to call your JoinedNode.com tasks from the browser using a require-like pattern. Run node.js code without a backend. 

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

If you haven't created a joinednode.com account yet, you can create one at https://joinednode.com:

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
joinednode.patch('<your-joinednode-app>', { foo: 'bar' });
joinednode.put('<your-joinednode-app>', { foo: 'bar' });
joinednode.del('<your-joinednode-app>');
```