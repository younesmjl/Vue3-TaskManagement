let tasks = []; //a la place de la bdd

function create(task) {
  tasks = [task, ...tasks];
  console.log("services | create() | tasks", tasks);
}

function read() {
  return tasks;
}
export default {
  create,
  read,
};
