import { app } from './app/app'
import 'dotenv/config'

app.listen(process.env.PORT || 3434, () => console.log(`Server is running on http://localhost:${process.env.PORT || 3434}`))
