// router/faqRouter.js
import express from 'express';
import { Faq } from '../models/faq.model.js';

const router = express.Router();

// ✅ Define it as root of this router
router.get('/', async (req, res) => {
  try {
    const faqs = await Faq.find();
    res.status(200).json(faqs);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching FAQ data', error: err });
  }
});

export default router;
