import express from 'express'
const app = express()
app.use(express.json())

const PORT = 3000

app.get('/ping', (_req, res) => { //El underscore funciona para que no salga la sugerencia de que la variable está declarada pero no usada 
    console.log('someone pinged here!!')
    res.send('ping')
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

