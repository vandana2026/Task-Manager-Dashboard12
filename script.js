const navItems = document.querySelectorAll(".nav");
const sections = document.querySelectorAll(".section");
const filters = document.querySelectorAll(".filter-btn");

let tasks = [];
let currentFilter = "all";

navItems.forEach(item=>{
  item.addEventListener("click",()=>{
    navItems.forEach(n=>n.classList.remove("active"));
    item.classList.add("active");

    sections.forEach(sec=>sec.classList.remove("active"));
    document.getElementById(item.dataset.section).classList.add("active");
  });
});

document.getElementById("addBtn").addEventListener("click",()=>{
  const input = document.getElementById("taskInput");
  if(input.value==="") return;

  tasks.push({name:input.value,completed:false});
  input.value="";
  renderTasks();
});

filters.forEach(btn=>{
  btn.addEventListener("click",()=>{
    filters.forEach(b=>b.classList.remove("active"));
    btn.classList.add("active");
    currentFilter=btn.dataset.filter;
    renderTasks();
  });
});

function renderTasks(){
  const taskList=document.getElementById("taskList");
  taskList.innerHTML="";

  let filtered=tasks;

  if(currentFilter==="completed"){
    filtered=tasks.filter(t=>t.completed);
  }
  if(currentFilter==="pending"){
    filtered=tasks.filter(t=>!t.completed);
  }

  filtered.forEach((task,index)=>{
    const card=document.createElement("div");
    card.classList.add("task-card");

    const info=document.createElement("div");
    info.classList.add("task-info");

    const name=document.createElement("span");
    name.innerText=task.name;

    const status=document.createElement("span");
    status.classList.add("status");

    if(task.completed){
      status.innerText="Completed";
      status.classList.add("completed-status");
      name.classList.add("completed-text");
    }else{
      status.innerText="Pending";
      status.classList.add("pending-status");
    }

    name.addEventListener("click",()=>{
      task.completed=!task.completed;
      renderTasks();
    });

    const del=document.createElement("button");
    del.innerText="Delete";
    del.classList.add("delete-btn");

    del.addEventListener("click",()=>{
      tasks.splice(index,1);
      renderTasks();
    });

    info.appendChild(name);
    info.appendChild(status);

    card.appendChild(info);
    card.appendChild(del);

    taskList.appendChild(card);
  });

  document.getElementById("total").innerText=tasks.length;
  document.getElementById("completed").innerText=
    tasks.filter(t=>t.completed).length;
  document.getElementById("pending").innerText=
    tasks.filter(t=>!t.completed).length;
}