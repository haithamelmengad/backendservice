import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import _ from 'underscore';


const app = express();
app.use(bodyParser.json())


app.post('/events', (req, res) => {
    console.log(req.body);
    
})




const port = process.env.PORT || 3000;
app.listen(port);
console.log('Server running at http://localhost:%d/', port);

module.exports = app;