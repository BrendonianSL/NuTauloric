import { z } from 'zod';
import { RunnerTypes } from './runners.js';
export const Core = z.object({
    name: z.string(),
    description: z.string(),
    price: z.number(),
    character: RunnerTypes,
});
