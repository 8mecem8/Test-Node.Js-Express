const express = require("express")
const app = express()
const cors = require('cors')


app.use(express.json())
app.use(cors())


let notes = [
  {
    id: 1,
    content: "HTML is easy",
    date: "2019-05-30T17:30:31.098Z",
    important: true
  },
  {
    id: 2,
    content: "Browser can execute only Javascript",
    date: "2019-05-30T18:39:34.091Z",
    important: false
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    date: "2019-05-30T19:20:14.298Z",
    important: true
  }
]
//--------------------------------------------------------------------------------------------------

app.get('/notes/:id', (req, res) => {let rId = +req.params.id; let note = notes.find(at => at.id === rId); if(note) {res.json(note)} else{res.status(404).end()}})

app.delete('/notes/:id', (req, res) => {let rId = +req.params.id; notes = notes.filter(at => at.id !== rId); res.status(204).end()})

app.post('/notes', (req, res) => {

  let maxId = notes.length > 0
      ? Math.max(...notes.map(n => n.id))
      : 0


  if(!req.body.content){res.status(404).json({error : 'content missing'})}

  let note = {
    id: maxId + 1,
    content: req.body.content,
    important: req.body.important || false,
    date: new Date(),

  }


  notes = notes.concat(note)

  res.json(note)
  console.log('New added note is:', note)
})



app.get('/', (req, res) => {res.send('<h1>Hello World</h1>')})

app.get('/notes', (req, res) => {res.json(notes)})

//--------------------------------------------------------------------------------------------------

const PORT = 3003

app.listen(PORT, () => {console.log(`Server is running on port:${PORT}`)})
