import config from 'config'
import cookieParser from 'cookie-parser'
import createError from 'http-errors'
import express from 'express'
import logger from 'morgan'
import path from 'path'
import sassMiddleware from 'node-sass-middleware'

import indexRouter from './routes/index'
import urlsRouter from './routes/urls'

const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

const logFormat = config.get('log.requests.format')

app.use(logger(logFormat))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(sassMiddleware({
  src: path.join(__dirname, '../public'),
  dest: path.join(__dirname, '../public'),
  indentedSyntax: true, // true = .sass and false = .scss
  sourceMap: true
}))
app.use(express.static(path.join(__dirname, '../public')))

app.use('/', indexRouter)
app.use('/urls', urlsRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

export default app
