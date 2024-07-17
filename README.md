# Payment Gateway Service

This repository contains the implementation of a backend service for a scalable and secure payment gateway. The service handles different types of transactions, including credit card, debit card, and digital wallets. This project demonstrates my system design skills, coding quality, and DevOps knowledge.

## Table of Contents
- [Implementation](#implementation)
- [DevOps](#devops)
- [Server Workflow and Deployment](#server-workflow-and-deployment)
- [Setup and Run](#setup-and-run)
- [Deployment](#deployment)


### API Design

#### Transaction Endpoints
- **POST /transfer-fund**: Transfer money from one account to another.
- **POST /verify-account**: Verify receiver's account number.
- **GET /get-all-transactions**: Get all transactions of a user.
- **POST /deposit-fund**: Deposit funds using Stripe.

#### Request Endpoints
- **GET /get-all-requests**: Get all requests for a user.
- **POST /send-request**: Send request to another user.
- **POST /update-request-status**: Update request status.

#### User Endpoints
- **POST /register**: Register a new user.
- **POST /login**: Login a user.
- **GET /get-all-users**: Get all users.
- **GET /get-user-info**: Get user information.
- **POST /update-verified-status**: Update user's verified status.


### Data Flow and Interaction
The service interacts with different components, including a database for storing payment information, an external payment processor (stripe), and security services for authentication and authorization.

### Security Measures
- Data encryption
- Authentication and authorization
- Secure API endpoints

## Implementation

This repository contains the full stack application - PayZApp. The service supports basic CRUD operations related to payments and includes endpoints for creating payments, processing payments, retrieving payment status, and handling refunds as well as user authentication and authorization.

## DevOps

### Containerization
The application is containerized using Docker. A Dockerfile is provided to build the application.

### CI/CD Pipeline
A CI/CD pipeline is set up using GitHub Actions to automate the build, test, and deployment process.

### Deployment
The application is deployed to AWS ECS. The deployed application and API documentation are accessible via the provided links.

## Server Workflow and Deployment
[Server Repository](https://github.com/AnshumohanAcharya/PayZApp-Backend.git)

## Setup and Run

### Prerequisites
- Node.js
- Docker

### Steps to Run Locally
1. Clone the repository:
    ```sh
    git clone https://github.com/AnshumohanAcharya/PayZApp.git
    cd PayZApp
    ```
2. Install dependencies:
    ```sh
    cd server
    npm install
    cd ..
    cd client
    npm install
    ```
3. Start the application:
    ```sh
    npm run dev
    ```

## Deployment

The live application is deployed on AWS ECS. Access the deployed application and API documentation at:
- [Live Application (Backend)](http://34.239.164.54:8000)

## Submission Guidelines

Please refer to the following links for the project submission:
- **Code Repository**: [GitHub Repository](https://github.com/AnshumohanAcharya/PayZApp.git)
- **Live Application**: [Deployed Application](http://34.239.164.54)
