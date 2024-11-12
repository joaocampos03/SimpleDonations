import express from 'express';
import { PrismaClient } from '@prisma/client';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import cors from 'cors';

dotenv.config();

// Configuração do Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Inicializa Prisma e Express
const prisma = new PrismaClient();
const app = express();

// Middleware
app.use(cors({
  origin: '*', // Defina o domínio específico, se necessário
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());

// Conexão com o MongoDB
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Conectado ao MongoDB'))
  .catch((error) => console.error('Erro ao conectar ao MongoDB:', error));

// Schema do Mongoose para contadores
const counterSchema = new mongoose.Schema({
  _id: String,
  seq: Number,
});

const Counter = mongoose.model('Counter', counterSchema);

// Função para obter o próximo valor da sequência
async function getNextSequenceValue(sequenceName) {
  const result = await Counter.findOneAndUpdate(
    { _id: sequenceName },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );
  return result.seq;
}

// Configuração do Multer para upload de arquivos
const upload = multer({ dest: 'uploads/' });

// Endpoint para upload de imagem no Cloudinary
app.post('/upload', upload.single('image'), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'doacoes',
    });
    res.status(201).json({ url: result.secure_url });
  } catch (error) {
    console.error('Erro ao fazer upload da imagem:', error);
    res.status(500).json({ error: 'Erro ao fazer upload da imagem', detalhes: error.message });
  }
});

// Endpoint para registrar uma nova doação
app.post('/registrarDoacao', async (req, res) => {
  try {
    const customId = await getNextSequenceValue('produtoid');
    const novoProduto = await prisma.produtos.create({
      data: {
        custom_id: customId,
        nome_prod: req.body.titulo_prod,
        desc_prod: req.body.desc_prod,
        loc_prod: req.body.loc_prod,
        data_doacao: req.body.data_prod,
        img_prod: req.body.img_prod,
        status: req.body.status,
      },
    });
    res.status(201).json(novoProduto);
  } catch (error) {
    console.error('Erro ao registrar doação:', error);
    res.status(500).json({ error: 'Erro ao registrar doação', detalhes: error.message });
  }
});

// Endpoint para listar todas as doações
app.get('/doacoes', async (req, res) => {
  try {
    const produtos = await prisma.produtos.findMany();
    res.status(200).json(produtos);
  } catch (error) {
    console.error('Erro ao buscar doações:', error);
    res.status(500).json({ error: 'Erro ao buscar doações', detalhes: error.message });
  }
});

// Endpoint para listar uma doação específica
app.get('/doacao/:custom_id', async (req, res) => {
  try {
    const customId = parseInt(req.params.custom_id, 10);
    const produto = await prisma.produtos.findUnique({
      where: { custom_id: customId },
    });
    if (produto) {
      res.status(200).json(produto);
    } else {
      res.status(404).json({ message: 'Produto não encontrado!' });
    }
  } catch (error) {
    console.error('Erro ao consultar informações do produto:', error);
    res.status(500).json({ error: 'Erro ao consultar informações do produto', detalhes: error.message });
  }
});

// Endpoint para atualizar o status de uma doação
app.put('/atualizaStatus/:custom_id', async (req, res) => {
  try {
    const customId = parseInt(req.params.custom_id, 10);
    await prisma.produtos.update({
      where: { custom_id: customId },
      data: { status: req.body.status },
    });
    res.status(200).json({ message: 'Status do produto atualizado com sucesso!' });
  } catch (error) {
    console.error('Erro ao atualizar o status do produto:', error);
    res.status(500).json({ error: 'Erro ao atualizar o status do produto', detalhes: error.message });
  }
});

// Endpoint para deletar uma doação
app.delete('/deletaProduto/:custom_id', async (req, res) => {
  try {
    const customId = parseInt(req.params.custom_id, 10);
    await prisma.produtos.delete({
      where: { custom_id: customId },
    });
    res.status(200).json({ message: 'Doação deletada com sucesso!' });
  } catch (error) {
    console.error('Erro ao deletar doação:', error);
    res.status(500).json({ error: 'Erro ao deletar doação', detalhes: error.message });
  }
});

// Exportando a aplicação para o Vercel
export default app;