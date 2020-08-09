// servidor
const express = require('express')
const server = express()
const { pageLanding, pageStudy, pageGiveClasses, pageSuccess, saveClasses, successToStudy } = require('./pages.js')

// configurações nunjucks
const nunjucks = require('nunjucks')
nunjucks.configure('src/views', {
    express: server,
    noCache: true
})

server
.use(express.urlencoded({ extended: true }))
.use(express.static("public")) // configura arquivos estaticos (css, scripts, images)
// chamando páginas da aplicação
.get("/", pageLanding)
.get("/study", pageStudy)
.get("/success", pageSuccess)
.get("/give-classes", pageGiveClasses)
.get("/successToStudy", successToStudy)
.post("/save-class", saveClasses)

.listen(5500);