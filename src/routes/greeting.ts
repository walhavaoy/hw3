import { Router } from 'express';
import type { Request, Response } from 'express';

const greetings: readonly string[] = [
  'Hello!',
  'Hi there!',
  'Greetings!',
  'Hey!',
  'Welcome!',
  'Howdy!',
  'Good day!',
  'Salutations!',
  "What's up!",
  'Nice to see you!',
];

const router = Router();

router.get('/', (_req: Request, res: Response) => {
  const index = Math.floor(Math.random() * greetings.length);
  res.json({ greeting: greetings[index] });
});

export default router;
