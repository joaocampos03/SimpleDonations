import express from "express";
import { PrismaClient } from "@prisma/client";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import cors from "cors";
import bcrypt from "bcrypt";

dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const prisma = new PrismaClient();
const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.DATABASE_URL);

const counterSchema = new mongoose.Schema({
  _id: String,
  seq: Number,
});

const Counter = mongoose.model("Counter", counterSchema);

async function getNextSequenceValue(sequenceName) {
  const result = await Counter.findOneAndUpdate(
    { _id: sequenceName },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );
  return result.seq;
}

const upload = multer();

app.post("/upload", upload.array("images", 3), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: "Nenhuma imagem enviada." });
    }

    const uploadPromises = req.files.map(
      (file) =>
        new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: "doacoes" },
            (error, result) => {
              if (error) return reject(error);
              resolve(result);
            }
          );
          stream.end(file.buffer);
        })
    );

    const uploadResults = await Promise.all(uploadPromises);
    const imageUrls = uploadResults.map((result) => result.secure_url);

    res.status(201).json({
      message: "Imagens carregadas com sucesso!",
      urls: imageUrls,
    });
  } catch (error) {
    console.error("Erro ao fazer upload das imagens:", error);
    res.status(500).json({
      error: "Erro ao fazer upload das imagens",
      detalhes: error.message,
    });
  }
});

//Endpoint registra doação
app.post("/registrarDoacao", async (req, res) => {
  try {
    const customId = await getNextSequenceValue("produtoid");
    const imgProd = Array.isArray(req.body.img_prod) ? req.body.img_prod : [];

    const novoProduto = await prisma.produtos.create({
      data: {
        id: undefined,
        custom_id: customId,
        nome_prod: req.body.titulo_prod,
        desc_prod: req.body.desc_prod,
        loc_prod: req.body.loc_prod,
        data_doacao: req.body.data_prod,
        img_prod: imgProd,
        status: req.body.status,
      },
    });

    res.status(201).json(novoProduto);
  } catch (error) {
    console.error("Erro ao registrar doação:", error);
    res
      .status(500)
      .json({ error: "Erro ao registrar doação", detalhes: error.message });
  }
});

//Endpoint lista todas as doacoes
app.get("/doacoes", async (req, res) => {
  try {
    const produtos = await prisma.produtos.findMany();
    res.status(200).json(produtos);
  } catch (error) {
    console.error("Erro ao buscar doações:", error);
    res
      .status(500)
      .json({ error: "Erro ao buscar doações", detalhes: error.message });
  }
});

//Endpoint lista somente uma doação específica
app.get("/doacao/:custom_id", async (req, res) => {
  try {
    const customId = parseInt(req.params.custom_id, 10);

    const produto = await prisma.produtos.findUnique({
      where: {
        custom_id: customId,
      },
    });

    if (produto) {
      res.status(200).json(produto);
    } else {
      res.status(404).json({ message: "Produto não encontrado!" });
    }
  } catch (error) {
    console.error("Erro ao consultar informações do produto:", error);
    res.status(500).json({
      error: "Erro ao consultar informações do produto",
      detalhes: error.message,
    });
  }
});

//Endpoint atualiza status da doação
app.put("/atualizaStatus/:custom_id", async (req, res) => {
  try {
    const customId = parseInt(req.params.custom_id, 10);

    await prisma.produtos.update({
      where: {
        custom_id: customId,
      },
      data: {
        status: req.body.status,
      },
    });

    res.status(200).json({
      message: "Status do produto atualizado com sucesso!",
      data: req.body,
    });
  } catch (error) {
    console.error("Erro ao atualizar o status do produto:", error);
    res.status(500).json({
      error: "Erro ao atualizar o status do produto",
      detalhes: error.message,
    });
  }
});

//Endpoint exclui uma doação
app.delete("/deletaProduto/:custom_id", async (req, res) => {
  try {
    const customId = parseInt(req.params.custom_id, 10);

    await prisma.produtos.delete({
      where: {
        custom_id: customId,
      },
    });
    res
      .status(200)
      .json({ messsage: "Doação deletada com sucesso!", data: req.body });
  } catch (error) {
    console.error("Erro ao deletar doação:", error);
    res
      .status(500)
      .json({ error: "Erro ao deletar doação", detalhes: error.message });
  }
});

app.get("/home", (req, res) => {
  res.sendStatus(204);
});

app.post("/cadastrarUsuario", async (req, res) => {
  try {
    const {
      nome,
      nickname,
      data_nasc,
      email,
      senha,
      endereco,
      telefone,
      documento,
      perfil,
    } = req.body;

    if (!nome || !nickname || !email || !senha) {
      return res
        .status(400)
        .json({ error: "Nome, usuário, e-mail e senha são obrigatórios" });
    }

    const usuarioExistente = await prisma.cadastro.findFirst({
      where: {
        OR: [{ email }, { nickname }, { documento }],
      },
    });

    if (usuarioExistente) {
      let campoDuplicado = "";
      if (usuarioExistente.email === email) campoDuplicado = "email";
      else if (usuarioExistente.nickname === nickname)
        campoDuplicado = "nome de usuário";
      else if (usuarioExistente.documento === documento)
        campoDuplicado = "documento";

      return res
        .status(409)
        .json({ error: `Já existe um usuário com o mesmo ${campoDuplicado}.` });
    }

    const senhaHash = await bcrypt.hash(senha, 10);

    const novoCadastro = await prisma.cadastro.create({
      data: {
        nome,
        nickname,
        data_nasc,
        email,
        senha: senhaHash,
        endereco,
        telefone,
        documento,
        perfil,
      },
    });

    const { senha: _, ...usuarioSemSenha } = novoCadastro;

    res.status(201).json(usuarioSemSenha);
  } catch (error) {
    console.error("Erro ao registrar usuário:", error);
    res
      .status(500)
      .json({ error: "Erro ao registrar usuário", detalhes: error.message });
  }
});

// Alteração no endpoint login
app.post("/login", async (req, res) => {
  try {
    const { email, nickname, senha } = req.body;

    if ((!email && !nickname) || !senha) {
      return res
        .status(400)
        .json({ error: "E-mail ou usuário e senha são obrigatórios" });
    }

    const usuario = await prisma.cadastro.findFirst({
      where: {
        OR: [{ email }, { nickname }],
      },
    });

    if (!usuario) {
      return res.status(404).json({ error: "Usuário não encontrado!" });
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);

    if (!senhaValida) {
      return res.status(401).json({ error: "Credenciais inválidas!" });
    }

    const { senha: _, ...usuarioSemSenha } = usuario;

    res.status(200).json({
      message: "Login bem-sucedido!",
      perfil: usuario.perfil,
      nome: usuario.nome,
    });
  } catch (error) {
    console.error("Erro ao realizar login:", error);
    res
      .status(500)
      .json({ error: "Erro ao realizar login", detalhes: error.message });
  }
});

app.listen(3000);
