# Task Manager Application

A modern, full-stack task management application built with Next.js and FastAPI. This application allows users to create, read, update, and delete tasks with a beautiful, responsive user interface.

![Task Manager Screenshot](https://via.placeholder.com/800x400?text=Task+Manager+Screenshot)

## Features

- ✨ Modern and responsive UI with Tailwind CSS
- 🔄 Real-time task management (CRUD operations)
- 🎨 Beautiful gradient design with smooth animations
- 📱 Mobile-friendly interface
- 🎯 Task status tracking (To Do, In Progress, Done)
- 🔍 Search and filter capabilities
- 💾 Persistent data storage with SQLite

## Tech Stack

### Frontend
- Next.js 14
- React
- Tailwind CSS
- Axios for API calls

### Backend
- FastAPI
- SQLAlchemy
- SQLite
- Pydantic

## Prerequisites

- Node.js (v18 or higher)
- Python (v3.8 or higher)
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone <your-repository-url>
cd task-manager
```

2. Install frontend dependencies:
```bash
npm install
# or
yarn install
```

3. Set up the backend:
```bash
cd backend
python -m venv venv

# On Windows
.\venv\Scripts\activate

# On macOS/Linux
source venv/bin/activate

pip install -r requirements.txt
```

## Running the Application

1. Start the backend server:
```bash
cd backend
uvicorn main:app --reload --port 8000
```

2. In a new terminal, start the frontend development server:
```bash
npm run dev
# or
yarn dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## API Endpoints

- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/{id}` - Update a task
- `DELETE /api/tasks/{id}` - Delete a task

## Project Structure

```
task-manager/
├── src/
│   ├── app/
│   │   └── page.js
│   └── ...
├── backend/
│   ├── main.py
│   ├── requirements.txt
│   └── tasks.db
├── public/
└── ...
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Backend powered by [FastAPI](https://fastapi.tiangolo.com/)
