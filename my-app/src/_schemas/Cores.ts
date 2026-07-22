import { z } from 'zod';
import { RunnerTypes } from './Runners.js';

export const Core = z.object({
    name: z.string(),
    description: z.string(),
    price: z.number(),
    character: RunnerTypes,
});

export type Core = z.infer<typeof Core>;