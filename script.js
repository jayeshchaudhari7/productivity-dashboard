const welcomeScreen = document.querySelector(".welcome-screen");
const usernameInput = document.querySelector("#usernameInput");
const enterBtn = document.querySelector("#enterBtn");
const username = document.querySelector(".username");

let savedName = localStorage.getItem("username");

if(savedName){
  username.textContent = savedName;
  welcomeScreen.style.display = "none";
}

enterBtn.addEventListener("click",()=>{
    const name = usernameInput.value.trim();
    if(name===""){
        alert("Please enter your name.");
        return;
    }

    localStorage.setItem("username",name);
    username.textContent = name;
    welcomeScreen.style.display = "none";

});




let todoFull = document.querySelector(".todoFull");
let plannerFull = document.querySelector(".plannerFull");
let pomodoroFull = document.querySelector(".pomodoroFull");
let goalFull = document.querySelector(".goalFull");

let close = document.querySelector(".close");
let close2 = document.querySelector(".close2");
let close3 = document.querySelector(".close3");
let close4 = document.querySelector(".close4");

let todo = document.querySelector(".todo");
let planner = document.querySelector(".planner");
let pomodoro = document.querySelector(".pomodoro");
let goal = document.querySelector(".goal");

todo.addEventListener("click", () => {
  todoFull.classList.add("show");
  console.log("todo clicked");
  
});

close.addEventListener("click", () => {
  todoFull.classList.remove("show");
});

planner.addEventListener("click", () => {
  plannerFull.classList.add("show");
});
close2.addEventListener("click", () => {
  plannerFull.classList.remove("show");
});

pomodoro.addEventListener("click", () => {
  pomodoroFull.classList.add("show");
});
close3.addEventListener("click", () => {
  pomodoroFull.classList.remove("show");
});

goal.addEventListener("click", () => {
  goalFull.classList.add("show");
  console.log("goal clicked");
});
close4.addEventListener("click", () => {
  goalFull.classList.remove("show");
});



const apiKey = "bd5e378503939ddaee76f12ad7a97608";


function updateDateTime() {
  const now = new Date();
  document.getElementById("time").innerHTML = now.toLocaleTimeString();
  document.getElementById("date").innerHTML = now.toDateString();
}

updateDateTime();

setInterval(updateDateTime, 1000);


