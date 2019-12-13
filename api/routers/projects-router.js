const express = require('express');
const Projects = require('../helpers/projects-helper');

const router = express.Router();

router.get('/', (req, res) => {
    Projects.getProjects()
        .then(projects => {
            res.status(200).json(projects);
        }).catch(error => {
            console.log(error);
            res.status(500).json({ error: "There was an error with the request..." });
        });
});

router.post('/', (req, res) => {
    const post = req.body;
    if (!post.name) {
        res.status(400).json({ error: "Missing required field name." });
    }

    post.completed = post.completed ? 1 : 0;

    Projects.add(post)
        .then(project => {
            res.status(201).json(project);
        }).catch(error => {
            console.log(error);
            res.status(500).json({ error: "There was an error with the request..." });
        });
});


router.get('/:id/tasks', (req, res) => {
    const { id } = req.params;
    Projects.getTasks(id)
        .then(tasks => {
            res.status(200).json(tasks);
        }).catch(error => {
            console.log(error);
            res.status(500).json({ error: "There was an error with the request..." });
        });
});

router.post('/:id/tasks', (req, res) => {
    const { id } = req.params;
    const post = req.body;


    if (!post.description) {
        res.status(400).json({ error: "Missing required field name." });
    }

    post.completed = post.completed ? 1 : 0;
    post.project_id = id;

    Projects.addTask(post)
        .then(task => {
            res.status(200).json(task);
        }).catch(error => {
            console.log(error);
            res.status(500).json({ error: "There was an error with the request..." });
        });
});

module.exports = router;