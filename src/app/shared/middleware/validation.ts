import { RequestHandler } from 'express'
import { Schema,ValidationError } from 'yup'
import { StatusCodes } from 'http-status-codes'


type VProps = 'body' | 'header' | 'params' | 'query'

type VAllSchemas = Record<VProps, Schema<any>>

type ValidationTy = (schemas: Partial<VAllSchemas>) => RequestHandler

export const validation: ValidationTy = (schemas) => async (req, res, next) => {
  
  const errorList: Record<string, Record<string, string>> = {}

  Object.entries(schemas).forEach(([key, schema]) => {
    try {
      schema.validateSync(req[key as VProps], { abortEarly: false })
      return next()
    } catch (error) {
      const yupError = error as ValidationError
      const erros: Record<string, string> = {}
  
      yupError.inner.forEach((error) => {
        if (!error.path) {
          return
        }
        erros[error.path] = error.message
      })

      errorList[key] = erros

    }
  })

  if (Object.keys(errorList).length === 0) {
    return next()
  } else {
    return res.status(StatusCodes.BAD_REQUEST).json({ errors: errorList })
  }

}
