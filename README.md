# AuthNodejsType
 Authntification with Node.js, TypeScript and postgresql


You can generate a token in the console by running this command:

node -e "console.log(require('crypto').randomBytes(32).toString('hex'));"


How to Build a Simple REST API with Node.js, Express, TypeScript, and PostgreSQL

In this article, we will build a simple REST API using Node.js, Express, TypeScript, and PostgreSQL. The API will allow us to create, read, update, and delete users.

Prerequisites

Basic understanding of Node.js, Express, TypeScript, and PostgreSQL
A text editor or IDE
A terminal
Step 1: Set Up the Project

First, we need to set up our project. Create a new directory for your project and open it in your terminal. Then, run the following command to initialize a new Node.js project:

    npm init -y
This will create a package.json file for your project.

Next, we need to install the required dependencies. Run the following command to install Express, TypeScript, pg-promise, and dotenv:

npm install express typescript pg-promise dotenv
Step 2: Connect to PostgreSQL Database

Create a .env file to store your database credentials. Add the following environment variables to the .env file:

    DB_USER=your_username
    DB_PASSWORD=your_password
    DB_HOST=your_host
    DB_PORT=your_port
    DB_DATABASE=your_database
Replace the placeholder values with your actual database credentials.

Now, create a file called db.ts in the src directory. In this file, we will configure our connection to the PostgreSQL database. Add the following code to the db.ts file:

    TypeScript
    import pgPromise from 'pg-promise';
    import * as dotenv from 'dotenv';

    const pgp = pgPromise();

    dotenv.config();

    const db = pgp({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432', 10),
    database: process.env.DB_DATABASE
    });

export default db;
Usa el código con precaución. Más información
This code imports the pg-promise library and dotenv. It then configures the connection to the database using the environment variables from the .env file.

Step 3: Define User Interface

Create a file called users.ts in the src/interfaces directory. This file will define the interface for our users. Add the following code to the users.ts file:

    TypeScript
    interface Users {
    id: number;
    name: string;
    email: string;
    password: string;
    created_at: Date;
    updated_at: Date;
    }

    export { Users };
Usa el código con precaución. Más información
This code defines an interface called Users with the following properties:

id: The unique identifier for the user (number)
name: The name of the user (string)
email: The email address of the user (string)
password: The password of the user (string)
created_at: The date and time the user was created (Date)
updated_at: The date and time the user was last updated (Date)

Step 4: Create User Functions

Create a directory called functions in the src directory. In this directory, we will create functions for creating, reading, updating, and deleting users.

Let's create a function to create a new user. Create a file called users-create.ts in the src/functions directory. Add the following code to the users-create.ts file:

    TypeScript
    import db from "../../db";
    import { Users } from "../../interfaces/users";

    export function createUser(name: string, email: string, password: string): Promise<Users[]> {
    var user = db.func("insert_user", [name, email, password]);
    return user;
    }

This code imports the db and Users interfaces. It then defines a function called createUser that takes three arguments: name, email, and password. The function uses the db object to call the insert_user function in the database. The insert_user function inserts a new user into the database and returns the user object.

Step 5: Implement Other User Functions

Similarly, you can create functions for reading, updating, and deleting users. Here are the file names and brief descriptions of the functions:

users-all.ts: Gets all users
`users