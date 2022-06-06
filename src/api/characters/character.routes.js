const express = require('express');
const upload = require('../../utils/middleware/upload.file.middleware');


const {
    getAllCharacters,
    getCharacterByName,
    createCharacter,
    updateCharacterById,
    deleteCharacterById
} = require('./character.controller');

const CharacterRoutes = express.Router();




CharacterRoutes.get('/', getAllCharacters);
CharacterRoutes.get('/:name', getCharacterByName);
CharacterRoutes.post('/', upload.single('image'),createCharacter);
CharacterRoutes.put('/:id', updateCharacterById);
CharacterRoutes.delete('/:id', deleteCharacterById);








module.exports = CharacterRoutes;