const express = require('express');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});

app.post('/livros', async (req, res) => {
    const { titulo, autor, anoPublicacao, genero } = req.body;

    try {
        const novoLivro = await prisma.livro.create({
            data: { titulo, autor, anoPublicacao, genero },
        });
        res.status(201).json(novoLivro);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao cadastrar o livro' });
    }
});
app.get('/livros', async (req, res) => {
    try {
        const livros = await prisma.livro.findMany();
        res.json(livros);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao listar os livros' });
    }
});
app.put('/livros/:id', async (req, res) => {
    const { id } = req.params;
    const { titulo, autor, anoPublicacao, genero } = req.body;

    try {
        const livroAtualizado = await prisma.livro.update({
            where: { id: parseInt(id) },
            data: { titulo, autor, anoPublicacao, genero },
        });
        res.json(livroAtualizado);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar o livro' });
    }
});
app.delete('/livros/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await prisma.livro.delete({
            where: { id: parseInt(id) },
        });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Erro ao excluir o livro' });
    }
});
