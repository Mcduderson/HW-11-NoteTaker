const router = require("express").Router();
const notes = require("../db/notes.js");

router.get('/notes', (req, res) => {
    notes.getNotes().then(data => res.json(data))
    .catch(err => res.json(err));
});

router.post('/notes', (req, res) => {
    notes.addNotes(req.body).then(data => res.json(data))
    .catch(err => res.json(err));
});

router.delete('/notes/:id', (req, res) => {
    notes.deleteNotes(req.params.id).then(() => res.json({ok:true}))
    .catch(err => res.json(err));
});

module.exports = router;