# Task Manager Dashboard

A responsive, client-side task manager application built with vanilla HTML, CSS, and JavaScript. This project provides an intuitive dashboard to help you plan, prioritize, and accomplish your tasks with ease. All data is persisted in the browser's local storage.

## Features

- **Personalized Greeting:** The application prompts for your name on the first visit and saves it for a personalized experience.
- **Dynamic Task Dashboard:** An overview panel displays real-time counts for **Total**, **Pending**, and **Finished** tasks.
- **Full CRUD for Tasks:**
    - **Create:** Add new tasks with a name, start date, end date, and type (Personal, Work, Study, Health) through a modal form.
    - **Read:** View all tasks in a clean, organized list.
    - **Update:** Edit the details of any existing task.
    - **Delete:** Remove individual tasks or clear all tasks at once.
- **Task Filtering:** Easily filter the task list by clicking on the dashboard cards to view `All`, `Pending`, or `Finished` tasks.
- **Task Status Toggling:** Mark tasks as complete or incomplete using an interactive checkbox.
- **Search Functionality:** Quickly find tasks by name using the search bar in the header.
- **Light/Dark Theme:** Switch between light and dark modes with a single click. Your theme preference is saved locally.
- **Responsive Design:** The layout is optimized for a seamless experience on both desktop and mobile devices.

## Getting Started

To get a local copy up and running, follow these simple steps.

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/prynshu19/task-manager-deshboard.git
   ```
2. Navigate to the project directory:
   ```sh
   cd task-manager-deshboard
   ```
3. Open the `index.html` file in your web browser. No complex setup or dependencies are required.

## Usage

1.  **Enter Your Name:** On first launch, a welcome screen will appear. Enter your name to begin using the dashboard.
2.  **Add a Task:** Click the `Add Task` button to open the task creation form. Fill in the details and click `Create Task`.
3.  **Manage Tasks:**
    - The main list will display your tasks.
    - Click the checkbox next to a task to toggle its completion status.
    - Use the `Edit` and `Delete` buttons to modify or remove a task.
4.  **Filter Views:** Click the `Total Tasks`, `Pending Tasks`, or `Finished Tasks` cards at the top to filter the list accordingly.
5.  **Search for a Task:** Type a task name into the search bar in the navigation and press Enter or click the search icon.
6.  **Change Theme:** Click the moon (`<i class="ri-moon-fill"></i>`) or sun (`<i class="ri-sun-fill"></i>`) icon in the top-right corner to toggle between light and dark modes.
7.  **Clear All Tasks:** Click the `Clean Task` button to permanently delete all tasks from local storage.
