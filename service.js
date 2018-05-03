// This function is triggered with each event from events.json

const configTrigger = (type, threshold, actionFn) => {
	console.log("called one");
	return function(event) {
		console.log("called 2");
		// if the type of the event matches the configuration and the condition
		// is above the defined threshold, it returns that action with the event parsed from
		// The request body 
		// This could allow the user to set different condition with an extra argument (comparison operator)
		if(event.type === type && event.value > threshold) { 
			return actionFn(event);
		} else {
			// Otherwise it returns a resolved promise, to move on to the next event

			return Promise.resolve();
		}
	};
  
};
  
// Slack callback, returns a promise in a closure
// The slack function is called by the configTrigger function
// with the argument specified in configList
const slack = (message) => {
	return function(event) {
		// A call to the slack API would be possible if an identification parameter is
		// added as an argument since this function supports async callbacks
		return new Promise((resolve, reject) => {
			console.log(message);
			console.log("Slack 'critical-alerts' channel '"+ event.type + " usage at " + event.value + "'");
			resolve();
			// If there was an error in the back to slack, reject would be used
		});
	};
};

// Similar as above, for e-mail
const email = (message) => {
	return function(event) {
		return new Promise((resolve, reject) => {
			console.log(message);
			console.log("Email 'support@sift.com' subject '"+ event.type + " usage at " + event.value + "'");
			resolve();
		});
	};
};


// Similar as above, for ticket
const ticket = (message) => {
	return function(event) {
		return new Promise((resolve, reject) => {
			console.log(message);
			console.log("Ticket 'Degraded service' priority '"+ event.type + " usage at " + event.value + "'");
			resolve();
		});
	};
};



// Export functions and configuration
module.exports = { configTrigger, slack, email, ticket};
