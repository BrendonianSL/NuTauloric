import { z } from 'zod';
const RunnerShells = z.enum(['Vandal', 'Destroyer', 'Triage', 'Theif', 'Assasin', 'Recon', 'Sentinel', 'Rook']);
export const Runners = z.object({
    id: z.number(),
    name: z.string(),
});
export const RunnersResponse = z.object({
    data: z.array(Runners),
    message: z.string(),
});
export const RunnersQuery = z.object({
    name: RunnerShells.optional(),
});
