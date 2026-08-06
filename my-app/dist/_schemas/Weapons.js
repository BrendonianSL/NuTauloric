import { z } from 'zod';
export const AmmoType = z.enum(['Light Rounds', 'Heavy Rounds', 'Volt Battery', 'Volt Cells', 'MIPS Rounds']);
export const WeaponType = z.enum(['Assault Rifle', 'Submachine Gun', 'Machine Gun', 'Shotgun', 'Sniper Rifle', 'Pistol', 'Percision Rifle', 'Railgun']);
// Stats present on a weapon in Marathon.
export const WeaponStats = z.object({
    firepower: z.number(),
    accuracy: z.number(),
    handling: z.number(),
    range: z.number(),
    magazine: z.number(),
    zoom: z.number(),
    ammoType: AmmoType,
    patch: z.string(),
});
// The Weapon Schema.
export const Weapons = z.object({
    name: z.string(),
    weaponType: WeaponType,
    description: z.string(),
    weaponStats: WeaponStats,
    cradleXP: z.number(),
});
// The Mods Schema.
export const WeaponMods = z.object({
    name: z.string(),
    cradleXP: z.number(),
    cost: z.number(),
    value: z.number(),
    description: z.string(),
    compatability: Weapons,
    stats: WeaponStats,
});
