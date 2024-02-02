import dateFormat from 'date-format';

import mysql from '../config/mysql-config.js';

/* database initialization */
mysql.init().catch(err => {
  console.log(err);
  process.exit(1);
});

/* all functions return json objects */

/* returns all tasks or error message */
async function getAllTasks(userID, filters, sort) {

  const availableFilters = filters.available;
  const orderBy = ['asc', 'desc'];

  if(!availableFilters.includes(sort.column)) {
    sort.column = 'completion_date';
  }

  if(!orderBy.includes(sort.value)) {
    sort.value = 'desc';
  }

  let sql = `
    SELECT
    id, name, description, completion_date, status
    FROM tasks
    WHERE user_id = ?
  `;

  if(Object.keys(filters.query).length > 0) {
    Object.keys(filters.query).forEach(elem => {
      const fragment = ` AND ${elem} = ?`;
      sql += fragment;
    });
  }

  sql += ` ORDER BY ${sort.column} ${sort.value}`;

  const params = [ userID ];

  Object.values(filters.query).forEach(elem => {
    params.push(elem);
  });

  const queryPromise =  new Promise((acc, rej) => {
    mysql.execute(sql, params, (err, result) => {
      if(err) {
        return rej(err);
      }

      acc(result);
    });
  });

  return queryPromise;
}

/* returns task with given id or error message */
async function getTask(id, userID) {
  const sql = `
    SELECT
    id, name, description, completion_date, status
    FROM tasks
    WHERE id = ? AND user_id = ?
  `;

  const params = [ id, userID ];

  const queryPromise =  new Promise((acc, rej) => {
    mysql.execute(sql, params, (err, result) => {
      if(err) {
        return rej(err);
      }

      acc(result[0]);
    });
  });

  return queryPromise;
}

/* returns error message or success message */
async function addTask(task) {
  const {
    id,
    name,
    description,
    status,
    userID
  } = task;

  let {
    completion_date
  } = task;

  completion_date = dateFormat.asString('yyyy-MM-dd hh:mm:ss', new Date(completion_date));

  const sql = `
    INSERT INTO tasks
    VALUES(?, ?, ?, ?, ?, ?)
  `;

  const params = [ id, name, description, completion_date, status, userID ];

  const queryPromise = new Promise((acc, rej) => {
    mysql.execute(sql, params, (err, result) => {
      if(err) {
        return rej(err);
      }

      acc({
        message: 'successfully added!'
      });
    });
  });

  return queryPromise;
}

/* returns error message or success message */
async function updateTask(task) {
  const {
    id,
    name,
    description,
    status,
    userID
  } = task;

  let {
    completion_date
  } = task;

  completion_date = dateFormat.asString('yyyy-MM-dd hh:mm:ss', new Date(completion_date));

  const sql = `
    UPDATE tasks
    SET name = ?, description = ?, completion_date = ?, status = ?
    WHERE id = ? AND user_id = ?
  `;

  const params = [ name, description, completion_date, status, id, userID ];

  const queryPromise = new Promise((acc, rej) => {
    mysql.execute(sql, params, (err) => {
      if(err) {
        return rej(err);
      }

      acc({
        message: 'successfully updated!'
      });
    });
  });

  return queryPromise;
}

/* returns error message or success message */
async function deleteTask(id, userID) {
  const sql = `
    DELETE
    FROM tasks
    WHERE id = ? AND user_id = ?
  `;

  const params = [ id, userID ];

  const queryPromise = new Promise((acc, rej) => {
    mysql.execute(sql, params, (err) => {
      if(err) {
        return rej(err);
      }

      acc({
        message: 'successfully deleted!'
      });
    });
  });

  return queryPromise;
}

async function deleteAllTasks(userID) {
  const sql = `
    DELETE
    FROM tasks
    WHERE user_id = ?
  `;

  const params = [ userID ];

  const queryPromise = new Promise((acc, rej) => {
    mysql.execute(sql, params, (err) => {
      if(err) {
        return rej(err);
      }

      acc({
        message: 'successfully deleted all tasks!'
      });
    });
  });

  return queryPromise;
}

export default {
  getAllTasks,
  getTask,
  addTask,
  updateTask,
  deleteTask,
  deleteAllTasks
};