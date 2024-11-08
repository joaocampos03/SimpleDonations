import express from 'express'
import { PrismaClient } from '@prisma/client'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const prisma = new PrismaClient()
const app = express()
app.use(express.json())

mongoose.connect(process.env.DATABASE_URL)
  
const counterSchema = new mongoose.Schema({
    _id: String,
    seq: Number,
})
  
const Counter = mongoose.model('Counter', counterSchema)
  
async function getNextSequenceValue(sequenceName) {
    const result = await Counter.findOneAndUpdate(
      { _id: sequenceName },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    )
    return result.seq
}

app.post('/registrarDoacao', async (req, res) => {
    try {
      const customId = await getNextSequenceValue('produtoid')
  
      const novoProduto = await prisma.produtos.create({
        data: {
          id: undefined,
          custom_id: customId,
          nome_prod: req.body.titulo_prod,
          desc_prod: req.body.desc_prod,
          loc_prod: req.body.loc_prod,
          data_doacao: req.body.data_prod,
          img_prod: req.body.img_prod,
          status: req.body.status
        }
      })
  
      res.status(201).json(novoProduto)
    } catch (error) {
      console.error('Erro ao registrar doação:', error)
      res.status(500).json({ error: 'Erro ao registrar doação', detalhes: error.message })
    }
})

app.get('/doacoes', async (req, res) => {
    try {
      const produtos = await prisma.produtos.findMany()
      res.status(200).json(produtos)
    } catch (error) {
        console.error('Erro ao buscar doações:', error)
      res.status(500).json({ error: 'Erro ao buscar doações', detalhes: error.message })
    }
})

app.delete('/doacoes/:custom_id', async (req, res) => {
  try {
    const customId = parseInt(req.params.custom_id, 10)

    await prisma.produtos.delete({
      where: {
        custom_id: customId,
      },
    })
    res.status(200).json({ messsage: 'Doação deletada com sucesso!'})
  } catch (error) {
    console.error('Erro ao deletar doação:', error)
    res.status(500).json({ error: 'Erro ao deletar doação', detalhes: error.message})
  }
})

app.get('/home', (req, res) => {
  res.sendStatus(204)
})

app.get('/registrar', (req, res) => {
  res.sendStatus(204)
})

app.get('/login', (req, res) => {
  res.sendStatus(204)
})

app.listen(3000)