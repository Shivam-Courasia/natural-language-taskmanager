# Natural Language Task Manager

A modern task management application built with React, TypeScript, and shadcn/ui components. This application provides a beautiful and intuitive interface for managing your tasks using natural language processing.

## Features

- 🎨 Modern UI with shadcn/ui components
- 📱 Responsive design
- 🎯 Task management with natural language processing
- ⚡ Fast and optimized performance with Vite
- 🔒 Type-safe with TypeScript
- 🎯 Form validation with React Hook Form and Zod
- 📊 Beautiful charts and data visualization with Recharts
- 🔄 State management with React Query
- 🗣️ **AI Transcript Parser**: Automatically extract tasks from meeting transcripts using natural language processing.

## AI Transcript Parser

The AI Transcript Parser feature allows users to paste meeting transcripts into the application, and it will automatically identify and extract tasks, assignees, due dates, and priorities. This streamlines the task creation process and ensures no action items are missed.

### How to use:
1. Navigate to the "AI Transcript Parser" section.
2. Paste your meeting transcript into the provided text area.
3. Click "Extract Tasks" to see a list of identified tasks.
4. Review the extracted tasks and click "Add All Tasks" to add them to your task list.

### Screenshots

![AI Transcript Parser Screenshot 1](https://github.com/Shivam-Courasia/natural-language-taskmanager/blob/main/public/images/transcript-parser-1.png)
![AI Transcript Parser Screenshot 2](https://github.com/Shivam-Courasia/natural-language-taskmanager/blob/main/public/images/transcript-parser-2.png)
![AI Transcript Parser Screenshot 3](https://github.com/Shivam-Courasia/natural-language-taskmanager/blob/main/public/images/transcript-parser-3.png)

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- React Router DOM
- React Query
- React Hook Form
- Zod
- Recharts
- And more...

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v16 or higher)
- npm or yarn or bun

## Installation

1. Clone the repository:
```bash
git clone https://github.com/Shivam-Courasia/natural-language-taskmanager.git
cd natural-language-taskmanager
```

2. Install dependencies:
```bash
# Using npm
npm install

# Using yarn
yarn install

# Using bun
bun install
```

## Development

To start the development server:

```bash
# Using npm
npm run dev

# Using yarn
yarn dev

# Using bun
bun dev
```

The application will be available at `http://localhost:5173`

## Building for Production

To create a production build:

```bash
# Using npm
npm run build

# Using yarn
yarn build

# Using bun
bun run build
```

To preview the production build:

```bash
# Using npm
npm run preview

# Using yarn
yarn preview

# Using bun
bun run preview
```

## Project Structure

```
├── src/               # Source files
├── public/           # Static files
├── components/       # React components
├── lib/             # Utility functions
├── hooks/           # Custom React hooks
└── ...
```

## Available Scripts

- `dev` - Start development server
- `build` - Build for production
- `build:dev` - Build for development
- `preview` - Preview production build
- `lint` - Run ESLint
