
const express = require('express');

const hubsModel = require('./data/hubs-model.js');

const server = express();

//teach express how to read JSON from the request body
server.use(express.json());

// order matters, the first argument is the request, the second is the response.
server.get('/', (req, res) => {
    res.send('hello node 22');
    
})
server.get('/hubs', (req, res) => {
    // get a list of hubs from the database
    hubsModel
        .find()
        .then(hubs => {
            // send the lsit of hubs back to the client.
            res.send(hubs);
        })
        .catch(error => {
            res.send(error)
        })
})  
// add a hub
    server.post('/hubs', (req, res) => {
        //axios.post(url, data);
        //get the hub data from the request
        const hubData = req.body;

//validate the data sent by the client
        // NEVER TRUST THE CLIENT!!!
        if (!hubData.name) {
            res.status(400).json({message:'give me a name'})
        } else {
            

        //add the hub to the database
        hubsModel
            .add(hubData)
            .then(hubs => {
                // send the lsit of hubs back to the client.
                res.json(hubs); //.json() will set the right headers and convert to JSON
            })
            .catch(error => {
                res.json({ message:"error saving the hub"})
            });

 }
})
   
server.delete('/hubs/:id', (req, res) => {
    //axios.delete('/hubs/2')
    const id = req.params.id;

    hubsModel
      .remove(id)
      .then(hubs => {
        // send the lsit of hubs back to the client.
        res.json(hubs); //.json() will set the right headers and convert to JSON
      })
      .catch(error => {
        res.json({ message: "error deleting the hub" });
      });
})


server.put('/hubs/:id', (req, res) => {
    const id = req.params.id;
    const changes = req.body;

    hubsModel
      .update(id, changes)
      .then(hub => {
        // send the lsit of hubs back to the client.
        res.json(hub); //.json() will set the right headers and convert to JSON
      })
      .catch(error => {
        res.json({ message: "error updating the hub" });
      });

})


const port = 8000;
server.listen(port, () => console.log(`\n** API on port ${port}**\n`));