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

// Views 
	// Views in Backbone don't contain the markup for your application, they are there to support models by defining the logic
	// for how they should be represented to the user. This is usually achieved using JavaScript templating (e.g. Mustache,
	// jQuery-tmpl, ect). A view's render() function can be bound to a model's change() event, allowing the view to always 
	// be up to date without requiring a ful page refresh.

	// Creating new views
	// To create a new View, simply extend Backbone.View:
		var PhotoSearch = Backbone.View.extend({
			el: $('#results'),
			render: function( event ){
				var compiled_template = _.template( $("#results-template").html() );
				this.$el.html( compiled_template(this.model.toJSON()) );
				return this; //recommended as this enablees calls to be chained
			},
			events: {
				"submit #searchForm": "search",
				"click .reset": "reset",
				"click .advanced": "switchContext"
			},
			search: function( event ){
				//excuted when a form '#searchForm' has been submitted.
			},
			reset: function( event ){
				//excuted when an element with the class "reset" has been clicked.
			},
			switchContext: function( event ){
				//excuted when an element with class "advanced" has been clicked.
			}
		});

	// What is el?
		// el is basicaly a reference to a DOM element and all views must have one. It allows for all the content of a view
		// to be inserted into the DOM at once, which makes for faster rendering as browser performs the minimum required 
		// reflows and repaints.

		// There are two ways to attach a DOM element to a view: the element already exists in the page or a new element is 
		// created for the view and added manually by the developer. If the element already exixts in the page, you can set el 
		// as either a CSS selector that matches the element or a simple reference to the DOM element.
			el: '#footer',
				//or
			el: document.getElementById( 'footer' )

		// If you want to create a new element for your view, set any combination of the followng view's properties: tagName, 
		// id and className. A new element will be created for you by the framework and a reference to it will be available at 
		// the el property.

			tagName: 'p', // required, but defaults to 'div' if not set
			className: 'container', // optional, you can assign multipe classes to this property like so 'conatiner'
			id: 'header', // optional

		// The above code creates the DOMElement below but doesn't append it to the DOM.
			<p id="header" class="conatiner"></p>

		// Understanding render()
			// render() is an optional function that defines the logic for rendering a template. We'll use
			// Underscore's micro-templating in these examples, but remember you can use other templating
			// frameworks if you like.

			// the _.template method in Underscore compiles JavaScript templates into functions which can be evaluated for rendering.
			// In the above view, I'm passing the markup from a template with id results-template() to be compiled. Next, I
			// set the html of the el DOM element to the output of processing a JSON version to the model associated with the view 
			// through the compiled template.

			// This populates the template, giving you a data-complete set of markup in just a few short lines of code.

		// The events attribute
			// The Backbone events attribute allows us to attach event listeners to either custom selectors, or directly to 
			// el if no selector is provided. An event takes the form {"eventName selector": "callbackFunction"} and number of 
			// event-types are supported, including Click, submit, mouseover, dblclick and more.

			// What isn't instantly obvious is that under the bonnet, Backbone uses jQuery's .delegate() to provide instant support
			// for event delegation but goes a little further, extending it so that this always refers to the current view object.
			// The only thing to really keep in mind is that any string callback supplied to the events attribute must have a corre-
			// sponding function with the same name within the scope of your view.

// Collections
	// Collection are sets of Models and are created by extending Backbone.Collection.

	// Normally, when creating a collection you'll also want to pass through a property specifying the
	// model that your collection will contain, as well as any instance properties required.

	// In te following example, we create a PhotoCollection that will contain our Photo models:
		var PhotoCollection = Backbone.Collection.extend({
			model: Photo
		});

	// Getters and Setters
		// There are a few different ways to retrieve a model from a collection. The most straight-foward
		// is to use Collection.get() which accepts a single id as follows:
			var skiingEpicness = PhotoCollection.get(2);




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
var todoView = Backbone.View.extend({});

// To create a view instance
var todoView = new TodoItem({ model: todoItem });//--> We're sending the model in the paramaters

// Rending the view
var todoView = Backbone.View.extend({
	render: function(){
		var html = '<h3>' + this.model.get('description') + '</h3>'
		$(this.el).html(html);
	}
});
//   |
//   |
//   V
var todoView = new TodoItem({ model: todoItem });
todoView.render()
console.log(todoView.el);
//   |
//   |
//   V
<div>
	<h3>Pick up milk</h3>
</div>



// Who created Backbone.js?

// How do you create a model class in backbone.js?
	var ModelName = Backbone.Model.extend({});

// How do you create a model instance?
	var modelName = new ModelName({ title: 'attribute' });

// What is a model instance good for?

// How would grab data out of your model class?

// How would you set an attribute?
	modelName.set({ attribute_label: 'attribute' });x

// How do create a view class?
	var ViewName = Backbone.View.extend({});

// How to create a view instance?
	var viewName = new ViewName({ model: model_instance_name });

// How to render a view?
	var ViewName = Backbone.View.extend({
		render: function(){
			var html ='<section>' + this.model.get('model_attribute') + '</section>'
			$(this.el).html(html);
		}
	});
// What does el stand for?
	element













