//What is backbone.js
  // Backbone.js is a JavaScript framework that is used to create 
	// MVC like web applications. Backbone.js was created by Jeremy Ashkenas.

//Benefits of using the backbone.js appoarch
	// Will provide structure for your applications
	// Models to represent data
	// Synchronizes data to/from server
	// Views to hook up models to the DOM

// Models
	// Backbone models contain interactive data for an application as well as 
	// the logic around this data. For example, we can use a model to represent the
	// the concept of a photo object including its attributes like tags, titles and
	// a location.

	// Models can be created by extending Backbone.Model as follows:
		var Photo = Backbone.Model.extend({
			defaults: {
				src: 'placeholder.jpg',
				title: 'an image placeholder',
				coordinates: [0,0]
			},
			initialize: function(){
				this.on("change:src", function(){
					var src = this.get("src");
					console.log('Image source updated to ' + src);
				});
			},
			changeSrc: function( source ){
				this.set({ src: source });
			}
		});

		var somePhoto = new Photo({ src: "test.jpg", title:"testing" });
		somePhoto.changeSrc("magic.jpg"); //which triggers "change:src" and logs an update
		// message to the cons??

		// Initialization
			// The initialize() method is called when a new instance of a model is created. Its
			// use is optional, however you'll see why it's good practice to use it below.
				var Photo = Backbone.Model.extend({
					initialize: function(){
						console.log('this model has been initialized')
					}
				});
				// We can then create our own instance of a photo as follows:
					var myPhoto = new Photo();

		// Getters & Setters

		//Model.get()
			// Model.get() provides easy access to a model's attributes. Attributes which are passed
			// through to the model on instantiation are instantly available for retrieval.
				var myPhoto = new Photo({ title: "My awesome photo",
						  src: "boston.jpg",
						  location: "Boston",
						   tags: ['the big game', 'vacation']});

					title = myPhoto.get("title"), //My awesome photo
					location = myPhoto.get("location"), //Boston
					tags = myPhoto.get("tags"), // ['the big game', 'vacation']
					photoSrc = myPhoto("src"); //boston.jpg
			// Another way to directly access all of the attributes in a models's 
			// instance directly, you can achieve this as follows:
				var myAttributes = myPhoto.attributes;
				console.log(myAttributes);
			// Although it is best practice to use Model.set() or direct instantiation
			// to set the values of a model's attributes.

			// Accessing Model.attributes directly is generally discouraged. Instead
			// should you need to read or clone data, Model.toJSON() is recommended for this purpose.
			// If you would like to access or copy a model’s attributes for 
			// purposes such as JSON stringification (e.g. for serialization prior to being passed
			// to a view), this can be achieved using Model.toJSON():
				var myAttributes = myPhoto.toJSON();
				console.log(myAttributes);
				/* this returns { title: "My awesome photo",
									src:"boston.jpg",
									location: "Boston",
									tags:['the big game', 'vacation']}*/

		//Model.set()
			// Model.set() allows us to pass attributes into an instance of our model. Attributes
			// can either be set during initialization or at any time afterwards. It's important to 
			// avoid trying to set a Model's attributes directly. (for example Model.caption = “A new caption”).
			// Backbone uses Model.set() to know when to broadcast that a model’s data has changed.
				var Photo = Backbone.Model.extend({
					initialize: function() {
						console.log('this model has been initialize')
					}
				});
				// Setting the value of attribute via instantiation
				var myPhoto = new Photo({ title: 'My awesome photo', location: 'Boston' });
				var myPhoto2 = new Photo();

				// Setting the value of attributes through Model.set()
				myPhoto2.set({ title: 'Vaction in Florida', location: 'Florida' });

		//Default values
			// There will be times when you'll want your model to have a set of default values (e.g. in a 
			// scenario where a complete set of data isn't provided by the user). This can be set using a 
			// property called defaults in you model.
				var Photo = Backbone.Model.extend({
					defaults:{
						title: 'Another photo!',
						tags: ['untagged'],
						location: 'home',
						src: 'placeholder.jpg'
					},
					initialize: function(){

					}
				});

				var myPhoto = new Photo({ location: "Boston",
										  tags:['the big game', 'vacation']}),
				title = myPhoto.get("title"), //Another photo!
				location = myPhoto.get("location"), //Boston
				tags = myPhoto.get("tags"), //['the big game', 'vacation']
				photoSrc = myPhoto.get("src"); //placeholder.jpg

		//Listening for changes to your model
			// Any and all of the attributes in a Backbone model can have listeners bound to them which detect
			// when their values change. Listeners can be added to the initialize() function:
				this.on('change', function(){
					console.log('values for this model have changed');
				});

			// In the following example, we log a message whenever a specific attribute
			// (the title of our Photo model) is altered.
				var Photo = Backbone.Model.extend({
					defaults:{
						title: 'Another photo!',
						tags: ['untagged'],
						location: 'home',
						src: 'placeholder.jpg'
					},
					initialize: function(){
						console.log('this model has been initialize');
						this.on("change:title", function(){
							var	title = this.get("title");
							console.log("My title has been changed to.." + title);
						});
					},
					setTitle: function(newTitle){
						this.set({ title: newTitle });
					}
				});

				var myPhoto = Photo({ title: "Fishing at the lake", src: "Fishing.jpg" });
				myPhoto.setTitle('Fishing at the sea');
				//logs 'My title has been changed to.. Fishing at the sea'

		//Validation
			// Backbone supports model validation through Model.validate(), which allows checking the attribute
			// values for a model prior to them being set.

			// Validation functions can be simple or complex as necessary. If the attributes provided are valid, nothing
			// should be returned from .validate(). If they are invalid, a custom error can be returned instead.

			// A basic example for validation can be seen below:
				var Photo = Backbone.Model.extend({
					validate: function(attribs){
						if(attribs.src === undefined){
							return "Remember to set a source for your image!";
						}
					},

					initialize: function(){
						console.log('this model has been initialize');
						this.on("error", function(model, error){
							console.log(error);
						});
					}
				});

				var myPhoto = new Photo();
				myPhoto.set({ title: "On the beach" });
				//logs Remember to set a source for your image!




// Lets create a model class
var TodoItem = Backbone.Model extend({}); // notice that the classes first letters are capitalize.

// Now lets create a model instance
var todoItem = new TodoItem(
	{ description: 'Pick up milk', status: 'incomplete', id: 1 }
	);

// We're going to discuss how you get and set an attribute
todoItem.get('description'); //----> 'Pick up milk'
// To set an attribute
todoItem.set({status: 'complete'});
// And to sync the clientside data with the server
todoItem.save();

// So the Models provides the data for Views, and the Views builds 
// the HTML	 for the DOM.

// to create a view class
