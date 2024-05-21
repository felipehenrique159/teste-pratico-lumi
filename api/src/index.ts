import express from 'express'
import routes from './routes'
import cors from 'cors'

const app = express()
const port = 3001

app.use(cors())
app.use(express.json())

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
});

app.use('/api', routes)