navigator.geolocation.getCurrentPosition(
  async (position) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`,
      );

      const data = await response.json();

      document.getElementById("city").textContent = data.name;
      document.getElementById("temp").textContent =
        `${Math.round(data.main.temp)}°C`;
      document.getElementById("weather").textContent = data.weather[0].main;

      document.getElementById("wind").textContent = `${data.wind.speed} m/s`;

      document.getElementById("humidity").textContent =
        `${data.main.humidity}%`;

      document.getElementById("visibility").textContent =
        `${data.visibility / 1000} km`;
    } catch (error) {
      console.error("Error fetching weather:", error);
    }
  },
  (error) => {
    alert("Please allow location access to see your local weather.");
  },
);

async function getQuote() {
  try {
    const response = await fetch("https://dummyjson.com/quotes/random");

    const data = await response.json();

    document.getElementById("quote").textContent = `"${data.quote}"`;
    document.getElementById("author").textContent = `- ${data.author}`;
  } catch (error) {
    console.error(error);
  }
}
getQuote();




const todoStatus = document.querySelector(".todo-status");
const statusItems = document.querySelectorAll(".todo-status p");
const form = document.querySelector(".todo-form");
const taskContainer = document.querySelector(".task-cards-container");
const searchInput = document.querySelector("#search");

let tasksArr = JSON.parse(localStorage.getItem("tasks")) || [];
let editIdx = null;

function ui(data = tasksArr) {
  if (data.length === 0) {
    taskContainer.innerHTML = "<h1>No Task Created Yet</h1>";
    return;
  }

  taskContainer.innerHTML = data
    .map(
      (elem, idx) => `
        <div class="task-card">
          <div class="task-text">
            <h3 class="taskname">${elem.taskName}</h3>
            <h3 class="taskstatus">${elem.taskStatus}</h3>
          </div>

          <div class="task-btns">
            <div class="completedTask" onclick="completeTask(${idx})">
              <img src="https://cdn-icons-png.flaticon.com/512/6459/6459980.png"/>
            </div>

            <button onclick="editTask(${idx})">Edit</button>
            <button onclick="deleteTask(${idx})">Delete</button>
          </div>
        </div>
      `
    )
    .join("");
}
ui();

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const taskName = e.target[0].value.trim();
  const taskStatus = e.target[1].value;

  if (taskName === "") {
    alert("Enter a valid task");
    return;
  }

  const obj = {
    taskName,
    taskStatus,
  };

  if (editIdx === null) {
    tasksArr.push(obj);
  } else {
    tasksArr[editIdx] = obj;
    editIdx = null;
  }

  localStorage.setItem("tasks", JSON.stringify(tasksArr));

  form.reset();

  ui();
});

function editTask(idx) {
  editIdx = idx;

  form[0].value = tasksArr[idx].taskName;
  form[1].value = tasksArr[idx].taskStatus;
}

function deleteTask(idx) {
  tasksArr.splice(idx, 1);

  localStorage.setItem("tasks", JSON.stringify(tasksArr));

  ui();
}

function completeTask(idx){
  tasksArr[idx].taskStatus = "Completed";

  localStorage.setItem("tasks", JSON.stringify(tasksArr));

  ui();
}


todoStatus.addEventListener("click", (e) => {
  if (e.target.tagName !== "P") return;

  statusItems.forEach((item) => item.classList.remove("active"));
  e.target.classList.add("active");

  const status = e.target.textContent;

  if (status === "All") {
    ui(tasksArr);
    return;
  }

  const filteredTasks = tasksArr.filter((task) => task.taskStatus === status);

  ui(filteredTasks);
});

searchInput.addEventListener("input", (e) => {
  const searchText = e.target.value.toLowerCase();

  const filteredTasks = tasksArr.filter((task) =>
    task.taskName.toLowerCase().includes(searchText),
  );

  ui(filteredTasks);
});




const timer = document.querySelector("#timer");
const progress = document.querySelector(".progress");

const startBtn = document.querySelector(".start");
const resetBtn = document.querySelector(".reset");

const sessionCount = document.querySelectorAll(".stats-card h1")[0];

const shortBreak = document.querySelector(".bottom-menu div:nth-child(1)");
const longBreak = document.querySelector(".bottom-menu div:nth-child(2)");
const customBtn = document.querySelector(".bottom-menu div:nth-child(3)");

const timerTitle = document.querySelector(".timer-content p");
const timerMessage = document.querySelector(".timer-content small");


let settings = JSON.parse(localStorage.getItem("pomodoroSettings")) || {
    focus: 25,
    shortBreak: 5,
    longBreak: 15
};

let completedSessions =
    Number(localStorage.getItem("completedSessions")) || 0;

sessionCount.textContent = completedSessions;


let totalTime = settings.focus * 60;
let timeLeft = totalTime;

let interval = null;
let running = false;


const radius = 135;
const circumference = 2 * Math.PI * radius;

progress.style.strokeDasharray = circumference;
progress.style.strokeDashoffset = 0;


function updateTimer() {

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    timer.textContent =
        `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

    const offset =
        circumference - (timeLeft / totalTime) * circumference;

    progress.style.strokeDashoffset = offset;
}

function startTimer() {

    if (running) {

        clearInterval(interval);
        running = false;
        startBtn.textContent = "START";
        return;
    }

    running = true;
    startBtn.textContent = "PAUSE";

    interval = setInterval(() => {

        timeLeft--;

        updateTimer();

        if (timeLeft <= 0) {

            clearInterval(interval);

            running = false;

            completedSessions++;

            sessionCount.textContent = completedSessions;

            localStorage.setItem(
                "completedSessions",
                completedSessions
            );

            startBtn.textContent = "START";

            alert("Pomodoro Completed!");

        }

    }, 1000);

}

function resetTimer() {

    clearInterval(interval);

    running = false;

    timeLeft = totalTime;

    updateTimer();

    startBtn.textContent = "START";
}

function changeMode(minutes, title, message) {

    clearInterval(interval);

    running = false;

    totalTime = minutes * 60;

    timeLeft = totalTime;

    timerTitle.textContent = title;

    timerMessage.textContent = message;

    startBtn.textContent = "START";

    updateTimer();
}


startBtn.addEventListener("click", startTimer);

resetBtn.addEventListener("click", resetTimer);


shortBreak.addEventListener("click", () => {

    changeMode(
        settings.shortBreak,
        "SHORT BREAK",
        "Relax for a while!"
    );

});


longBreak.addEventListener("click", () => {

    changeMode(
        settings.longBreak,
        "LONG BREAK",
        "Take a long break!"
    );

});

