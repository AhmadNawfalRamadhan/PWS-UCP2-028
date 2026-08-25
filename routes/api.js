const express = require('express');
const router = express.Router();

const authController = require('../controller/authController');
const gameController = require('../controller/gameController');
const chatController = require('../controller/chatController');
const genreController = require('../controller/genreController');
const developerController = require('../controller/developerController');
const upload = require('../middleware/uploadMiddleware');

// Import kedua middleware (JWT & API Key)
const { verifyJWT } = require('../middleware/authMiddleware');
const { verifyApiKey } = require('../middleware/apiKeyMiddleware');

// --- AUTH (Public) ---
router.post('/register', authController.register);
router.post('/login', authController.login);

// --- SAAS PUBLIC DATA ENDPOINTS (Proteksi via API Key) ---
router.get('/games', verifyApiKey, gameController.getAllGames);
router.get('/games/:id', verifyApiKey, gameController.getGameById);
router.get('/genres', verifyApiKey, genreController.getAllGenres);
router.get('/developers', verifyApiKey, developerController.getAllDevelopers);
router.get('/developers/:id', verifyApiKey, developerController.getDeveloperById);

// --- USER AUTHENTICATED ENDPOINTS (Proteksi via JWT Token User) ---
router.post('/games', [verifyJWT, upload.single('gambar')], gameController.createGame);
router.put('/games/:id', [verifyJWT, upload.single('gambar')], gameController.updateGame);
router.delete('/games/:id', verifyJWT, gameController.deleteGame);

router.post('/genres', verifyJWT, genreController.createGenre);
router.put('/genres/:id', verifyJWT, genreController.updateGenre);
router.delete('/genres/:id', verifyJWT, genreController.deleteGenre);

router.post('/developers', verifyJWT, developerController.createDeveloper);
router.put('/developers/:id', verifyJWT, developerController.updateDeveloper);
router.delete('/developers/:id', verifyJWT, developerController.deleteDeveloper);

// --- AI CHATBOT (Proteksi via JWT Token User) ---
router.post('/chat', verifyJWT, chatController.sendChat);
router.get('/chat/history', verifyJWT, chatController.getChatHistory);
router.delete('/chat/history', verifyJWT, chatController.clearChatHistory);

module.exports = router;