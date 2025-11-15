import { Router } from 'express'
import { StatusCodes } from 'http-status-codes'
import { CidadesControler } from '../controllers'

const router = Router()

router.get('/', (req, res) => {
  return res.send("Hello, World!")
})

router.post('/cidades', CidadesControler.createValidation, CidadesControler.create)

export { router }
