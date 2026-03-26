
const API = window.location.origin;

const input = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const list = document.getElementById("taskList");

// 🔹 Load all todos when page loads
window.onload = getTodos;

// ✅ GET TODOS
async function getTodos() {
  try {
    const res = await fetch(`${API}/api/todos`);
    const data = await res.json();

    list.innerHTML = "";

    data.forEach(todo => {
      const li = document.createElement("li");
      li.textContent = todo.text;

      // Delete button
      const delBtn = document.createElement("button");
      delBtn.textContent = "Delete";
      delBtn.onclick = () => deleteTodo(todo._id);

      li.appendChild(delBtn);
      list.appendChild(li);
    });

  } catch (err) {
    console.error("Error fetching todos:", err);
  }
}

// ✅ ADD TODO
addBtn.addEventListener("click", async () => {
  const task = input.value.trim();

  if (!task) {
    alert("Enter a task");
    return;
  }

  try {
    await fetch(`${API}/api/todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ text: task })
    });

    input.value = "";
    getTodos(); // refresh list

  } catch (err) {
    console.error("Error adding todo:", err);
  }
});

// ✅ DELETE TODO
async function deleteTodo(id) {
  try {
    await fetch(`${API}/api/todos/${id}`, {
      method: "DELETE"
    });

    getTodos(); // refresh list

  } catch (err) {
    console.error("Error deleting todo:", err);
  }
}