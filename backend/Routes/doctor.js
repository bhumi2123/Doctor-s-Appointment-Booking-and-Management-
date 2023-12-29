import express from 'express';
import { deleteDoctor, getAllDoctor, getSingleDoctor, updateDoctor } from '../Controllers/doctorController.js';
import { authenticate, restrict } from '../auth/verifyToken.js';

import reviewRouter from './review.js'

const router = express.Router();

router.use("/:doctorId/reviews", reviewRouter);

router.get("/:id", getSingleDoctor);
router.delete("/:id", authenticate, restrict(['doctor']), deleteDoctor);
router.get("/", getAllDoctor);
router.put("/:id", authenticate, restrict(['doctor']), updateDoctor);

export default router;
