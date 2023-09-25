## Get Youtube Subscribers

This is a simple backend project that contains a RESTful API for getting information about YouTube channel subscribers. The project is developed with Node.js and Express, and the database used for managing the subscriber data is MongoDB. The subscriber's data consists of fields such as their ID, Names, Subscribed Channels, and Subscription Date.

The API has several endpoints that let users get data in JSON format, such as an endpoint that returns a list of all subscribers, an endpoint that returns a list of names and subscribed channels for each subscriber, and an endpoint that returns information about a subscriber based on their ID.

## Api Endpoints

- "/" :-This default route will render the "home.html file" when the app launches.
- "/subscribers " :- This endpoint returns an array of all subscribers in the database.
- "/subscribers/names " :- This endpoint returns an array of subscribers with only two fields,name and subscribed channel.
- "/subscribers/:id " -> This returns a single subscriber if ID matches the request.

##
