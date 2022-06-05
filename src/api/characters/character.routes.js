const express = require('express');

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
CharacterRoutes.post('/', createCharacter);
CharacterRoutes.put('/:id', updateCharacterById);
CharacterRoutes.delete('/:id', deleteCharacterById);








module.exports = CharacterRoutes;