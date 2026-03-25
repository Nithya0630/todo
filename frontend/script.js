const API = "http://localhost:5000/api/todos";

// Load todos
async function getTodos() {
  const res = await fetch(API);
  const data = await res.json();

  const list = document.getElementById("todoList");
  list.innerHTML = "";

  data.forEach(todo => {
    const li = document.createElement("li");

    li.innerHTML = `
      ${todo.text}
      <button onclick="deleteTodo('${todo._id}')">❌</button>
    `;

    list.appendChild(li);
  });
}

// Add todo
async function addTodo() {
  const input = document.getElementById("todoInput");

  if (input.value.trim() === "") {
    alert("Enter something!");
    return;
  }

  await fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      text: input.value
    })
  });

  input.value = "";
  getTodos();
}

// Delete todo
async function deleteTodo(id) {
  await fetch(`${API}/${id}`, {
    method: "DELETE"
  });

  getTodos();
}

// Initial load
getTodos();
