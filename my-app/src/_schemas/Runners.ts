import { z } from 'zod';

export const RunnerTypes = z.enum(['Vandal', 'Destroyer', 'Triage', 'Theif', 'Assasin', 'Recon', 'Sentinel', 'Rook']);
export const RunnerAbilityInfo = z.object({
    name: z.string(),
    description: z.string(),
})
export const RunnerAbilities = z.object({
    primeAbility: RunnerAbilityInfo,
    tacticalAbility: RunnerAbilityInfo,
    traitOne: RunnerAbilityInfo,
    traitTwo: RunnerAbilityInfo
})

export const Runners = z.object({
    name: RunnerTypes,
    description: z.string(),
    abilities: RunnerAbilities,
}
)