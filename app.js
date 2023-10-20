const express = require('express')
const fs = require('fs')

const app = express()
const PORT = 5001


app.listen(PORT, () => {
    console.log('server stated')
})

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/users', (req, res) => {
    fs.readFile('db.json', 'utf8', (err, data) => {
        if (err) {
            console.log(err)
            res.status(500)
                .json({
                    message: 'Internal Server Error'
                })
        }
        const users = JSON.parse(data).users;
        res.json(users)
    })
})

app.get('/users/:id', (req, res) => {
    const {id} = req.params
    fs.readFile('db.json', 'utf8', (err, data) => {
        if (err) {
            console.log(err)
            res.status(500)
                .json({
                    message: 'Internal Server Error'
                })
        }
        const users = JSON.parse(data).users
        res.json(users[id - 1])
    })
})

app.post('/users', (req, res) => {
    fs.readFile('db.json', 'utf8', (err, data) => {
        if (err) {
            console.log(err);
            res.status(500)
                .json({
                    message: 'Internal Server Error'
                });
            return;
        }

        const parsedData = JSON.parse(data);
        const users = parsedData.users;

        if (req.body.name.length <= 3) {
            res.status(400)
                .json({
                    message: 'Name should be more than 3 characters'
                });
            return;
        }


        if (req.body.age < 0) {
            res.status(400)
                .json({
                    message: 'Age should be greater than or equal to 0'
                });
            return;
        }

        const maxId = Math.max(...users.map(user => user.id));

        const newUser = {
            id: maxId + 1,
            name: req.body.name,
            age: req.body.age,
            email: req.body.email
        };

        users.push(newUser);

        parsedData.users = users;
        fs.writeFile('db.json', JSON.stringify(parsedData, null, 2), 'utf8', (err) => {
            if (err) {
                console.log(err);
                res.status(500)
                    .json({
                        message: 'Internal Server Error'
                    });
                return;
            }

            res.json(parsedData.users);
        });
    });
});


app.delete('/users/:id', (req, res) => {
    fs.readFile('db.json', 'utf8', (err, data) => {
        if (err) {
            console.log(err);
            res.status(500)
                .json({
                    message: 'Internal Server Error'
                });
            return;
        }

        const {id} = req.params;
        const parsedData = JSON.parse(data);
        const users = parsedData.users;

        const userToDelete = users.find(user => user.id === +id);



        if (userToDelete) {
            const updatedUsers = users.filter(user => user.id !== +id);
            parsedData.users = updatedUsers;
            fs.writeFile('db.json', JSON.stringify(parsedData, null, 2), 'utf8', (err) => {
                if (err) {
                    console.log(err);
                    res.status(500).json({
                        message: 'Internal Server Error'
                    });
                    return;
                }
                res.json({
                    message: 'User deleted'
                });
            });
        } else {

            res.status(404).json({
                message: 'User not found'
            });
        }
    });
});

app.put('/users/:id', (req, res) => {
    fs.readFile('db.json', 'utf8', (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).json({
                message: 'Internal Server Error'
            });
            return;
        }
        if (req.body.name.length <= 3) {
            res.status(400)
                .json({
                    message: 'Name should be more than 3 characters'
                });
            return;
        }

        if (req.body.age < 0) {
            res.status(400)
                .json({
                    message: 'Age should be greater than or equal to 0'
                });
            return;
        }

        const { id } = req.params;
        const parsedData = JSON.parse(data);
        const users = parsedData.users;
        const updatedUsers = users.map(user => {
            if (user.id === +id) {

                return {
                    ...user,
                    ...req.body
                };
            }
            return user;
        });

        parsedData.users = updatedUsers;

        fs.writeFile('db.json', JSON.stringify(parsedData, null, 2), (err) => {
            if (err) {
                console.log(err);
                res.status(500).json({
                    message: 'Internal Server Error'
                });
                return;
            }
            res.json({
                message: 'User updated'
            });
        });
    });
});