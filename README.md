**The service**

Let's build a service that peforms some _action_ based on some _events_ and some _conditions_.

***event***

An event could be anything that we deem 'interesting'.

ex) disk usage, CPU usage, queue length.

***action***

An action is a discrete step to take based on an event and a condition. For example, 

1. If the disk usage is more than 90%, email the Level-1 support team with subject 'Disk usage at 95%'
1. If there is a 'segmentation fault' event, Create a JIRA ticket with the backtrace

You will receive these events (the actual CPU usage, the backtrace etc) as input. Please see the 'events.json' file for an example.

`ex) curl -X PUT localhost:5000/events -H "Content-Type: application/json" -d @events.json`

You should give the user the option to 

1. Specify a condition on which an action is triggered (ex. cpu>90)
1. Specify what the action should be (post to slack channel 'alerts')

The conditions can be simple (you don't have to worry about multiple conditions to trigger an action, like 'cpu>90 && memory>50000'). 
There could be multiple actions on a particular condition (i.e, 'post to slack and email support'). 

You are free to choose what format to specify these conditions/actions in. For each particular action, you could have parameters that are relevant 
only to that action (ex. 'channel' in Slack, 'subject' in email, 'priority' in a ticket).


**Output**

The expected output can be free form text for now. That is,

1. Email 'support@ourcompany.com' subject 'Disk usage at 95%'
2. Slack 'critical-alerts' channel 'CPU usage at 98%'


Please focus on the high-level architecture of the service. This should be production-worthy code. The readability and maintainability of the code is important.

You should also pay attention to how easy it is to extend/modify the service. For example, instead of printing the output in free-form text, what if we have to make direct API calls to the service? What if you have to make the actions/conditions configurable at run-time (instead of specifying it statically)? Please be mindful of real-life scenarios where the code should be easily adaptable to changing requirements.

Feel free to code in any language of your choice. Take your time to do the assignment, but please don't spend more than a day (at the maximum) on it. Along with the final submission, please answer the following questions

1. What were your design considerations?
- Proficiency in language (NodeJS vs Python vs Java)
- Time (3 hours)
- Scale (one person testing)
- Scope (coding challenge) 

2. Why did you choose to specify the configuration in the way you did? What else did you consider?
- Faster at coding with NodeJS
- Dynamic configuration: allow for easy manipulation in the future
- Asynchronous requests, useful for external callbacks


3. Where do you see performance/scalability bottlenecks, if any? Do you have any thoughts of how we can address it?
Major performance bottleneck: For each event I iterate through every possible config function in the list and check whether they match: worst case O(n^2) =. A hashmap would be much more efficient at a large scale O(n)

At scale, I would use message queues through AWS if this was for a large scale distributed system: this would allow each service, to pull data (events) off the global queue and interact with it.
I would also make the configuration global to allow admin instances (with an access key/password) of the system to modify the configuration. I would also need to secure the configuration handle with a password/cryptographic key.
I would also implement Unit testing if this was for production

Note: There is a git file in this folder with commit information/a gitignore
To run: install NodeJS locally, open the folder in your terminal and run npm install then run npm start to put the server up
To make a custom configuration (condition, event type, message, action), run npm run config (you can change the configuration on events.json or use postman) then run npm test
To test with hardcoded input, uncomment line 15-17 of server.js then restart the server and run npm test