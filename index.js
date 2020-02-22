const express = require('express');

const server = express();

server.use(express.json())
//adicionar nodemon

const users=['matheus','thor','gabi']

server.use((req,res,next)=>{
  console.time('request')
  console.log(`Método: ${req.method};URL:${req.url}`);
  
  next();

  console.timeEnd('request');
})

function checkUserExist(req,res,next){
  if(!req.body.name){
    return res.status(400).json({error:'username is required'})
    
  }
  next()
}
function checkUserInArray(req,res,next){
  const user = users[req.params.index]
  if(!user){
    return res.status(400).json({error:'User does not exist'})
    
  }
  req.user = user;
  next()
}

server.get('/users',(req,res)=>{
  return res.json(users);
});

server.get('/users/:index',checkUserInArray,(req,res)=>{
  //const {index} = req.params;
  //return res.json(users[index])
  return res.json(req.user)
});

server.post('/users',checkUserExist,(req,res)=>{
  const { name } = req.body;
  users.push(name);

  return res.json(name)
});

server.put('/users/:index',checkUserInArray,checkUserExist,(req,res)=>{
  const {index} = req.params;
  const {name} = req.body;

  users[index]=name;
  return res.json(users)
});

server.delete('/users/:index',checkUserInArray,(req,res)=>{
    const {index} = req.params;

    users.splice(index,1);

    return res.send()
});

server.listen(3000);
