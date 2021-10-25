/* Global Variables */
console.log('0. Creating global variables');

// Variable for the new log creation.
let log = {
  date: '',
  zipCode: 00000,
  feelings: '',
  temperature: 0,
};

// Variables to store the api information 

let baseURL ='http://api.openweathermap.org/data/2.5/weather?zip=';
// Included the metric parameter since I am in Europe
let apiKey = '&units=metric&appid=c6b402bdf2b2bc4c97420534ac9a8ed0';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

console.log('1. Created date variables');

//---- Posting to the server -----------
const postData = async ( url = '', data = {})=>{
    console.log("posting app data");
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
        console.log('Posting New Data: ' + newData);
        return newData;
      }catch(error) {
      console.log("error", error);
      }
  };

//------Creating new log data object ----------
  const createLog = async (baseURL, zip, key)=>{
  
    //Log the date
    log.date = newDate;
  
    //Log the zipcode
    log.zipCode = document.getElementById('zip').value;
  
    //Log the feelings
    log.feelings = document.getElementById('feelings').value;
  
    // Log the temperature information
    // 1.
    console.log('Dynamic API address: '+ baseURL+zip+',es'+key);
    console.log('Fetching dynamic API address');
  
      const res = await fetch(baseURL+zip+',es'+key)
      //console.log('Response object: ' + res);
      
    // 2. Extract the temperature from the obtained json object
    
      try {
        let apiData = await res.json();
        console.log('API Temperature: ' + apiData.main.temp);
     
      // 1. We can do something with our returned data here-- like chain promises!
        let tempData = apiData.main.temp;
        log.temperature = tempData;
        console.log('New Log: ' + log);
       
      // 2. 
    
  
      postData('/addInfo', log);

     
      //Get server Data 
      getServerData('/all');

      //Resetting the entry fields
      resetFields();  

      //console.log('Last Log sending : ' + lastLog);
      //updateLastLog();

    }  catch(error) {
      // appropriately handle the error
      console.log("error", error);
    }
  };

// ------------ Async - Get --------------------- 

const getServerData = async ( url = '')=>{

  const request = await fetch(url); 
  try {
  //Transform into JSON
  const storedLogData = await request.json();
  console.log(storedLogData);

  // Updating the last Log's Holder HTML elements.
  console.log('Creating last logs entries HTML');
  document.getElementById('date').innerHTML = 'Date: ' + storedLogData.date;
  document.getElementById('temp').innerHTML = 'Temperature in Celsius: ' + storedLogData.temperature;
  document.getElementById('content').innerHTML ='Feelings: ' + storedLogData.feelings;
  }
  catch(error) {
  console.log("error", error);
  }
};

//---Adding Event Listener -----
console.log('x. Adding event listener');

document.getElementById('generate').addEventListener('click', performAction);

//---Obtaining the temperature from the external API ---- 
function performAction(event){  
  createLog(baseURL, document.getElementById('zip').value, apiKey)
  };


//--Getting the DOM Elements text


//Clean field entries.
function resetFields(){
  document.getElementById('zip').value = '';
  document.getElementById('feelings').value ='';
};
