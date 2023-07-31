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




## Schema:

#### Users table

| id | name     | email                | createdAt           | updatedAt           |
|----|----------|----------------------|---------------------|---------------------|
|  1 | user1 | user1@gmail.com | 2023-07-31 10:15:00 | 2023-07-31 10:15:00 |
|  2 | user2    | user2@gmail.com      | 2023-07-31 10:15:00 | 2023-07-31 10:15:00 |


#### Products table

| id | name         | price | createdAt           | updatedAt           |
|----|--------------|-------|---------------------|---------------------|
|  1 | dotCard     | 10.00 | 2023-07-31 10:15:00 | 2023-07-31 10:15:00 |
|  2 | dorCard-pro | 20.00 | 2023-07-31 10:15:00 | 2023-07-31 10:15:00 |


