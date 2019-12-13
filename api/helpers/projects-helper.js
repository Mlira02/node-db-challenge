const db = require('../../data/dbconfig.js');

const getProjects = () => {
    return db('projects')
    .select('*');
};

const getProjectById = (id) => {
    return db('projects')
    .select('*')
    .where({ id })
    .first();
};

const add = (project) => {
    return db('projects')
    .insert(project, '*')
    .then(id => {
        return getProjectById(...id)
        .then(project => {
            project.completed = project.completed > 0;
            return project;
        });
    });
};

const getTaskById = id => {
    return db('tasks')
    .select('*')
    .where({ id })
        .first();
    };

    const getTasks = id => {
    return db
    .select('projects.name', 'projects.description', 'tasks.*')
        .from('tasks')
        .join('projects', 'tasks.project_id', '=', 'projects.id')
        .where('tasks.project_id', id);
    };
    
    const addTask = (task) => {
        return db('tasks')
        .insert(task, '*')
        .then(id => {
            return getTaskById(...id)
            .then(task => {
                task.completed = task.completed > 0;
                return task;
            });
        })
    };
    
    module.exports = {
        getProjects,
        getProjectById,
        add,
        getTaskById,
        getTasks,
        addTask,
    };