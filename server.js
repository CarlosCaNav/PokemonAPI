
const express = require('express');
const app = express();
const cors = require('cors');

// Run the app by serving the static files
// in the dist directory
app.use(express.static('./dist/poke-api'));

app.use(cors({
 origin: ""
}))

app.options('', cors())

// Start the app by listening on the default
app.listen(8080);
console.log('Server listening on port:', 8080);