## API calls:
Default Host: localhost

Default Port: 3000

1. GET http://localhost:3000/users/1

2. DELETE http://localhost:3000/users/3


3. POST http://localhost:3000/users

Body example:
`{
    "name": "testUser",
    "email": "testUser@gmail.com"
}`


4. POST http://localhost:3000/users/3

Body example:
`{
    "name": "updateTestUser",
    "email": "updateTestUser@gmail.com"
}`



## Set up:
1. Clone project `git clone https://github.com/LIN251/dotcards.git`
   
2. update .env file
   
3. $ `npm run build`
   
4. $ `node dist/index.js`

5. Got to `http://localhost:3000/users/1` and test Apis 


## Automated tests:

1. Automated tests encompass all test cases located in the /src/tests directory.

2. The focus of these tests is primarily on happy cases to enhance the user experience. However, additional negative scenarios (bad cases) may be incorporated as needed.

3. For manual testing, execute the command `npx jest`.

4. All tests will be executed during the project build process.

## Video Demo 
Zoom Link: 

https://usc.zoom.us/rec/share/ge3AdtB_ttQwXPzI6OzQS109GPHbDBEKndOGbftSZvM4xoPdakvqXgc-XZBaJL9b.CuhzJPs1DKLQnVIm?startTime=1690829570000

## Schema:

schema: src/database/setupDatabase.sql

#### Sample Data:
##### Users table

| id | name     | email                | createdAt           | updatedAt           |
|----|----------|----------------------|---------------------|---------------------|
|  1 | user1 | user1@gmail.com | 2023-07-31 10:15:00 | 2023-07-31 10:15:00 |
|  2 | user2    | user2@gmail.com      | 2023-07-31 10:15:00 | 2023-07-31 10:15:00 |


##### Products table

| id | name         | price | createdAt           | updatedAt           |
|----|--------------|-------|---------------------|---------------------|
|  1 | dotCard     | 10.00 | 2023-07-31 10:15:00 | 2023-07-31 10:15:00 |
|  2 | dorCard-pro | 20.00 | 2023-07-31 10:15:00 | 2023-07-31 10:15:00 |


