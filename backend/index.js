const express =require('express');
const mysql = require ('mysql2');
const bodyParser = require('body-parser');
const app = express();
app.use(express.json());

const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'task_manager'
})

db.connect(err=>{
    if(err){
        console.log(err,'databaza nuk eshte konektuar !');
    }
        console.log('databaza eshte konektuar ... !');
});


// Endpoint to create a new task /
app.post('/tasks', (req, res) => {
    const { task_name, description, status } = req.body;

    if (!task_name || !status) {
        return res.status(400).send('Task name and status are required');
    }

    const sql = 'INSERT INTO tasks (task_name, description, status) VALUES (?, ?, ?)';
    const values = [task_name, description, status];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error creating a new task:', err);
            res.status(500).send('Internal Server Error');
            return;
        }

        res.status(201).send('Task created successfully');
    });
});

// Endpoint to update task details/
app.put('/tasks/:id', (req, res) => {
    const taskId = req.params.id;
    const { task_name, description, status } = req.body;

    if (!task_name || !status) {
        return res.status(400).send('Task name and status are required');
    }

    const sql = 'UPDATE tasks SET task_name=?, description=?, status=? WHERE id=?';
    const values = [task_name, description, status, taskId];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error updating task details:', err);
            res.status(500).send('Internal Server Error');
            return;
        }

        res.send('Task details updated successfully');
    });
});

// Endpoint to delete a task /
app.delete('/tasks/:id', (req, res) => {
    const taskId = req.params.id;

    if (!taskId) {
        return res.status(400).send('Task ID is required');
    }

    const sql = 'DELETE FROM tasks WHERE id=?';
    const values = [taskId];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error deleting task:', err);
            res.status(500).send('Internal Server Error');
            return;
        }

        res.send('Task deleted successfully');
    });
});

// Endpoint to get a list of tasks /
app.get('/tasks', (req, res) => {
    const sql = 'SELECT * FROM tasks';

    db.query(sql, (err, result) => {
        if (err) {
            console.error('Error getting list of tasks:', err);
            res.status(500).send('Internal Server Error');
            return;
        }

        res.json(result);
    });
});

// Task Assignment:

// Endpoint to assign a task to a user /
app.post('/assign-task', (req, res) => {
    const { taskId, userId } = req.body;

    console.log('Received data:', req.body);  // Log the received data

    if (!taskId || !userId) {
        return res.status(400).send('Task ID and User ID are required');
    }

    const sql = 'INSERT INTO task_assignments (task_id, user_id) VALUES (?, ?)';
    const values = [taskId, userId];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error assigning task to user:', err);
            res.status(500).send('Internal Server Error');
            return;
        }

        res.send('Task assigned to user successfully');
    });
});


// Endpoint to view tasks assigned to a specific user/
app.get('/user-tasks/:userId', (req, res) => {
    const userId = req.params.userId;

    if (!userId) {
        return res.status(400).send('User ID is required');
    }

    const sql = 'SELECT * FROM task_assignments WHERE user_id=?';
    const values = [userId];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error getting user tasks:', err);
            res.status(500).send('Internal Server Error');
            return;
        }

        res.json(result);
    });
});

// Task Status:

// Endpoint to update the status of a task /
app.put('/update-task-status/:id', (req, res) => {
    const taskId = req.params.id;
    const { status } = req.body;

    if (!status) {
        return res.status(400).send('Task status is required');
    }

    const sql = 'UPDATE tasks SET status=? WHERE id=?';
    const values = [status, taskId];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error updating task status:', err);
            res.status(500).send('Internal Server Error');
            return;
        }

        res.send('Task status updated successfully');
    });
});

// Endpoint to retrieve tasks based on their status/
app.get('/tasks-by-status/:status', (req, res) => {
    const status = req.params.status;

    if (!status) {
        return res.status(400).send('Task status is required');
    }

    const sql = 'SELECT * FROM tasks WHERE status=?';
    const values = [status];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error getting tasks by status:', err);
            return res.status(500).send('Internal Server Error');
        }

        res.json(result);
    });
});
//   /
app.post('/users',(req,res)=>{
    const{name , email}=req.body;

    const sql='Insert into users (name,email) Values (?,?)';
    const values = [name,email];

    db.query(sql,values,(err,result)=>{
        if(err){
            console.log('Error to Insert values of users:' , err);
            return res.status(400).send('User is required !');
        }
        res.json(result);

    })
})
//        /
app.get('/users/:id', (req, res) => {
    const getId = req.params.id;

    if (!getId) {
        return res.status(400).send('User ID is required');
    }

    const sql = 'SELECT * FROM users WHERE id = ?';
    const values = [getId];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error getting user details:', err);
            return res.status(500).send('Internal Server Error');
        }

        res.json(result);
    });
});




app.listen(3000,()=>{
    console.log('server running...')
})