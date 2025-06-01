import express from "express"
import cors from "cors"
import "dotenv/config"
import cookieParser from "cookie-parser"
import connectDB from "./config/mongodb.js"
import authRouter from "./routes/auth.routes.js"
import userRoute from "./routes/user.routes.js"
import projectRouter from "./routes/project.routes.js"

const app = express()
const port = process.env.PORT || 5000

// Connexion à MongoDB
connectDB()

// Origines autorisées (React en local)
const allowedOrigins = ['http://localhost:5173']

// Middleware CORS
app.use(cors({
  origin: (origin, callback) => {
    console.log("Origin received:", origin)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error("Not allowed by CORS"))
    }
  },
  credentials: true
}))

// Gérer les requêtes OPTIONS (préflight)


// Middleware JSON et cookies
app.use(express.json())
app.use(cookieParser())

// Test route
app.get('/', (req, res) => res.send("We good"))

// Routes principales
app.use('/api/auth', authRouter)
app.use('/api/user', userRoute)
app.use('/api/projet', projectRouter)

// Démarrage du serveur
app.listen(port, () => console.log(' Server started on port: ${port}'))
