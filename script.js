// Sample 5 courses with YouTube links
const courses = [
  { id: "1", title: "HTML Basics", video: "https://www.youtube.com/embed/UB1O30fR-EE" },
  { id: "2", title: "CSS Styling", video: "https://www.youtube.com/embed/yfoY53QXEnI" },
  { id: "3", title: "JavaScript Intro", video: "https://www.youtube.com/embed/hdI2bqOjy3c" },
  { id: "4", title: "Responsive Design", video: "https://www.youtube.com/embed/srvUrASNj0s" },
  { id: "5", title: "Frontend Projects", video: "https://www.youtube.com/embed/3PHXvlpOkf4" }
];

// Handle login
if (document.getElementById("loginForm")) {
  document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;

    localStorage.setItem("studentName", name);
    localStorage.setItem("studentEmail", email);

    // Create fresh progress if new user
    const allProgress = JSON.parse(localStorage.getItem("allProgress") || "{}");
    if (!allProgress[email]) allProgress[email] = {};
    localStorage.setItem("allProgress", JSON.stringify(allProgress));

    window.location.href = "courses.html";
  });
}

// Show course list
if (document.getElementById("courseList")) {
  const name = localStorage.getItem("studentName");
  const email = localStorage.getItem("studentEmail");
  const allProgress = JSON.parse(localStorage.getItem("allProgress") || "{}");
  const userProgress = allProgress[email] || {};

  document.getElementById("studentName").textContent = name;

  courses.forEach(course => {
    const isDone = userProgress[course.id];
    const card = document.createElement("div");
    card.className = "course-card";
    card.innerHTML = `
      <h3>${course.title}</h3>
      <p>${isDone ? "✅ Completed" : "🕒 Not Completed"}</p>
      <button onclick="startCourse('${course.id}')">Start</button>
    `;
    document.getElementById("courseList").appendChild(card);
  });
}

// Start course
function startCourse(id) {
  localStorage.setItem("currentCourse", id);
  window.location.href = "course.html";
}

// Show video
if (document.getElementById("videoFrame")) {
  const courseId = localStorage.getItem("currentCourse");
  const course = courses.find(c => c.id === courseId);
  if (course) {
    document.getElementById("videoFrame").src = course.video;
    document.getElementById("courseTitle").textContent = course.title;
  }
}

// Mark as complete
function markAsComplete() {
  const email = localStorage.getItem("studentEmail");
  const courseId = localStorage.getItem("currentCourse");

  const allProgress = JSON.parse(localStorage.getItem("allProgress") || "{}");
  if (!allProgress[email]) allProgress[email] = {};
  allProgress[email][courseId] = true;

  localStorage.setItem("allProgress", JSON.stringify(allProgress));
  alert("✅ Progress Saved!");
}

function goBack() {
  window.location.href = "courses.html";
}
