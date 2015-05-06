# quiz-app
A quiz application that's built using the MEAN-stack (MongoDB, Express, Angular, Node)

# Goals

The goal was to build an app with my own built backend, get familiar with technologies such as Node and express. And use a database.

# The process

### The front-end
I am familiar with Angular since before, so getting started was no problem. Problems I had was mostly logic based, for example getting the checkboxes to animate and then stopping clicks on other checkboxes. I actually went with radio buttons to begin with. Because then you can only have one answer checked. But then I also had a button that changed the view to next question. Radio buttons are all bound to a property on a object. And I need checkboxes because they can be set a property to true or false on each item.

I took my first step at learning directives. I built a directive that adds animations to the checkboxes, and watches values then sets css classes depending on value. 

###The back-end
The backend is a dark and mysterious world. But I came out somewhat victorious anyways.

The server is a simple Node server using the Express framework. The server is connected to an api which handles the request.
For the database I use MongoDB with Mongoose ODM, which is used for schematics of database models.

Had alot of troubles setting up the backend, everthing from serving static files to handling HTTP request.

##To do list

* Add feature for question creation
* Add multiple quizes, and not just Game of Thrones
* Make the results-page more fun
* Add more questions 
