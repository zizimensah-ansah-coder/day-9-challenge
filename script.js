//API URL
const API_URL = "https://jsonplaceholder.typicode.com/todos";

//Array for tasks
let tasks= [];

//Getting tasks and rendering them in DOM
const taskList = document.getElementById("taskList");
const taskForm = document.getElementById("taskForm");
const searchInput= document.getElementById("searchInput");
const statusFilter = document.getElementById("statusFilter");
const loadingMessage = document.getElementById("loadingMessage");
const successMessage = document.getElementById("successMessage");
const emptyMessage = document.getElementById("emptyMessage");
const errorMessage= document.getElementById("errorMessage");

//loading message
function showLoading() {
    loadingMessage.style.display = "block";
    loadingMessage.textContent = "Loading..";
}
function hideLoading() {
    loadingMessage.style.display = "none";
}

//success message
function showSuccess(message) {
    successMessage.textContent= message;
    successMessage.style.display = "block";
}
function hideSuccess() {
    successMessage.textContent = "";
    successMessage.style.display="none";
}
//error message
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.style.display="block";
}
function hideError() {
    errorMessage.textContent = "";
    errorMessage.style.display="none";
}
//Get Tasks from API
async function getTasks() {
    try {
        showLoading();
        hideError();
        await new Promise(resolve => setTimeout(resolve(resolve,5000)));
        const response =await fetch(API_URL);

        if(!response.ok) {
            throw new Error("Failed to fetch tasks")
        }
        const data = await response.json();
        tasks = data;
        console.log(tasks);
    
    }catch (error) {
        console.error(error);
        showError("Unable to load tasks.");
    }finally {
        hideLoading();
    }

}

getTasks();
//rendering tasks
function renderTasks(tasks) {
    
    taskList.innerHTML="";
    //displaying each tasks
    tasks.forEach(function(task) {
        console.log("FULL TASK: " ,task);
        const taskDiv =document.createElement("div");
        taskDiv.innerHTML = `
        <p>Id:${task.id}</p>
        <p>Title:${task.title}<p>
        <p>Status:${task.status}</p>
        `;
        const viewButton = document.createElement("button");
        viewButton.textContent = "View";
        //button to get one task
        viewButton.addEventListener("click",function() {
            console.log("This task ID is:" ,task.id);
            getSingleTask(task.id);
        });
        taskDiv.appendChild(viewButton);
        taskList.appendChild(taskDiv);
    });

}

renderTasks([
    {
        id:1,
        title:"Go to the gym",
        status:"Pending"
    }
]);

//Creating a getSingleTask
async function getSingleTask(taskId) {
    const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${taskId}`
    );
    const task = await response.json();
    console.log(task);
};
