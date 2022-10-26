const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
//const ReactDOM = require('react-dom');
//const http = require("http");

// http.createServer(function (req, res) {
//   res.writeHead(200, {'Content-Type': 'text/plain'});
//   res.write('Hello World!');
//   res.end();
// }).listen(3002);
//middleware
app.use(cors());
app.use(express.json()); //req.body

//pool.connect(); //abriendo nuestra conexion a la base de datos 

//create a todo
//    const { id,lote,estado,fecha } = req.body;
//     const newTodo = await pool.query(
//       "INSERT INTO palpaciones (id,lote,estado,fecha) VALUES($1,$2,$3,$4) RETURNING *",
//       [id,lote,estado,fecha]
//     );
app.post("/palpaciones", async (req, res) => {
  try {
    const { id,lote,estado,fecha,gestacion,fechaparto,fechamater,ovrD,ovrI,observacion } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO palpaciones (id,lote,estado,fecha,gestacion,fechaparto,fechamater,ovrD,ovrI,observacion) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *",
      [id,lote,estado,fecha,gestacion,fechaparto,fechamater,ovrD,ovrI,observacion]
    );

    res.json(newTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

app.post("/partos", async (req, res) => {
  try {
    const { id,fecha,observacion,tipo } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO partos (id,fecha,observacion,tipo) VALUES($1,$2,$3,$4) RETURNING *",
      [id,fecha,observacion,tipo]
    );

    res.json(newTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//get all todos

app.get("/palpaciones", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM palpaciones");
    res.json(allTodos.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//get a todo

app.get("/fincas/:codfinca", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query("SELECT * FROM fincas WHERE codfinca = $1", [
      id
    ]);

    res.json(todo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//update a todo

// app.put("/palpaciones/:codfinca", async (req, res) => {
//   try {
//     const {codfina,fecha } = req.params;
//     const {codfina,fecha} = req.body;
//     const updateTodo = await pool.query(
//       "UPDATE palpaciones SET enlanube = true WHERE codfinca = $1 and fecha= $2",
//       [description, id]
//     );

//     res.json("Todo was updated!");
//   } catch (err) {
//     console.error(err.message);
//   }
// });

app.put("/palpaciones", async (  ) => {
  try {
    const updateTodo = await pool.query(
      "UPDATE palpaciones SET enlanube = true WHERE enlanube = false",
      []
    );
  } catch (err) {
    console.error(err.message);
  }
});

//delete a todo

app.delete("/fincas/:codfinca", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query("DELETE FROM fincas WHERE codfinca = $1", [
      id
    ]);
    res.json("Todo was deleted!");
  } catch (err) {
    console.log(err.message);
  }
});

app.listen(3001, () => {
  console.log("server has started on port 3001");
});