import express from 'express'
import { addEmployees, countByAge, countByAgeGreaterThan, getEmployeeSortedByName } from '../controllers/employeeController.js'

const employeeRouter = express.Router()


employeeRouter.post('/',addEmployees)
employeeRouter.get('/countByAge',countByAge)
employeeRouter.get('/countByAgeGreaterThan/:age',countByAgeGreaterThan)
employeeRouter.get('/getEmployeeSortedByName',getEmployeeSortedByName)




export default employeeRouter