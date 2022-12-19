const express = require("express");
const path = require("path");
const fs = require("fs/promises");

const app = express();
app.use(express.json());
const rutaTodo = path.resolve("./file/tasks.json");

//get
app.get("/tasks", async (req, res) => {
    const send_rutas = await fs.readFile(rutaTodo, "utf8");
    res.send(send_rutas);
  });

  //post
  app.post("/tasks", async (req, res) => {
  const user = req.body;
  const todoArray = JSON.parse(await fs.readFile(rutaTodo,"utf8"))
  const i = todoArray.length -1;
  const newId = todoArray[i].id + 1;
  console.log(newId)
  todoArray.push({id:newId,...user})
  await fs.writeFile(rutaTodo,JSON.stringify(todoArray));
  res.send("users create")
  res.end();
  })


  app.put("/tasks",async (req,res)=>{
const {id,title,description,status} = req.body;
const arrayput = JSON.parse(await fs.readFile(rutaTodo,"utf8"))
const arrayIndex = arrayput.findIndex(user => user.id === id)
if (arrayIndex >= 0) {
  arrayput[arrayIndex].id = id;
  arrayput[arrayIndex].title = title;
  arrayput[arrayIndex].description = description;
  arrayput[arrayIndex].status = status;

}
await fs.writeFile( rutaTodo,JSON.stringify(arrayput))
res.send("users update")
  })


  app.delete("/tasks",async (req, res)=>{
    //obtener el arreglo desde el jsonfile
    const arrayput = JSON.parse(await fs.readFile(rutaTodo,"utf8"))
    //encontrar el id desde el body
    const {id} = req.body;
    //encontrar el user que se quiere eliminar
const arrayIndex = arrayput.findIndex(user => user.id === id)
arrayput.splice(arrayIndex,1);
await fs.writeFile( rutaTodo,JSON.stringify(arrayput))
res.send("delete users")
res.end

  });

  
const PORT = 8000;
app.listen(PORT, () => {
  console.log(`ESCUCHANDO EN EL PORT:${PORT}`);
});
