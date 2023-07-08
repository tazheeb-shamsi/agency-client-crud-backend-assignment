# Agency Client CRUD Backend

This is the backend server for the Agency Client CRUD project. It provides RESTful APIs for managing agencies and clients.

## Features

- Create, read, update, and delete agencies
- Create, read, update, and delete clients
- Retrieve the top client(s) with the maximum total bill

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose

## Getting Started

### Prerequisites

- Node.js installed on your machine
- MongoDB installed and running

### Installation

#### 1. Clone the repository:

```bash
git clone https://github.com/tazheeb-shamsi/agency-client-crud-backend-assignment

```

#### 2. Change directory & Install dependencies:

##### Change directory

```bash
cd agency-client-crud-backend
```

##### Install dependencies

```bash
npm install
```

#### 3. Set up environment variables:

##### Create a .env file in the root directory and provide the necessary environment variables. For example:

```bash
PORT=3000
MONGODB_URI=mongodb://localhost/agency-client-crud

```

#### 4. Start the server:

```bash
npm start
```

## API Documentation

### Agency Endpoints

```bash
GET api/agency: Get all agencies
GET api/:agencyId: Get an agency by ID
POST api/agency/addAgency: Create a new agency
PUT api/agency/:agencyId: Update an agency by ID
DELETE api/agency/:agencyId: Delete an agency by ID
```

### Client Endpoints

```bash
GET api/client: Get all clients
GET api/client/:clientId: Get a client by ID
POST api/client: Create a new client
PUT api/client/:clientId: Update a client by ID
DELETE api/clients/:clientId: Delete a client by ID
```

### Create Agency along with Client Endpoint

```bash
POST api/agency: Create a new agency and client simultaneously
```

### Top Client Endpoint

```bash
GET api/topClient: Get the top client(s) with the maximum total bill
```


## Contributing
###### Contributions are welcome! If you find any issues or have suggestions for improvements, please feel free to submit a pull request or open an issue.

## License
This project is licensed under the MIT License.

Feel free to pull and use this  for your Node projects.