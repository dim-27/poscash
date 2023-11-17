# Poscash App
### Summary
Poscash is an app made as a group project to make payment process faster. It is a full stack consisting of technologies such as:
#### Front End 
- ReactJS as frontend framework
- Redux and React Query for state management
- Tailwindcss for styling
- React Router for navigation

#### Back End
- Javascript for programming language
- NodeJS for runtime environment
- ExpressJS for backend framework
- Jsonwebtoken for signature and encryption
- Nodemailer for email sending
- multer for file uploading
- morgan for HTTP request logger middleware
#### Database
- MySQL for storing data

## clone this repo
```
git clone https://github.com/AnwarAan/poscash
```

configure file .env First!

### Setup DB

```
myslq -u root -p
```
enter password
```
create database poscash;
```
check database
```
show databases;
```
```
exit;
```


### Run Client
```
cd ./client
```
```
npm install
```
```
npm run dev
```

### Run Server
```
cd ./server
```
```
npm install
```
```
nodemon index.js
```
