import { Router } from 'express';

const router = Router();

// Simula una base de datos en memoria
let libros = [];

// --------LISTADO--------------------------------------------//
router.get('/list', async (req, res) => {
    try {
        res.render('clientes/list', { libros }); // Cambiado a 'libros' y 'libros/list'
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// --------AÑADIR--------------------------------------------//
router.get('/add', (req, res) => {
    res.render('clientes/add'); // Cambiado a 'libros/add'
});

router.post('/add', async (req, res) => {
    try {
        const { title, author, cover, publication_date } = req.body;
        // Guarda los datos en la base de datos (en este caso, en una lista)
        libros.push({ title, author, cover, publication_date });
        res.redirect('/list');
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// --------ACTUALIZAR--------------------------------------------//
router.get('/edit/:id', (req, res) => {
    const { id } = req.params;
    const libro = libros[id]; // Cambiado a 'libros' y 'libro'
    res.render('libros/edit', { libro, id }); // Cambiado a 'libros/edit'
});

router.post('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const { title, author, cover, publication_date } = req.body;
    try {
        libros[id] = { title, author, cover, publication_date }; // Cambiado a 'libros'
        res.redirect('/list');
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;
