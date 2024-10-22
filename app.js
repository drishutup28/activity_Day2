const express = require("express");
const app = express();
const path = require("path");
const PORT = 8080;
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
let tasks = [];
app.get("/", (req, res) => {
    let name = "Sam";
    let place = "Jakhu";
    let currentHour = new Date().getHours();
    let greeting;

    if (currentHour < 12) {
        greeting = "Good Morning";
    } else if (currentHour < 18) {
        greeting = "Good Afternoon";
    } else {
        greeting = "Good Evening";
    }
    res.render("index", { name, destination: place, greeting, tasks });
});
app.post("/add-task", (req, res) => {
    const newTask = req.body.task;
    if (newTask) {
        tasks.push(newTask);
    }
    res.redirect("/todo");
});
app.post("/edit-task/:id", (req, res) => {
    const taskId = req.params.id;
    const updatedTask = req.body.updatedTask;
    if (updatedTask && tasks[taskId]) {
        tasks[taskId] = updatedTask;
    }
    res.redirect("/todo");
});
app.post("/delete-task/:id", (req, res) => {
    const taskId = req.params.id;
    tasks.splice(taskId, 1);
    res.redirect("/todo");
});
app.get("/todo", (req, res) => {
    let name = "Sam";
    let place = "Jakhu";
    let currentHour = new Date().getHours();
    let greeting;

    if (currentHour < 12) {
        greeting = "Good Morning";
    } else if (currentHour < 18) {
        greeting = "Good Afternoon";
    } else {
        greeting = "Good Evening";
    }

    res.render("index", { name, destination: place, greeting, tasks });
});

app.listen(PORT, (err) => {
    if (err) console.log(err);
    else console.log(Listening to Port ${PORT});
});
