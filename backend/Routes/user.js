import express from 'express';
import { deleteUser, getAllUser, getSingleUser, updateUser } from '../Controllers/userController.js';

import { authenticate, restrict } from '../auth/verifyToken.js';

const router = express.Router();

router.get("/:id", authenticate, restrict(['patient']),getSingleUser);
router.delete("/:id", authenticate, restrict(['patient']), deleteUser);
router.get("/", authenticate, restrict(['admin']), getAllUser);
router.put("/:id", authenticate, restrict(['patient']), updateUser);

export default router;
