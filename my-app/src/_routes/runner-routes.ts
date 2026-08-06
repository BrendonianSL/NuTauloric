import { Hono } from 'hono';
import type { Runners, RunnersQuery, RunnersResponse } from '../_schemas/runners.ts';
import redis from '../_redis/redis-client.js';
import db from '../_db/db.js';
import { RunnersTable } from '../_schemas/runners.js';

const runnerRoutes = new Hono();

// Helper Functions.
const filterRunners = ( results : Runners[], query : RunnersQuery ) => {
  // Destructure the query parameters present.
  const { name } : RunnersQuery = query;

  let filteredResults : Runners[] = [];

  if(name) {
    filteredResults = results.filter((runner) => runner.name === name);
  }

  return filteredResults;
}
const runnersResponse = ( results: Runners[], message: string ) : RunnersResponse => ({
  data: results,
  message: message
})

runnerRoutes.get('/', async (ctx) => {
  try {
    // First check the Redis Cache.
    const cachedResults = await redis.get('runners');

    // Check for query parameters
      const querys = ctx.req.query();
    
    // If the results are found in the cache, return the results.
    if (cachedResults) {
      if(Object.keys(querys).length > 0) {
        console.log('Filtering based on query parameters.');
        const filteredResults = filterRunners(JSON.parse(cachedResults), ctx.req.query());
        return ctx.json(runnersResponse(filteredResults, 'Runner(s) fetched from cache.'), 200);
      }
      console.log('No query parameters present. Returning results from cache.');
      return ctx.json(runnersResponse(JSON.parse(cachedResults), 'Runner(s) fetched from cache.'), 200);
    }

    // Grabs results from the database.
    const results : Runners[] = await db.select().from(RunnersTable);

    // Error Handling.
    if (results.length === 0) {
      console.warn('No Runners Found.');
      return ctx.json(runnersResponse([], 'No Runners Found.'), 200)
    }

    // On success, set the redis cache.
    await redis.set('runners', JSON.stringify(results), 'EX', 60 * 60 * 24); // 24 hours
    console.log('Results cached. Successfully fetched data.');

    // Filter the results based on the query parameters. If not, return the raw results.
    if(Object.keys(querys).length > 0) {
      const filteredResults = filterRunners(results, querys);
      return ctx.json(runnersResponse(filteredResults, 'Runner(s) fetched successfully.'), 200);
    } else {
      return ctx.json(runnersResponse(results, 'Runner(s) fetched successfully.'), 200);
    }
  } catch (err) {
    // 500 (Internal Server Error)
    return ctx.json({ error: 'Internal Server Error.'}, 500);
  }
})

export default runnerRoutes;