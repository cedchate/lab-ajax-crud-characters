const router = require('express').Router()
const Character = require('../models/Character.model')
/**
 * !All the routes here are prefixed with /api/characters
 */

/**
 * ? This route should respond with all the characters
 */
router.get('/', async (req, res, next) => {
	/**Your code goes here */
	try {
		const allCharacter= await Character.find();
		// console.log(allCharacter);
		res.status(200).json(allCharacter);
	} catch (error) {
		next(error);
	}
})

/**
 * ? This route should create one character and respond with
 * ? the created character
 */
router.post('/', async (req, res, next) => {
	/**Your code goes here */
	try {
		const erros = ""
	if(!req.body.name || !req.body.occupation || !req.body.weapon){
		return res.status(400).json({errorMessage: "please fill all the fills"})
	}
		const createdCharacter= {
			name: req.body.name,
			occupation: req.body.occupation,
			weapon: req.body.weapon,
			cartoon: req.body.cartoon
		};
		const createdChar= await Character.create(createdCharacter);
		res.status(201).json(createdChar);
	} catch (error) {
		next(error)
	}
})

/**
 * ? This route should respond with one character
 */
router.get('/:id', async (req, res, next) => {
	/**Your code goes here */
	try {
		const character= await Character.findOne({name: req.params.id});
		// console.log(character)
		res.status(200).json(character);
	} catch (error) {
		next(error)
	}
})

/**
 * ? This route should update a character and respond with
 * ? the updated character
 */
router.patch('/:id', async (req, res, next) => {
	/**Your code goes here */
	try {
		const characterToUpdate= {
			name: req.body.name,
			occupation: req.body.occupation,
			weapon: req.body.weapon,
			cartoon: req.body.cartoon,
		};
		const characterUpdated= await Character.findByIdAndUpdate(req.params.id, characterToUpdate);
		// console.log(characterUpdated)
		if(characterUpdated){
			res.status(200).json(characterUpdated)
		}else {
			res.json({message: "Character not found"})
		}
	} catch (error) {
		next(error)
	}
})

/**
 * ? Should delete a character and respond with a success or
 * ? error message
 */
router.delete('/:id', async (req, res, next) => {
	/**Your code goes here */
	try {
		const characterToDelete= await Character.findById(req.params.id);
		// console.log(characterToDelete)
		if(!characterToDelete){
			res.json({message: "Character not found"});
		}
		await Character.findByIdAndDelete(req.params.id);
		res.json({message: "Character has been successfully deleted"});
	} catch (error) {
		next(error)
	}
})

module.exports = router