customBtn.addEventListener("click", () => {

    let focus = prompt(
        "Focus Time (minutes)",
        settings.focus
    );

    if (focus === null) return;

    let short = prompt(
        "Short Break (minutes)",
        settings.shortBreak
    );

    if (short === null) return;

    let long = prompt(
        "Long Break (minutes)",
        settings.longBreak
    );

    if (long === null) return;

    focus = Number(focus);
    short = Number(short);
    long = Number(long);

    if (
        focus <= 0 ||
        short <= 0 ||
        long <= 0 ||
        isNaN(focus) ||
        isNaN(short) ||
        isNaN(long)
    ) {
        alert("Enter valid numbers.");
        return;
    }

    settings = {
        focus,
        shortBreak: short,
        longBreak: long
    };

    localStorage.setItem(
        "pomodoroSettings",
        JSON.stringify(settings)
    );

    document.querySelector(".bottom-menu div:nth-child(1) p").textContent =
        `${settings.shortBreak} min`;

    document.querySelector(".bottom-menu div:nth-child(2) p").textContent =
        `${settings.longBreak} min`;

    changeMode(
        settings.focus,
        "FOCUS TIME",
        "Time to focus!"
    );

    alert("Settings Saved!");

});

document.querySelector(".bottom-menu div:nth-child(1) p").textContent =
    `${settings.shortBreak} min`;

document.querySelector(".bottom-menu div:nth-child(2) p").textContent =
    `${settings.longBreak} min`;

updateTimer();




const goalForm = document.querySelector(".goal-form");
const goalCardContainer = document.querySelector(".goal-card-container");

let goalArr = JSON.parse(localStorage.getItem("goals")) || [];

function goalUI(data = goalArr) {
    goalCardContainer.innerHTML = "";

    if (data.length === 0) {
        goalCardContainer.innerHTML = "<h2>No Goals Created Yet</h2>";
        return;
    }

    data.forEach((goal, idx) => {

        goalCardContainer.innerHTML += `
        <div class="goal-card">

            <div class="goal-text">
                <h3 class="goalName">${goal.goalName}</h3>
            </div>

            <div class="goal-btns">
                <h3 class="goalType">${goal.goalType}</h3>

                <button onclick="deleteGoal(${idx})">
                    Achieved
                </button>
            </div>

        </div>
        `;
    });
}

goalUI();

goalForm.addEventListener("submit", (e) => {

    e.preventDefault();

    const goalName = e.target[0].value.trim();
    const goalType = e.target[1].value;

    if (goalName === "") {
        alert("Please enter a goal.");
        return;
    }

    const goalObj = {
        goalName,
        goalType,
        completed: false
    };

    goalArr.push(goalObj);

    localStorage.setItem("goals", JSON.stringify(goalArr));

    goalUI();

    goalForm.reset();

});

function deleteGoal(idx) {

    goalArr.splice(idx, 1);

    localStorage.setItem("goals", JSON.stringify(goalArr));

    goalUI();

}


const plannerContainer = document.querySelector(".planner-slots");
const todayDate = document.querySelector("#todayDate");

let plannerData = JSON.parse(localStorage.getItem("planner")) || {};


const today = new Date();

todayDate.textContent = today.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric"
});

function formatHour(hour) {

    const suffix = hour >= 12 ? "PM" : "AM";

    let h = hour % 12;

    if (h === 0) h = 12;

    return `${h}:00 ${suffix}`;
}


function plannerUI() {

    plannerContainer.innerHTML = "";

    const currentHour = new Date().getHours();

    for (let hour = 5; hour <= 22; hour++) {

        const slot = document.createElement("div");
        slot.className = "time-slot";
        if (hour === currentHour) {
            slot.classList.add("current-slot");
        }
        slot.innerHTML = `
        <div class="time">
            ${formatHour(hour)}
        </div>

        <div class="plan">

            <input
                type="text"
                id="plan-${hour}"
                placeholder="Add your plan..."
                value="${plannerData[hour] || ""}"
            >

            <button onclick="savePlan(${hour})">
                Save
            </button>

            <button onclick="clearPlan(${hour})">
                Clear
            </button>

        </div>
        `;
        plannerContainer.appendChild(slot);
    }
}

plannerUI();


function savePlan(hour) {

    const input = document.querySelector(`#plan-${hour}`);

    plannerData[hour] = input.value.trim();

    localStorage.setItem(
        "planner",
        JSON.stringify(plannerData)
    );

}


function clearPlan(hour) {

    delete plannerData[hour];

    localStorage.setItem(
        "planner",
        JSON.stringify(plannerData)
    );

    plannerUI();
}


