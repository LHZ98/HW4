import { todoApi } from "./todoApis.js";

const generateli = (todos) => {
  const addbtn = document.getElementById("addbtn");
  addbtn.onclick = async () => {
    await todoApi.addTodo({
      content: document.getElementById("userinput").value,
      isCompleted: false,
    });
    generateli(todoApi.todos);
    document.getElementById("userinput").value = "";
  };
  const root = document.getElementById("ul");
  while (root.firstChild) {
    root.removeChild(root.firstChild);
  }
  const nodes = todos.map((todo, index) => {
    const li = document.createElement("li");
    const todocontent = document.createElement("span");
    todocontent.textContent = todo.content;
    todocontent.ondblclick = async () => {
      await todoApi.modTodo(index);
      generateli(todoApi.todos);
    };
    if (todo.isCompleted) {
      todocontent.classList.add("isCompleted");
    }
    const delbutton = document.createElement("button");
    delbutton.textContent = "delete";
    delbutton.onclick = async () => {
      console.log(index);
      await todoApi.delTodo(index);
      generateli(todoApi.todos);
    };
    li.appendChild(todocontent);
    li.appendChild(delbutton);
    return li;
  });
  root.append(...nodes);
};
generateli(todoApi.todos);
/*
Given an Api, implement a todo app(features includes Add a todo, Change a todo Status, Delete Todo) in Vanilla JavaScript. 
FYI: You can add some css styles you want.
*/

//implement your app here
