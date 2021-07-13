import express, { Response, Request } from 'express'
import { createAsyncHandler } from '@/api/utils/asyncHandler'
import { fetchProjects } from '../services/fetchProjects'

// ----------------------------------------------------------------------------
// Router
// ----------------------------------------------------------------------------

export const projectsRouter = express.Router()

// ----------------------------------------------------------------------------
// Get User Info
// ----------------------------------------------------------------------------

projectsRouter.get('/', createAsyncHandler(async(req: Request, res: Response) => {
    const projects = await fetchProjects()
    res.status(200)
    res.json(projects)
}))
