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
| 'api/user-read/'| POST      |to get current user info|
| 'api/user-read/'| GET      |to get list of all user for admin|
| 'api/user-delete/'| POST      |to delete user for admin      |
| 'api/splitwise/'| GET      |to get authorization url      |
| 'api/splitwise/'   | POST      |to get splitwise access token      |


