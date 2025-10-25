const content = document.getElementById("content");
const navLinks = document.querySelectorAll("nav a");

window.addEventListener("hashchange", router);
window.addEventListener("load", router);

let students = JSON.parse(localStorage.getItem("students")) || [];

// Navigation Highlight
function setActiveLink(hash) {
  navLinks.forEach(link => link.classList.remove("active"));
  document.querySelector(`a[href="${hash}"]`)?.classList.add("active");
}

// Router
function router() {
  const hash = window.location.hash || "#home";
  setActiveLink(hash);
  if (hash === "#home") showHome();
  else if (hash === "#add") showAddForm();
  else if (hash === "#about") showAbout();
}

// Home Page
function showHome() {
  let html = `<div class="container">
    <h2>📋 Student List</h2><hr style="margin: 10px 0; border-color: #fff;">
  `;
  if (students.length === 0) {
    html += `<p>No students added yet. Click “Add Student” to get started!</p>`;
  } else {
    students.forEach((s, i) => {
      html += `
        <div class="student-card">
          <div>
            <strong>${s.name}</strong><br>
            Roll No: ${s.roll}<br>
            Dept: ${s.dept}
          </div>
          <button onclick="deleteStudent(${i})">Delete</button>
        </div>`;
    });
  }
  html += `</div>`;
  content.innerHTML = html;
}

// Add Student Page
function showAddForm() {
  content.innerHTML = `
    <div class="container">
      <h2>➕ Add New Student</h2>
      <input id="name" placeholder="Enter Student Name">
      <input id="roll" placeholder="Enter Roll Number">
      <input id="dept" placeholder="Enter Department">
      <button onclick="addStudent()">Add Student</button>
    </div>`;
}

function addStudent() {
  const name = document.getElementById("name").value.trim();
  const roll = document.getElementById("roll").value.trim();
  const dept = document.getElementById("dept").value.trim();

  if (name && roll && dept) {
    students.push({ name, roll, dept });
    localStorage.setItem("students", JSON.stringify(students));
    alert("✅ Student added successfully!");
    window.location.hash = "#home";
  } else {
    alert("⚠️ Please fill all fields!");
  }
}

// Delete Student
function deleteStudent(index) {
  if (confirm("Are you sure you want to delete this student?")) {
    students.splice(index, 1);
    localStorage.setItem("students", JSON.stringify(students));
    showHome();
  }
}

// About Page
function showAbout() {
  content.innerHTML = `
    <div class="container">
      <h2>💡 About This Project</h2>
      <p>This modern Single Page Application is built using only <strong>HTML, CSS, and JavaScript</strong>.</p>
      <p>It allows users to add, view, and delete student records without any page reloads.</p>
      <p>Data is saved in your browser using <strong>localStorage</strong> so it persists even after refreshing.</p>
      <p style="margin-top:10px; color:#ffeb3b;">Designed with 💖 by You!</p>
    </div>`;
}