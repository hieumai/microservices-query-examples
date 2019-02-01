# Introduction

Kitchen Service enables a restaurant to manage their orders.
The two main aggregates in this service are the Restaurant and Ticket aggregates.
The Restaurant aggregate knows the restaurant’s menu and opening hours and can validate orders.
A Ticket represents an order that a restaurant must prepare for pickup by a courier.

# Getting started

To get the Node server running locally:

- Clone this repo
- `yarn install` to install all required dependencies
- Install MongoDB Community Edition ([instructions](https://docs.mongodb.com/manual/installation/#tutorials)) and run it by executing `mongod`
- `yarn start` to start the local server
