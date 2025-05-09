# 📚 NotesForge

**NotesForge** is a collaborative, web-based note-sharing platform designed for students to organize, share, and manage academic content efficiently. With structured version control, real-time updates, and file management, NotesForge simplifies academic collaboration and content access.

---

## 🚀 Features

- 🔐 **User Authentication & Authorization**
  - OAuth 2.0 integration
  - Role-based access (Admin/User)
  
- 📁 **Subject & Note Management**
  - Create, update, delete, and share subjects
  - Upload and manage files under subtopics
  - Real-time updates using eventBus

- 🔗 **Shareable Content**
  - Public link sharing for subjects
  - Unregistered users can preview shared content

- 🧩 **Smart Import**
  - Logged-in users can import shared subjects without altering the original

- 🗃️ **File Versioning**
  - Maintain structured versions of uploaded files

- 🖼️ **Profile Management**
  - Cloud-based storage for profile pictures

- 🖥️ **Responsive UI**
  - Sidebar toggles on smaller screens
  - Click-outside detection for mobile navigation

---

## 🛠️ Tech Stack

### 🔧 Backend
- **Java**, **Spring Boot**
- **MySQL** for relational data
- **Cloud Storage** for file & image hosting
- **Spring Security** for authentication & role management

### 🎨 Frontend
- **React.js** (with Vite)
- **Tailwind CSS**
- **Vo.dev** for hosting
- **SweetAlert2** for confirmations/alerts

---

## 🧪 Development Timeline

- 🗓️ **Planning Start**: Nov 20, 2024
- 🔨 **Development Start**: Jan 2025
- ⚙️ **Frontend & Backend**: Developed in parallel
- 🔗 **Integration**: Ongoing during development

---

## 👨‍💻 Admin Features

- Manage users, subjects, and system-wide access
- Full API access
- Admin role handled within the `User` table

---

## 📂 Project Structure
notesforge/
├── backend/
│ └── src/main/java/com/notesforge/...
├── frontend/
│ └── src/
│ └── components/
│ └── pages/
│ └── services/
├── shared/
│ └── interfaces, types
└── README.md


---

## 📸 Screenshots

> ![notesforge (1)](https://github.com/user-attachments/assets/fb845269-8682-4f2f-81f6-8c3c89c1afbd)

---

## 🎥 YouTube

Check out our related video content:  
📺 [Watch on YouTube](https://youtu.be/LkePbqO8l6c)

---

## 🛡️ Security & Access

- OAuth 2.0 for secure login
- Role-based access with admin and user separation
- Shared links are read-only for guests

---

## 📌 Future Enhancements

- 📊 Analytics for subject access
- 🔍 Advanced search & filtering
- 📅 Note scheduling/reminders
- 🧠 AI-powered summarization (planned)

---

## 🤝 Contributing

Contributions are welcome! Please fork the repository and submit a pull request with detailed descriptions of your changes.

---

## 📃 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

---

## 📫 Contact

For queries, suggestions, or feedback:
📧 Email: [deepghosh146@gmail.com]  
🌐 Website: [your-portfolio-link.com]

