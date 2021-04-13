const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

let mysql = require("mysql2");
// Connect to MySQL Database (already running) -> Use 'net start MySQL80' to start the server
let connection = mysql.createPool({
  connectionLimit: 10,
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "ecommerce",
  insecureAuth: true,
});

const app = express();

// Avoid Cross Origin Request errors
let corsOptions = {
  origin: "http://localhost:3000",
};

app.use(cors(corsOptions));

// parse requests of json
app.use(bodyParser.json());

// parse requests of content-type -www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route to test connection
app.get("/", (req, res) => {
  res.json({ message: "Welcome to webstore application." });
});

app.get("/customers", async (req, res) => {
  // Connecting to the database.
  connection.getConnection(function (err, connection) {
    // Release connection if there is an error
    if (err) {
      connection.release();
      return res.send(400, "Couldn't get a connection");
    }
    // Executing the MySQL query (select all data from the 'customers' table).
    connection.query(
      "SELECT * FROM customers",
      function (error, results, fields) {
        // If some error occurs, we throw an error.
        if (error) throw error;

        // Getting the 'response' from the database and sending it to our route. This is were the data is.
        res.send(results);
      }
    );
    connection.release();
  });
});

app.get("/customers/:username", async (req, res) => {
  const { username } = req.params;
  connection.getConnection(function (err, connection) {
    connection.query(
      "SELECT login, password FROM customers WHERE login = ?",
      username,
      function (error, results, fields) {
        if (error) throw error;

        res.send(results);
      }
    );
    connection.release();
  });
});

app.get("/product/:id", async (req, res) => {
  const { id } = req.params;
  connection.getConnection(function (err, connection) {
    // Release connection if there is an error
    if (err) {
      connection.release();
      return res.send(400, "Couldn't get a connection");
    }

    connection.query(
      `SELECT * FROM products WHERE productID = ${id}`,
      function (error, results, fields) {
        // If some error occurs, we throw an error.
        if (error) throw error;

        // Getting the 'response' from the database and sending it to our route. This is were the data is.
        res.send(results);
      }
    );
    connection.release();
  });
});

// Get all products
app.get("/products", async (req, res) => {
  // Connecting to the database.
  connection.getConnection(function (err, connection) {
    // Release connection if there is an error
    if (err) {
      connection.release();
      return res.send(400, "Couldn't get a connection");
    }
    // Executing the MySQL query (select all data from the 'customers' table).
    connection.query(
      "SELECT * FROM products",
      function (error, results, fields) {
        // If some error occurs, we throw an error.
        if (error) throw error;

        // Getting the 'response' from the database and sending it to our route. This is were the data is.
        res.send(results);
      }
    );
    connection.release();
  });
});

// Get a user from their id
app.get("/user/:id", async (req, res) => {
  const { id } = req.params;
  connection.getConnection(function (err, connection) {
    // Release connection if there is an error
    if (err) {
      connection.release();
      return res.send(400, "Couldn't get a connection");
    }
    connection.query(
      "SELECT * FROM customers WHERE customerID = ?",
      id,
      function (error, results, fields) {
        // If some error occurs, we throw an error.
        if (error) throw error;

        // Getting the 'response' from the database and sending it to our route. This is were the data is.
        res.send(results);
      }
    );
    connection.release();
  });
});

/*
POST ROUTES
*/

// Add new customer
app.post(
  "/newCustomer/:username/:password/:firstName/:lastName/:address/:postal",
  async (req, res) => {
    let {
      username,
      password,
      firstName,
      lastName,
      address,
      postal,
    } = req.params;
    let userResp = [username, password, firstName, lastname, address, postal];
    connection.getConnection(function (err, connection) {
      connection.query(
        "INSERT INTO customers ( username, password, firstName, lastName, address, postal ) VALUES ?",
        [userResp],
        function (err, result) {
          if (!err) {
            res.send(userResp);
          } else {
            throw err;
          }
        }
      );
    });
  }
);

// Adding a new product
app.post(
  "/newProduct/:productName/:price/:stock/:category",
  async (req, res) => {
    let { pName, price, stock, category } = req.params;
    let userResp = [pName, price, stock, category];
    connection.getConnection(function (err, connection) {
      connection.query(
        "INSERT INTO products ( name, price, stock, categoryID ) VALUES ?",
        [userResp],
        function (err, result) {
          if (!err) {
            res.send(userResp);
          } else {
            throw err;
          }
        }
      );
    });
  }
);

// Creating new order
app.post(
  "/newOrder/:amount/:orderCustomerID/:date/:productID/:invoiceAmount",
  async (req, res) => {
    let {
      amount,
      orderCustomerID,
      date,
      productID,
      invoiceAmount,
    } = req.params;
    let userResp = [amount, orderCustomerID, date, productID, invoiceAmount];
    connection.getConnection(function (err, connection) {
      connection.query(
        "INSERT INTO orders ( amount, orderCustomerID, date, productID, invoiceAmount ) VALUES ?",
        [userResp],
        function (err, result) {
          if (!err) {
            res.send(userResp);
          } else {
            throw err;
          }
        }
      );
    });
  }
);

// Fetching all orders
app.get("/orders", async () => {
  connection.getConnection(function (err, connection) {
    if (err) {
      connection.release();
      return res.send(400, "Couldn't get a connection");
    }
    connection.query("SELECT * FROM orders", function (error, results) {
      if (error) throw error;
      res.send(results);
    });
  });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
