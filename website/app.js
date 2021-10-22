/* Global Variables */
console.log('0. Creating global variables');

let log = {
  date:'',
  zipCode:00000,
  feelings: '',
  temperature:0,
};

let baseURL ='http://api.openweathermap.org/data/2.5/weather?zip=';
let apiKey = '&units=metric&appid=c6b402bdf2b2bc4c97420534ac9a8ed0';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

console.log('1. Created date variables');

//New code
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
        console.log(newData);
        return newData;
      }catch(error) {
      console.log("error", error);
      }
  };

//console.log('2. Posting Data');

//postData('/addInfo', {answer:43,answer:43,answer:43});


// Async - Get

const retrieveData = async (url='') =>{ 
  const request = await fetch(url);
  try {
  // Transform into JSON
  const allData = await request.json()
  console.log(allData);
  }
  catch(error) {
    console.log("error", error);
    // appropriately handle the error
  }
};

console.log('Retrieve Data: ' + retrieveData());
let testRetrieve = retrieveData();

//---Adding Event Listener -----
console.log('x. Adding event listener');

document.getElementById('generate').addEventListener('click', performAction);

//---Obtaining the temperature from the external API ---- 
function performAction(event){  
  createLog(baseURL, '35307', apiKey)
  };
  
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
    console.log('Response: ' + res);
    
  // 2. Extract the temperature from the obtained json object
    // const res = await fetch('/fakeAnimalData')
    try {
      const data = await res.json();
      console.log(data.main.temp);

    console.log(data);
    // 1. We can do something with our returned data here-- like chain promises!
      let tempData = data.main.temp;
      log.temperature = tempData;

    //Reuse the data variable for the log data
      data = log;

    // 2. 
    postData('/addInfo', data);
  }  catch(error) {
    // appropriately handle the error
    console.log("error", error);
  }
};







//--Getting the DOM Elements text
console.log('x. Created document elements');

document.getElementById('zip').innerHTML = " ";
document.getElementById('feelings').innerHTML =" ";