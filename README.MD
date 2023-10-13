# Evelopes Budget API Project CodeCademy BACK-END PATH
This is the first part of the back end for an API that allows you to create budget envelopes to keep track of your expenses. 
This project is part of the content of the [CodeCademy](https://www.codecademy.com/) back end path. 
The back end is made [Express.js](https://expressjs.com/) y [Node.js](hhttps://www.google.com/search?q=node+js&oq=node+js&aqs=chrome..69i57j69i60l3j69i65l3.1123j0j9&sourceid=chrome&ie=UTF-8)

## How **Envelope Budgeting Works**
The envelope budgeting system divides your income into different spending categories—bills, groceries, gas, and so on. Once you've decided how much you should spend on each category, you'll take that amount in cash and place it into an envelope. 

## Rest API **Endpoints**
### **To make requests use postman**
### Create a budget envelope
Request
http://localhost:4001/envelopes/
Send in the body of the request an envelope with the following information
{ "title": "Gas", "budget": "400" }
+ `POST /envelopes`
  
Response
{ "id": "3", "name": "Gas", "budget": 400 }
### Retrieve all your envelopes.
Request
http://localhost:4001/envelopes/
+ `GET /envelopes`

Response
[]

### Retrive a Single Envelope By name
Request 
http://localhost:4001/envelopes/:name
+ `GET /envelopes/:name`

Response
{ "id": "1","name": "Gas","budget": 400 }

### Transfers budgets **from** one envelope **to** another
update the balances of both envelopes by subtracting it from one and adding it to the other.
Request 

http://localhost:4001/envelopes/transfers/:from/:to
+ `POST /envelopes/:name`

Response
{ "id": "1","name": "Gas","budget": 400 }

### Withdraw money from one of your envelopes
Request 
Send in the body of the request an JSON object with amount to Withdraw
{ "amount": "200" }
http://localhost:4001/envelopes/:name
+ `POST /envelopes/:name`

Response
{ "id": "1", "name": "Gas", "budget": 200 }

### Delete one of your envelopes
Request 
http://localhost:4001/envelopes/:name
+ `DELETE /envelopes/:name`

Response
200 OK
