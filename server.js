const express = require('express');
const morgan = require('morgan');

const ProjectsRouter = require('./api/routers/projects-router');
const ResourcesRouter = require('./api/routers/resources-router');


const server = express();
server.use(express.json());
server.use(morgan('dev'));

server.get('/', (req, res) => {
    res.status(200).json({ message: "It's Working!!" });
});

server.use('/api/projects', ProjectsRouter);
server.use('/api/resources', ResourcesRouter);

const port = 4000;

server.listen(port, () => console.log(`Server is running on port ${port}`));