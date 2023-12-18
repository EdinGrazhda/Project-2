const express =require('express');
const mysql = require ('mysql2');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
app.use(express.json());
app.use(cors());


const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'task_manager',
    
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
  
    if (!task_name && !status) {
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
  
      res.json('tasks inserted successfully !');
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
    console.log('Received data:', req.body);

    
    let taskName = req.body.task_name;
    let Status = req.body.status;
    let Desc = req.body.description;
    let userName = req.body.user_name;
    let AssignedAt=req.body.assigned_at


    // Insert into task_assignments table
    let sql = `insert into task_assignment (task_name,status,descripton,user_id,user_name,assigned_at)
    Values('${taskName}','${Status}','${Desc}','${userName}','${AssignedAt}')`
   

    db.query(sql,(err, result) => {
        if (err) {
            console.error('Error assigning task to user:', err);
            res.status(500).send('Internal Server Error');
            return;
        }

        res.send('Task assigned successfully!');
    });
});

app.put('/update-task-assignment/:taskId/:userId', (req, res) => {
    console.log('Received data:', req.body);

    let taskId = req.params.taskId;
    let userId = req.params.userId;
    let taskName = req.body.task_name;
    let status = req.body.status;
    let desc = req.body.descripton;
    let userName = req.body.user_name;
    let assignedAt = req.body.assigned_at;

    // Update task_assignment table
    let sql = `
        UPDATE task_assignment
        SET task_name = ?, status = ?, descripton = ?,
            user_name = ?, assigned_at = ?
        WHERE task_id = ? AND user_id = ?
    `;

    let values = [taskName, status, desc, userName, assignedAt, taskId, userId];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error updating task assignment:', err);
            res.status(500).send('Internal Server Error');
            return;
        }

        res.send('Task assignment updated successfully!');
    });
});
app.get('/tasks-assignment', (req, res) => {
    const sql = 'SELECT * FROM task_assignment';

    db.query(sql, (err, result) => {
        if (err) {
            console.error('Error getting list of tasks:', err);
            res.status(500).send('Internal Server Error');
            return;
        }

        res.json(result);
    });
});



// // Endpoint to view tasks assigned to a specific user/
// app.get('/user-tasks/:userId', (req, res) => {
//     const userId = req.params.userId;

//     if (!userId) {
//         return res.status(400).send('User ID is required');
//     }

//     const sql = 'SELECT * FROM task_assignments WHERE user_id=?';
//     const values = [userId];

//     db.query(sql, values, (err, result) => {
//         if (err) {
//             console.error('Error getting user tasks:', err);
//             res.status(500).send('Internal Server Error');
//             return;
//         }

//         res.json(result);
//     });
// });

// // Task Status:

// // Endpoint to update the status of a task /
// app.put('/update-task-status/:id', (req, res) => {
//     const taskId = req.params.id;
//     const { status } = req.body;

//     if (!status) {
//         return res.status(400).send('Task status is required');
//     }

//     const sql = 'UPDATE tasks SET status=? WHERE id=?';
//     const values = [status, taskId];

//     db.query(sql, values, (err, result) => {
//         if (err) {
//             console.error('Error updating task status:', err);
//             res.status(500).send('Internal Server Error');
//             return;
//         }

//         res.send('Task status updated successfully');
//     });
// });

// // Endpoint to retrieve tasks based on their status/
// app.get('/tasks-by-status/:status', (req, res) => {
//     const status = req.params.status;

//     if (!status) {
//         return res.status(400).send('Task status is required');
//     }

//     const sql = 'SELECT * FROM tasks WHERE status=?';
//     const values = [status];

//     db.query(sql, values, (err, result) => {
//         if (err) {
//             console.error('Error getting tasks by status:', err);
//             return res.status(500).send('Internal Server Error');
//         }

//         res.json(result);
//     });
// });
  
