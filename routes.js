let express = require('express');
let router = express.Router();

let panierController = require('./controllers/panierController.js');

router.get('/', (request, response) => {
    response.redirect('/catalogue');
});

router.get('/catalogue', panierController.formationList);
router.get('/pseudo', panierController.Pseudo);
router.post('/pseudo', panierController.Post);
router.get('/ajout/:id', panierController.Ajout);
router.get('/panier', panierController.Panier);
router.get('/bd', panierController.bd);
router.get('/remove/:d', panierController.Remove);

/*

router.get('/user/show/:iduser', userController.userShow);
router.get('/user/remove/:iduser',userController.userRemove);
router.get('/user/update/:iduser', userController.userUpdate);
router.get('/user/add', userController.userFormAdd);
router.post('/user/new', userController.userNew);
*/
module.exports = router;