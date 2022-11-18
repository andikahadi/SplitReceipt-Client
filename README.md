# SplitReceipt
SplitReceipt is a Web-App that connect GrabFood receipts from Gmail, assign items in receipts to your friend, and  create an expense in Splitwise app (http://splitwise.com).
This full-stack application also serves to fulfill the academic requirements of General Assembly's Software Engineering Immersive capstone project.

 - SplitReceipt Client Repo : https://github.com/andikahadi/SplitReceipt-Client
 - SplitReceipt Server Repo : https://github.com/andikahadi/SplitReceipt-Server
 - Database structure : https://drawsql.app/teams/splitreceipt/diagrams/split-receipt

# Technologies Used
Front-end
 - React.js
 - Typescript

Back-end
 - Django
 - Python

Database
 - Postgresql

# Client Pages

| Url           | Page          |
| ------------- | ------------- |
| '/'           | Receipts      |
| '/history'   | History      |
| '/account'   | Account      |
| '/login'   | Login      |
| '/register'   | Login      |

# Server Endpoints

| Endpoint      | Method        | Description   |
| ------------- | ------------- |------------- |
| 'api/token/'| POST      |to login|
| 'api/token/refresh/'| POST      |to get new access token|
| 'api/user/register'| POST      |to register new account|
| 'api/user-read/'| POST      |to get current user info|
| 'api/user-read/'| GET      |to get list of all user for admin|
| 'api/user-delete/'| POST      |to delete user for admin      |
| 'api/splitwise/'| GET      |to get authorization url      |
| 'api/splitwise/'   | POST      |to get splitwise access token      |
| 'api/splitwise-friend/'| POST      |to get user Splitwise friends list|
| 'api/post-expense/'| POST      |to call Splitwise API creating expense     |
| 'api/get-receipt/'   | POST      |to get receipt from database      |
| 'api/gmail-receipt/'| POST      |get receipt email from inbox based on last fetch time|
| 'api/receipt-update/'| PATCH      |update database to note that receipt is assigned     |