app.post('/users',(req,res)=>{
    const{name , email}=req.body;

    const sql='Insert into users (name,email) Values (?,?)';
    const values = [name,email];

    db.query(sql,values,(err,result)=>{
        if(err){
            console.log('Error to Insert values of users:' , err);
            return res.status(400).send('User is required !');
        }
        res.json('Data inserted successfully !');

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

app.get('/users', (req, res) => {
    const sql = 'SELECT * FROM users';

    db.query(sql, (err, result) => {
        if (err) {
            console.error('Error getting all users:', err);
            return res.status(500).send('Internal Server Error');
        }
        if(result.length>0){
            res.send({
                message:'data selected all',
                data:result     
            })
        }
        
    });
});
app.delete('/users/:id', (req, res) => {
    const userId = req.params.id;

    if (!userId) {
        return res.status(400).send('User ID is required');
    }

    const sql = 'DELETE FROM users WHERE id=?';
    const values = [userId];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error deleting user:', err);
            res.status(500).send('Internal Server Error');
            return;
        }

        res.send('User deleted successfully');
    });
});

app.put('/users/:id',(req,res)=>{
    console.log((reqbody,'updatedata'));
    let uID = req.params.id;
    let name = req.body.name;
    let email = req.body.email;

    let sql = `update user set name = ? ,email = ? where id = ?`;

    db.query(sql,[name, email, uID],(err,result)=>{
        if(err){
            console.log(err);
        }
        res.send({
            message:'data updated'
        })
    })
})






// Task Assignment:

// Endpoint to assign a task to a user /
// app.post('/assign-task', (req, res) => {
//     const { taskId, userId } = req.body;

//     if (!taskId || !userId) {
//         return res.status(400).send('Task ID and User ID are required');
//     }

//     const sql = 'INSERT INTO task_assignments (task_id, user_id) VALUES (?, ?)';
//     const values = [taskId, userId];

//     db.query(sql, values, (err, result) => {
//         if (err) {
//             console.error('Error assigning task to user:', err);
//             res.status(500).send('Internal Server Error');
//             return;
//         }

//         res.json('Task assigned to user successfully')
//     });
// });

// Endpoint to view tasks assigned to a specific user/
// app.get('/user-tasks/:userId', (req, res) => {
//     const userId = req.params.userId;

//     if (!userId) {
//         return res.status(400).send('User ID is required');
//     }

//     const sql = `
//         SELECT tasks.*, task_assignments.id AS assignment_id
//         FROM tasks
//         JOIN task_assignments ON tasks.id = task_assignments.task_id
//         WHERE task_assignments.user_id = ?`;

//     const values = [userId];

//     db.query(sql, values, (err, result) => {
//         if (err) {
//             console.error('Error getting user tasks:', err);
//             res.status(500).send('Internal Server Error');
//             return;
//         }

//         res.json(result);
//     });
// });

// // Task Status:

// // Endpoint to update the status of a task /
// app.put('/update-task-status/:id', (req, res) => {
//     const taskId = req.params.id;
//     const { status } = req.body;

//     if (!status) {
//         return res.status(400).send('Task status is required');
//     }

//     const sql = 'UPDATE tasks SET status=? WHERE id=?';
//     const values = [status, taskId];

//     db.query(sql, values, (err, result) => {
//         if (err) {
//             console.error('Error updating task status:', err);
//             res.status(500).send('Internal Server Error');
//             return;
//         }

//         res.send('Task status updated successfully');
//     });
// });

// // Endpoint to retrieve tasks based on their status/
// app.get('/tasks-by-status/:status', (req, res) => {
//     const status = req.params.status;

//     if (!status) {
//         return res.status(400).send('Task status is required');
//     }

//     const sql = 'SELECT * FROM tasks WHERE status=?';
//     const values = [status];

//     db.query(sql, values, (err, result) => {
//         if (err) {
//             console.error('Error getting tasks by status:', err);
//             return res.status(500).send('Internal Server Error');
//         }

//         res.json(result);
//     });
// });







app.listen(3000,()=>{
    console.log('server running...')
})