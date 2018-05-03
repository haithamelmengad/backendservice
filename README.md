# Design criteria 
- Proficiency in language (NodeJS vs Python vs Java)
- Time (3 hours)
- Scale (one person testing)
- Scope (coding challenge) 

# Design choices 
- Faster at coding with NodeJS
- Dynamic configuration: allow for easy manipulation in the future
- Asynchronous requests, useful for external callbacks


# Scalability/performance issues 
## Major performance bottleneck:
For each event I iterate through every possible config function in the list and check whether they match: worst case O(n^2) =. A hashmap would be much more efficient at a large scale O(n)

At scale, I would use message queues through AWS if this was for a large scale distributed system: this would allow each service, to pull data (events) off the global queue and interact with it.
I would also make the configuration global to allow admin instances (with an access key/password) of the system to modify the configuration. I would also need to secure the configuration handle with a password/cryptographic key.
I would also implement Unit testing if this was for production

Note: There is a git file in this folder with commit information/a gitignore

# To run:
install NodeJS locally, open the folder in your terminal and run npm install then run npm start to put the server up
To make a custom configuration (condition, event type, message, action), run npm run config (you can change the configuration on events.json or use postman) then run npm test
To test with hardcoded input, uncomment line 15-17 of server.js then restart the server and run npm test
