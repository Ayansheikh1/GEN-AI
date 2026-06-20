# 🚀 AI-Powered Interview Preparation Platform

An intelligent full-stack application that helps candidates prepare for job interviews by generating personalized interview questions, identifying skill gaps, creating preparation plans, and tailoring resumes using Google Gemini AI.

![MERN Stack](https://img.shields.io/badge/Stack-MERN-blue)
![Google Gemini API](https://img.shields.io/badge/AI-Google%20Gemini-orange)
![Node.js](https://img.shields.io/badge/Backend-Node.js-green)
![React](https://img.shields.io/badge/Frontend-React-cyan)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-green)
![License](https://img.shields.io/badge/License-MIT-yellow)

## ✨ Features

### 🎯 Interview Preparation
- **Smart Interview Generation** - AI-powered generation of technical and behavioral interview questions
- **Match Score Analysis** - Get a percentage score showing how well you match the job
- **Skill Gap Identification** - Identifies missing skills with severity levels (low, medium, high)
- **Personalized Preparation Plan** - Day-by-day study plan tailored to your needs

### 📄 Resume Management
- **AI-Powered Resume Tailoring** - Automatically tailors your resume to match job description
- **PDF Generation** - Download professionally formatted resume as PDF
- **Keyword Optimization** - Keywords from job description highlighted in resume
- **ATS-Friendly Format** - Resumes optimized for Applicant Tracking Systems

### 🔐 User Features
- **JWT Authentication** - Secure user authentication and authorization
- **Interview History** - View and manage past interview preparations
- **Data Persistence** - All interview data saved to MongoDB
- **Real-time Updates** - Live status updates during processing

## 🛠 Tech Stack

### Frontend
- **React** - UI library
- **Axios** - HTTP client
- **Context API** - State management
- **SCSS** - Styling
- **React Router** - Navigation

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL Database
- **Mongoose** - ODM library
- **Google Gemini API** - AI model for content generation
- **Puppeteer** - PDF generation
- **Multer** - File upload handling
- **JWT** - Authentication
- **Zod** - Schema validation

## 📋 Prerequisites

- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **MongoDB** (local or cloud - MongoDB Atlas)
- **Google Gemini API Key** (free tier available)
- **Git**


## Screenshots

### Interview Report
![Interview Report](screenshots/interview-report.png)

### Resume Generator
![Resume Generator](screenshots/resume-generator.png)

## 🔧 Installation

### 1. Clone Repository
```bash
git clone https://github.com/Ayansheikh1/gen-ai.git
cd gen-ai
```

### 2. Backend Setup

```bash
cd Backend
npm install
```

Create `.env` file in Backend directory:
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/interview-prep
# or use MongoDB Atlas
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/interview-prep

JWT_SECRET=your_jwt_secret_key_here
GOOGLE_GENAI_API_KEY=your_google_gemini_api_key

NODE_ENV=development
```

### 3. Frontend Setup

```bash
cd ../Frontend
npm install
```

Create `.env` file in Frontend directory:
```env
VITE_API_URL=http://localhost:3000
```

## 🚀 Running the Application

### Start Backend
```bash
cd Backend
npm run dev
# or
npm start
```

Backend will run on `http://localhost:3000`

### Start Frontend
```bash
cd Frontend
npm run dev
```

Frontend will run on `http://localhost:5173`

## 📚 API Endpoints

### Interview Endpoints

**Generate Interview Report**
```
POST /api/interview
Content-Type: multipart/form-data

Parameters:
- resume: File (text or pdf)
- jobDescription: string
- selfDescription: string

Response:
{
  "success": true,
  "interviewReport": {
    "matchScore": 85,
    "title": "Frontend Developer",
    "technicalQuestions": [...],
    "behavioralQuestions": [...],
    "skillGaps": [...],
    "preparationPlan": [...]
  }
}
```

**Get Interview by ID**
```
GET /api/interview/:id
Authorization: Bearer <JWT_TOKEN>

Response:
{
  "success": true,
  "interviewReport": {...}
}
```

**Get All Interviews**
```
GET /api/interview/all
Authorization: Bearer <JWT_TOKEN>

Response:
{
  "success": true,
  "interviewReports": [...]
}
```

**Download Resume PDF**
```
GET /api/interview/resume/pdf/:interviewReportId
Authorization: Bearer <JWT_TOKEN>

Response: PDF File
```

### Auth Endpoints

**Register**
```
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Login**
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

## 📁 Project Structure

```
GEN-AI/
├── Backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   └── interview.controller.js
│   │   ├── routes/
│   │   │   └── interview.route.js
│   │   ├── services/
│   │   │   └── ai.service.js
│   │   ├── models/
│   │   │   └── interview.model.js
│   │   ├── middleware/
│   │   │   └── auth.middleware.js
│   │   └── index.js
│   ├── .env
│   └── package.json
│
├── Frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   │   └── interview.api.js
│   │   ├── context/
│   │   │   └── interview.context.jsx
│   │   ├── hooks/
│   │   │   └── useInterview.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env
│   └── package.json
│
└── README.md
```

## 🔑 Environment Variables

### Backend (.env)
| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port | `3000` |
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/db` |
| `JWT_SECRET` | JWT secret key | `your_secret_key` |
| `GOOGLE_GENAI_API_KEY` | Google Gemini API key | `AIza...` |
| `NODE_ENV` | Environment | `development` |

### Frontend (.env)
| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API URL | `http://localhost:3000` |

## 📖 Usage Guide

### 1. Register/Login
- Create a new account or login with existing credentials
- JWT token will be stored in localStorage

### 2. Generate Interview Report
- Upload your resume (text file)
- Enter job description
- Add self description
- Click "Generate Interview Report"
- View personalized interview questions and preparation plan

### 3. Download Tailored Resume
- Click "Download Resume"
- AI will tailor your resume to the job description
- PDF will be downloaded automatically

### 4. View Interview History
- Access past interviews from history page
- Review previous preparation plans
- Download previously generated resumes

## 🐛 Troubleshooting

### Issue: Cannot read properties of undefined (reading 'buffer')
**Solution:** Ensure file is being sent as FormData with correct field name 'resume'

### Issue: 503 Service Unavailable (Gemini API)
**Solution:** Gemini free tier has rate limits. Wait a few minutes or upgrade to paid tier

### Issue: MongoDB Connection Error
**Solution:** Check MongoDB URI in .env and ensure MongoDB service is running

### Issue: CORS Error
**Solution:** Add frontend URL to CORS whitelist in Backend Express configuration

### Issue: PDF Generation Fails
**Solution:** Ensure Puppeteer is installed: `npm install puppeteer`

## 🚦 Getting API Key

### Google Gemini API
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Click "Create API Key"
3. Copy the key to your `.env` file
4. Note: Free tier has rate limits (60 requests/minute)

### MongoDB Atlas
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Get connection string
4. Add to `.env` as `MONGODB_URI`

## 🤝 Contributing

Contributions are welcome! Follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see LICENSE file for details.

## 🎯 Roadmap

- [ ] Advanced filtering and analytics
- [ ] Mock interview video recording
- [ ] Interview performance metrics
- [ ] Multi-language support
- [ ] Mobile app
- [ ] Integration with LinkedIn
- [ ] Email notifications
- [ ] Subscription plans

## 👨‍💻 Author

**Ayan Sheikh**
- GitHub: [@Ayansheikh1](https://github.com/Ayansheikh1)
- Email: ayn89169@gmail.com
- LinkedIn: [AyanSheikh](https://linkedin.com/in/ayansheikh111)

## 🙏 Acknowledgments

- Google Gemini API for AI capabilities
- MongoDB for database
- Express.js and Node.js community
- React ecosystem

---

**Made with ❤️ to help candidates ace their interviews**

⭐ If this project helped you, please star it on GitHub!
