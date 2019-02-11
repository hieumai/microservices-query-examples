# Introduction

Delivery Service enables a restaurant to manage deliveries for orders
The two main aggregates in this service are the Delivery and the Shipper aggregates
The Delivery represents a delivery made for an order and its status
The Shipper represents a shipper that can be assigned for the delivery

# Getting started

To get the Node server running locally:

- Clone this repo
- `yarn install` to install all required dependencies
- Install MongoDB Community Edition ([instructions](https://docs.mongodb.com/manual/installation/#tutorials)) and run it by executing `mongod`
- `yarn start` to start the local server
