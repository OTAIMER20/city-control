import { Request, Response } from 'express'
import * as yup from 'yup'
import { validation } from '../../shared/middleware'

export interface CitiesD {
  name: string
}

export interface FilterD {
  filter?: string,
}

export const createValidation = validation({
  body: yup.object().shape({name: yup.string().required().min(3)}),
  query: yup.object().shape({filter: yup.string().min(3)})
})



export const create = async (req: Request<{}, {}, CitiesD>, res: Response) => {
 
  return res.send("Created!")
}
