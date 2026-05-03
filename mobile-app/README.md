# Task Manager App - Mobile (React Native)

A mobile task management app built with React Native and Expo.

---

## Features

- Create, read, update, and delete tasks
- Mark tasks as complete/incomplete
- Smooth animations with Moti
- Dark/Light mode support
- Beautiful UI with NativeWind (TailwindCSS)
- Toast notifications for user feedback

---

## Tech Stack

| Technology          | Purpose                        |
| ------------------- | ------------------------------ |
| React Native + Expo | Mobile framework               |
| TypeScript          | Type safety                    |
| Redux Toolkit + RTK Query | State management & API caching |
| NativeWind          | TailwindCSS for React Native   |
| Moti                | Animations                     |
| Lucide React Native | Icons                          |

---

## Installation & Setup

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Expo Go app on your phone (or iOS/Android emulator)
- Backend server running on `http://localhost:3000`

### Step 1: Install dependencies

```bash
npm install
```

### Network Restriction Notice

Due to **internet restrictions and sanctions**, some packages may fail to install automatically. The complete code is written and ready, but you may need to install the following packages manually.

After installing, clear the cache:

```bash
npx expo start --clear
```

### Step 2: Start the development server

```bash
npx expo start
```

### Step 3: Run on device

- Scan the QR code with Expo Go (Android or iOS)
- Or press `a` for Android emulator / `i` for iOS simulator

### Step 4: Make sure the backend is running

```bash
# In a separate terminal, inside the backend folder
npm run start:dev
```

---

## Project Structure

```
native/
├── app/
│   ├── _layout.tsx          # Root layout (Redux, Toast, Fonts)
│   └── index.tsx            # Home screen with Onboarding
├── src/
│   ├── assets/
│   │   └── fonts/
│   │       └── Vazir-Medium.ttf
│   ├── components/
│   │   ├── onboarding/
│   │   │   └── Onboarding.tsx
│   │   ├── tasks/
│   │   │   ├── TaskForm.tsx
│   │   │   ├── TaskItem.tsx
│   │   │   └── TaskList.tsx
│   │   └── ui/
│   │       ├── Button.tsx
│   │       ├── Icon.tsx
│   │       ├── Input.tsx
│   │       └── Modal.tsx
│   ├── redux/
│   │   ├── store.ts
│   │   └── service/
│   │       └── tasksApi.ts
│   └── types/
│       ├── task.ts
│       └── ui.ts
├── global.css
├── tailwind.config.js
├── babel.config.js
├── metro.config.js
└── package.json
```

---

## API Integration

The app connects to the backend at `http://localhost:3000` via RTK Query:

| Action | Method | Endpoint           |
| ------ | ------ | ------------------ |
| Fetch all tasks | GET    | `/tasks`    |
| Create task     | POST   | `/tasks`    |
| Update task     | PATCH  | `/tasks/:id` |
| Delete task     | DELETE | `/tasks/:id` |

For physical devices, update the IP in `src/redux/service/tasksApi.ts`:

```ts
const BASE_URL = 'http://192.168.1.X:3000/'; // Replace with your computer's local IP
```

---

## Styling

### Color Palette (same as web version)

| Role          | Light Mode | Dark Mode |
| ------------- | ---------- | --------- |
| Primary (buttons) | `#FDE047` (yellow) | `#FEF08A` |
| Secondary         | `#86EFAC` (green)  | `#A3E635` |
| Background        | `#F8FAFC`          | `#18181B` |
| Cards             | `#FFFFFF`          | `#1E1E2E` |
| Text              | `#334155`          | `#D4D4D8` |

---

## Common Issues

| Issue                                  | Solution                                             |
| -------------------------------------- | ---------------------------------------------------- |
| Module not found                       | Install missing packages manually (see list above) |
| Backend connection failed              | Make sure backend is running on `http://localhost:3000` |
| Expo start error                       | Run `npx expo start --clear` |
| Font not loading                       | Check if `Vazir-Medium.ttf` exists in `src/assets/fonts/` |
| Metro bundler error                    | Delete `node_modules` and run `npm install` again |

---

## That's it!

Run `npx expo start` and scan the QR code with Expo Go to test the app on your phone.