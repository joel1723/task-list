// Define UI Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listeners
loadEventListeners();

// Load all event listeners
function loadEventListeners() {
  //DOM  load event
  document.addEventListener('DOMcontentLoaded',getTask)
  // Add task event
  form.addEventListener('submit', addTask);
  //remove task event
  taskList.addEventListener('click', removeTask)
  // clear task event
  clearBtn.addEventListener('click',clearTask)
  //filter task event 
  filter.addEventListener('key up',filterTask)

}

//get task from ls 
function getTask(){
  
    let task;
    if(localStorage.getItem('task')===null){
    task= [];
    }
    else{
       task= JSON.parse(localStorage.getItem('task'))
    }

     taskforEach(function(task){

 // Create li element
 const li = document.createElement('li');
 // Add class
 li.className = 'collection-item';
 // Create text node and append to li
 li.appendChild(document.createTextNode(task));
 // Create new link element
 const link = document.createElement('a');
 // Add class
 link.className = 'delete-item secondary-content';
 // Add icon html
 link.innerHTML = '<i class="fa fa-remove"></i>';
 // Append the link to li
 li.appendChild(link);

 // Append li to ul
 taskList.appendChild(li);


     })
  }

// Add Task
function addTask(e) {
  if(taskInput.value === '') {
    alert('Add a task');
  }

  // Create li element
  const li = document.createElement('li');
  // Add class
  li.className = 'collection-item';
  // Create text node and append to li
  li.appendChild(document.createTextNode(taskInput.value));
  // Create new link element
  const link = document.createElement('a');
  // Add class
  link.className = 'delete-item secondary-content';
  // Add icon html
  link.innerHTML = '<i class="fa fa-remove"></i>';
  // Append the link to li
  li.appendChild(link);

  // Append li to ul
  taskList.appendChild(li);

  // Store in local storage
  storeTaskInLocalStorage();

  // Clear input
  taskInput.value = '';

  e.preventDefault();
}


// store Task
function storeTaskInLocalStorage(task){
  let task;
  if(localStorage.getItem('task')===null){
  task= [];
  }
  else{
     task= JSON.parse(localStorage.getItem('task'))
  }
  task.push(task)

  localStorage.setItem('task',JSON.stringify(task))
  

}

// Remove task
function removeTask(e){
  if(e.target.parentElement.contains('delete-item')){
    if(confirm('are you sure')){
    e.target.parentElement.parentElement.remove()
    
   //remove from ls 
  removeTaskFromLocalStorage( e.target.parentElement.parentElement)
  }

}
}
// remove from ls
function removeTaskFromLocalStorage(taskItem){

  let task;
  if(localStorage.getItem('task')===null){
  task= [];
  }
  else{
     task= JSON.parse(localStorage.getItem('task'))
  }

  task.forEach(function(task, index){
  if(taskItem.textContent=== task){
    taskList.splice(index,1);

  }
  })
  localStorage.setItem('task',JSON.stringify(task));
    
  
  
}

// Clear task
function clearTask(){
  while(taskList.firstChild){
    taskList.removeChild(taskList.firstChild);
  }

  // clear from local storage
  clearTaskFromLocalStorage()
}

// clear task from ls
function clearTaskFromLocalStorage(){
  localStorage.clear();
}


// filter task event 
function filterTask(){
  const text =e.target.value.toLowerCase();
  document.querySelectorAll('.collection-item').forEach(function(task){
    const item =task.firstChild.textContent;
    if(item.toLowerCase().indexOf(text) != -1){
     task.style.display = ' block';
    }else{
      task.style.display = ' none';
    }

  });
  
}