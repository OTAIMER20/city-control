import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import * as yup from 'yup'

interface CitiesD {
  name: string,
}

const bodyValidation: yup.Schema<CitiesD> = yup.object().shape({
  name: yup.string().required().min(3),
})

export const create = async (req: Request<{}, {}, CitiesD>, res: Response) => {
  let validateData: CitiesD
  try {
    validateData = await bodyValidation.validate(req.body)
  } catch (error) {
    const yupError = error as yup.ValidationError

    return res.json({
      errors: {
        default: yupError.message
      }
    })
  }

  return res.send("Created!")
}
