const express = require('express')
const nunjucks = require('nunjucks')
const movies = require("./data")

const server = express()

server.use(express.static('public'))

server.set('view engine', 'njk')

nunjucks.configure('views', {
  express: server,
  autoescape: false,
  noCache: true
})

server.get('/', function(req, res) {

  const data = {
    avatar_url: "https://avatars1.githubusercontent.com/u/32021518?s=460&u=be96b02660563cbbaf0fe3a272478c23adcd2b7a&v=4",
    name: "Sidney Santos",
    role: "Analista de TI / Desenvolvedor Full-Stack Júnior",
    description: 'Analista de TI, suporte no sistema Protheus e desenvolvedor nas stacks ADVPL, NodeJS, ReactJS e React-Native. Colaborador na empresa <a href="https:www.intercarta.com.br" target="_blank">Intercarta</a>',
    links: [
      { name: "Github", url: "https://github.com/SdnSantos" },
      { name: "Facebook", url: "https://facebook.com/sidney.escolhido" },
      { name: "Linkedin", url: "https://linkedin.com/in/sidney-da-silva-santos-0115b225" }
    ]
  }

  return res.render('about', { data })
})

server.get('/portfolio', function(req, res) {
  return res.render('portfolio', { items: movies })
})

server.get('/movie', function(req, res) {
  const { id } = req.query

  const movie = movies.find(function(movie) {
      return movie.id == id
  })

  if (!movie) {
    return res.send("Movie not found")
  }

  return res.render("movie", { item: movie })
})

server.listen(5000, function() {
  console.log('Server is running')
})