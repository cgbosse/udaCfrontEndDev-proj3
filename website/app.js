/*  ------------ Global Variables  ------------ */
//console.log('0. Creating global variables');

// Variable for the new log creation.
let log = {
  date: '',
  zipCode: 00000,
  feelings: '',
  temperature: 0,
};

// Variables to store the api information 

const baseURL ='http://api.openweathermap.org/data/2.5/weather?zip=';

// Included the metric parameter since I am in Europe
// Your should replace the YOUR_KEY with the supplied API key from openweathermap.org
const apiKey = '&units=metric&appid=YOUR_KEY';


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (1+ d.getMonth())+'.'+ d.getDate()+'.'+ d.getFullYear();

//console.log('1. Created date variables');


/*  ------------ Functions  ------------ */

// ------------ Posting to the server  ------------ 
// Boiler plate taken from the course

const postData = async ( url = '', data = {})=>{
    //console.log("posting app data");
    //console.log(data);
      const response = await fetch(url, {
          method: 'POST', 
          credentials: 'same-origin',
          headers: {
              'Content-Type': 'application/json',
          },
          // Body data type must match "Content-Type" header        
          body: JSON.stringify(data), 
    });
      try {
        const newData = await response.json();
        //console.log('Posting New Data: ' + newData);
        return newData;
      }catch(error) {
      console.log("error", error);
      }
  };

// ------------ Creating new log data object  ------------ 
  const createLog = async (baseURL, zip, key)=>{
  
    //Log the date
    log.date = newDate;
  
    //Log the zipcode
    log.zipCode = document.getElementById('zip').value;
  
    //Log the feelings
    log.feelings = document.getElementById('feelings').value;
  
    // -------- Log the temperature information -------- 
    // 1. Dynamicaly create the API call URL
    //console.log('Dynamic API address: '+ baseURL+zip+',es'+key);
    // console.log('Fetching dynamic API address');
  
    // Included the country parameter since I am in Spain
    const res = await fetch(baseURL+zip+',es'+key)
    
    //console.log('Response object: ' + res);
      
    // 2. Extract the temperature from the obtained json object
    try {
        let apiData = await res.json();
        //console.log('API Temperature: ' + apiData.main.temp);
     
        // 1. We can do something with our returned data here-- like chain promises!
        let tempData = apiData.main.temp;
        log.temperature = tempData;
        //console.log('New Log: ' + log);
       
        // 2. Post the log object to the server
        postData('/addInfo', log);

        // 3. Get the server's logged object back and update the most recent entry fields
        getServerData('/all');

        // 4. Resetting the web app's entry fields
        resetFields(); 

    }  catch(error) {
      // appropriately handle the error
      console.log("error", error);
    }
  };

// ------------ Async - Get --------------------- 

const getServerData = async ( url = '')=>{

  const request = await fetch(url); 
  try {
  // 1. Transform into JSON
  const storedLogData = await request.json();
  
  //console.log(storedLogData);

  // 2. Updating the last Log's Holder HTML elements.
  
  // console.log('Creating last logs entries HTML');
  document.getElementById('date').innerHTML = 'Date: ' + storedLogData.date;
  document.getElementById('temp').innerHTML = 'Temperature in Celsius: ' + storedLogData.temperature;
  document.getElementById('content').innerHTML ='Feelings: ' + storedLogData.feelings;
  }
  catch(error) {
  console.log("error", error);
  }
};

// ------------ Clean field entries ------------ 
  function resetFields(){
    document.getElementById('zip').value = '';
    document.getElementById('feelings').value ='';
  };


// ------ Adding Event Listener -----
// console.log('x. Adding event listener');

document.getElementById('generate').addEventListener('click', performAction);

//---Obtaining the temperature from the external API ---- 
function performAction(event){  
  createLog(baseURL, document.getElementById('zip').value, apiKey)
  };




