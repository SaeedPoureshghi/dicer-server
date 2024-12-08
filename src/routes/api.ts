import Express from 'express';
import ApiController from '../controllers/apiController';

const router = Express.Router();

router.get('/',ApiController.getApiData)
router.post('/mockUser',ApiController.mockUser)

router.get('/start',ApiController.start)
router.get('/roll',ApiController.roll)

export default router;