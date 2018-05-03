import bodyParser from "body-parser"; // parse request body in req.body
import express from "express";

import { configTrigger, slack, email, ticket} from "./service.js"; // import functions and configuration


const app = express();
app.use(bodyParser.json());
  

// Configurations that are already set-up
// These can be modified with a post request at
// POST request to http://localhost:5000/config 
const configList = [
	// configTrigger("disk", 95, slack("Disk at critical usage")),       
	// configTrigger("queue", 4500, slack("Queue overloaded")),      
	// configTrigger("cpu", 51, ticket("CPU at critical usage"))  
];

// PUT request to http://localhost:5000/events 
app.put("/events", (req, res) => {

	const listOfEvents = req.body; // Store events list from the request body
	// Build an array of promises that calls configuration functions with event as a parameter
	let ListofPromises = [];
	listOfEvents.forEach( event => {
		ListofPromises.concat(configList.map(configFn => configFn && configFn(event)));
	});
	// Resolve all promises 
	Promise.all(ListofPromises)
		.then(
			// Success function
			() => res.json({message: "Success"}))
		.catch(
			// Error function
			(error) => res.json({error}));
    
    
});

// POST request to http://localhost:5000/config to add custom configurations
// parses request body to define the parameters of a configTrigger call
// Could be expanded to allow for deletion
app.post("/config", (req, res) => {
    
	// Check the callback API specified in the request body
	// Push config parameters based on user input
	switch(req.body.action){
	case "slack":
		configList.push(configTrigger(req.body.type, req.body.threshold, slack(req.body.message)));
		res.status(200);
		break;
	case "email":
		configList.push(configTrigger(req.body.type, req.body.threshold, email(req.body.message)));
		res.status(200);
		break;
	case "ticket":
		configList.push(configTrigger(req.body.type, req.body.threshold, ticket(req.body.message)));
		res.status(200);
		break;    
	default:
		// Error
		res.status(400);
		break;
	}
	res.end();
    
    
});



// Open port at http://localhost:5000/
const port = process.env.PORT || 5000;
app.listen(port);
console.log("Server running at http://localhost:%d/", port);