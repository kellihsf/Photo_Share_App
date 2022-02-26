const Sequelize = require('sequelize');
const { User, Photo } = require('./models');

const express = require('express')
const app = express()
const port = 3000

app.use(express.json())

// Test route
app.get('/', (req,res) => {
    res.send("Sup")
})

// Get all users
app.get('/users', async (req, res) => {
    const users = await User.findAll();
    res.json(users);
});

// Get users by last name
app.get('/users/by-last-name', async (req, res) => {
    const users = await User.findAll({
        attributes: ['lastName']
    });
    res.json(users);
});

// Create new user
app.post('/users', async (req, res) => {
    // req.body contains an Object with firstName, lastName, email
    const { firstName, lastName, email } = req.body;
    const newUser = await User.create({
        firstName,
        lastName,
        email
    });
    
    // Send back the new user's ID in the response:
    res.json({
        id: newUser.id
    });
})

//Update Existing User
app.post('/users/:id', async (req, res) => {
    const { id } = req.params;
    
    // Assuming that `req.body` is limited to
    // the keys firstName, lastName, and email
    const updatedUser = await User.update(req.body, {
      where: {
        id
      }
    });
    
    res.json(updatedUser);
});

// Delete a user
app.delete('/users/:id', async (req, res) => {
    const { id } = req.params;
    const deletedUser = await User.destroy({
        where: {
            id
        }
    });
    res.json(deletedUser);
});

app.listen(port, () => {
    console.log(`Example app lisenting on port ${port}`)
})