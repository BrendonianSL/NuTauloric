import { z } from 'zod';
const ImplantType = z.enum(['Head', 'Torso', 'Legs']);
export const Implants = z.object({
    name: z.string(),
    creadeXP: z.number(),
    value: z.number(),
    trait: z.string(),
});
