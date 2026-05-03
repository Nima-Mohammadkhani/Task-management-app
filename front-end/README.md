# Task Manager App - Frontend

A clean and modern task management app built with React, TypeScript, and Redux Toolkit.

---

## Features

- Create, read, update, and delete tasks
- Mark tasks as complete/incomplete
- Smooth animations with Framer Motion
- Responsive design (Modal for desktop, BottomSheet for mobile)
- Dark/Light mode support
- Beautiful UI with TailwindCSS + DaisyUI
- Toast notifications for user feedback

---

## Tech Stack

| Technology          | Purpose                        |
| ------------------- | ------------------------------ |
| React + TypeScript  | Core framework                 |
| Redux Toolkit + RTK Query | State management & API caching |
| Vite                | Build tool                     |
| TailwindCSS + DaisyUI | Styling                        |
| Framer Motion       | Animations                     |
| React Toastify      | Notifications                  |
| Lucide React        | Icons                          |

---

## Installation & Setup

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Backend server running on `http://localhost:3000`

### Step 1: Install dependencies

```bash
npm install
```

### Step 2: Start the development server

```bash
npm run dev
```

The app will be available at `http://localhost:5173` (or the port shown in the terminal).

### Step 3: Make sure the backend is running

```bash
# In a separate terminal, inside the backend folder
npm run start:dev
```

---

## Available Scripts

| Command           | Description                    |
| ----------------- | ------------------------------ |
| `npm run dev`     | Start development server       |
| `npm run build`   | Build for production           |
| `npm run preview` | Preview production build       |

---

## Project Structure

```
front-end/
├── src/
│   ├── components/
│   │   ├── tasks/
│   │   │   ├── TaskForm.tsx      # Add new task form
│   │   │   ├── TaskList.tsx      # List of tasks
│   │   │   └── TaskItem.tsx      # Single task item
│   │   ├── ui/
│   │   │   ├── Modal.tsx         # Modal for desktop
│   │   │   └── BottomSheet.tsx   # Bottom sheet for mobile
│   │   └── onboarding/
│   │       └── Onboarding.tsx    # Welcome screen
│   ├── redux/
│   │   ├── store.ts              # Redux store config
│   │   └── service/
│   │       └── tasksApi.ts       # RTK Query API definitions
│   ├── types/
│   │   └── task.ts               # TypeScript interfaces
│   ├── pages/
│   │   └── index.tsx             # Home page
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── package.json
└── README.md
```

---

## App Flow

```
Onboarding Screen → Home Page
                    ├── Dashboard Card (task stats)
                    ├── TaskForm (add new task)
                    └── TaskList
                        └── TaskItem (view/edit/delete)
```

---

## Key Features Walkthrough

### 1. Onboarding Screen

First-time users see a welcome screen with a "Let's Start" button. This screen appears only once (stored in localStorage).

### 2. Dashboard Card

Shows:
- Welcome message
- Total tasks count
- Completed tasks count
- Progress percentage with animated progress bar

### 3. Add Task Form

- Title field (required) – shows error if empty
- Description field (optional)
- Submit button with loading state

### 4. Task List

- Displays all tasks sorted by creation date (newest first)
- Shows title and description
- Loading skeleton while fetching
- Empty state with nice illustration

### 5. Task Item

Each task card includes:
- **Checkbox** – toggle completion status
- **Title** – shows with strikethrough when completed
- **Description** – optional
- **Edit button** – opens Modal (desktop) or BottomSheet (mobile)
- **Delete button** – with confirmation dialog

### 6. Edit Task (Responsive)

- **Desktop/Tablet**: Opens a centered Modal
- **Mobile**: Opens a Bottom Sheet from the bottom
- Edit both title and description

### 7. Dark/Light Mode

- Toggle button in the top-left corner
- Theme preference saved in localStorage
- Smooth transition between modes
- Dark mode keeps backgrounds subtle (not completely black)

---

## API Integration

The app connects to the backend at `http://localhost:3000` via RTK Query:

| Action | Method | Endpoint           |
| ------ | ------ | ------------------ |
| Fetch all tasks | GET    | `/tasks`    |
| Create task     | POST   | `/tasks`    |
| Update task     | PATCH  | `/tasks/:id` |
| Delete task     | DELETE | `/tasks/:id` |

RTK Query automatically handles:
- Loading states
- Error states
- Caching
- Background refetching

---

## Styling

### Color Palette

| Role          | Light Mode | Dark Mode |
| ------------- | ---------- | --------- |
| Primary (buttons) | `#FDE047` (yellow) | `#FEF08A` |
| Secondary         | `#86EFAC` (green)  | `#A3E635` |
| Background        | `#F8FAFC`          | `#18181B` |
| Cards             | `#FFFFFF`          | `#1E1E2E` |
| Text              | `#334155`          | `#D4D4D8` |
| Error             | `#FCA5A5`          | `#F87171` |

### Tailwind + DaisyUI

- Uses TailwindCSS v4 with DaisyUI v5
- Custom theme configured in `index.css`
- All DaisyUI utility classes work (`btn-primary`, `card`, etc.)

---

## Responsive Design

| Device      | Task Edit Component   |
| ----------- | --------------------- |
| Desktop     | Modal (centered popup) |
| Tablet      | Modal (centered popup) |
| Mobile      | BottomSheet (from bottom) |

Detection is automatic based on `window.innerWidth < 768`.

---

## Common Issues

| Issue                                  | Solution                                             |
| -------------------------------------- | ---------------------------------------------------- |
| Backend connection failed              | Make sure backend is running on `http://localhost:3000` |
| Tasks not showing up                   | Check if Docker container and backend are running   |
| Styling looks broken                   | Clear browser cache (Ctrl + Shift + R)              |
| Dark mode not persisting               | Check localStorage: `localStorage.getItem('theme')` |

---

## What I'd Add With More Time

- Drag-and-drop task reordering
- Task filtering (completed/pending)
- Search functionality
- User authentication
- Task categories/tags
- Due dates

But for this task, it's solid.

---

## That's it!

The app is fully functional, responsive, and production-ready.

Run `npm run dev` and start managing your tasks!
```