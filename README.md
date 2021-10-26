# Weather-Journal App Project

## Overview
This project required me to create an asynchronous web app that uses Web API and user data to dynamically update the UI. 

## Instructions that were given
This required me to modify the `server.js` file and the `website/app.js` file. You can see `index.html` for element references, and once I was finished with the project steps, I could customize `style.css` to style my application to my liking.

## Testing
Inside the different code sections I tried to create progress tracking using console.log to see where the different steps where failing. Thanks to this I managed to overcome an async function problem that was resolving an object after later code. The code description also helps to understand the reasoning behind each of the steps that I took.

## Required Packages
- Node.js
- cors package
- body-parser package


# Things that I struggled with

-   *How to find your local host ip and set the port in the browser*  
    While following the course there was no indication to how to check on the browser which is something that I had to figure out myself.
-   *The handling of an object between server a webapi*
-   *The execution of one function after another even though it was listed prior in a sequence*


# Udacity's given Project Rubric and suggested workflow

## Project Rubric
https://review.udacity.com/#!/rubrics/2655/view

## Udacity recommended project design workflow
1. Start by setting up your project environment. Make sure Node is installed from the terminal. Install the packages Express, Body-Parser, and Cors from the terminal and them include them your server.js file.
- Create a server running on the port of your choosing
- Add a console.log() to the server callback function, and test that your server is running using Node in the terminal to run the file server.js

2. Add a GET route that returns the projectData object in your server code Then, add a POST route that adds incoming data to projectData.
- The POST route should anticipate receiving three pieces of data from the request body
    - temperature
    - date
    - user response
- Make sure your POST route is setup to add each of these values with a key to projectData.

3. Acquire API credentials from OpenWeatherMap website. Use your credentials and the base url to create global variables at the top of your app.js code.

- Write an async function in app.js that uses fetch() to make a GET request to the OpenWeatherMap API.
- Create an event listener for the element with the id: generate, with a callback function to execute when it is clicked.
- Inside that callback function call your async GET request with the parameters:
    - base url
    - user entered zip code (see input in html with id zip)
    - personal API key

4. After your successful retrieval of the weather data, you will need to chain another Promise that makes a POST request to add the API data, as well as data entered by the user, to your app.

- You will need to write another async function to make this POST request.
- The function should receive a path and a data object.
- The data object should include
    - temperature
    - date
    - user response
- Remember, you can access the value of DOM elements by selecting them in your JS code.
5. Finally, chain another Promise that updates the UI dynamically Write another async function that is called after the completed POST request. This function should retrieve data from our app, select the necessary elements on the DOM (index.html), and then update their necessary values to reflect the dynamic values for:

- Temperature
- Date
- User input

