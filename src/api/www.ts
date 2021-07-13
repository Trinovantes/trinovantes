import express, { ErrorRequestHandler } from 'express'
import http from 'http'
import morgan from 'morgan'
import { normalizePort } from './utils/normalizePort'
import createHttpError, { HttpError } from 'http-errors'
import axios from 'axios'
import { projectsRouter } from './routers/projectsRouter'
import { ErrorResponse } from '@/common/schemas/ApiResponse'

// -----------------------------------------------------------------------------
// Express
// -----------------------------------------------------------------------------

const app = express()

// -----------------------------------------------------------------------------
// Middlewars
// -----------------------------------------------------------------------------

// Handle non-GET request bodies
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Logging
app.use(morgan(DEFINE.IS_DEV ? 'dev' : 'combined'))

// -----------------------------------------------------------------------------
// Request Handler
// -----------------------------------------------------------------------------

// Serve API endpoints
app.use('/api/projects', projectsRouter)
app.use('/api', (req, res, next) => {
    next(new createHttpError.NotFound())
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorHander: ErrorRequestHandler = (err, req, res, next) => {
    if (axios.isAxiosError(err)) {
        // Don't log entire Axios err object since it includes req, res
        console.info(err.name, err.message)
    } else if (!(err instanceof HttpError)) {
        // Log unexpected non-HttpErrors
        console.info(err)
    }

    // Set locals, only providing error in development
    const status = err instanceof HttpError ? err.status : 500
    const message = err instanceof HttpError ? err.message : 'Internal Server Error'

    const response: ErrorResponse = {
        errorMessage: message,
    }

    res.status(status)
    res.json(response)
}

app.use(errorHander)

// -----------------------------------------------------------------------------
// HTTP Server
// -----------------------------------------------------------------------------

function runHttpServer() {
    const port = normalizePort(process.env.PORT ?? '3000')

    console.info('Starting HTTP Web Server', `http://localhost:${port}`)
    const server = http.createServer(app)

    server.listen(port, () => {
        console.info(`Server Listening on Port ${port}`)
    })
}

runHttpServer()
