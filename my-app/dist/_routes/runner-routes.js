import { Hono } from 'hono';
import { db, runners } from '../_db/db.ts';
import { redis } from '../_redis/redis-client.ts';
const runnerRoutes = new Hono();
const filterRunners = (results, query) => {
    // Destructure the query parameters present.
    const { name } = query;
    let filteredResults = [];
    if (name) {
        filteredResults = results.filter((runner) => runner.name === name);
    }
    return filteredResults;
};
const runnersResponse = (results, message) => ({
    data: results,
    message: message
});
runnerRoutes.get('/', async (ctx) => {
    try {
        // First check the Redis Cache.
        const cachedResults = await redis.get('runners');
        // If the results are found in the cache, return the results.
        if (cachedResults) {
            // Logging.
            console.log('Fetched from cache.');
            // Check if there are query parameters present with the request.
            if (ctx.req.query()) {
                // Filter the results based on the query parameters and return the response.
                const filteredResults = filterRunners(JSON.parse(cachedResults), ctx.req.query());
                return ctx.json(runnersResponse(filteredResults, 'Runner(s) fetched from cache.'), 200);
            }
            // Return the results from the cache.
            return ctx.json(runnersResponse(JSON.parse(cachedResults), 'Runner(s) fetched from cache.'), 200);
        }
        // Grabs results from the database.
        const results = await db.select().from(runners);
        // Error Handling.
        if (results.length === 0) {
            return ctx.json(runnersResponse([], 'No Runners Found.'), 200);
        }
        // On success, set the redis cache.
        await redis.set('runners', JSON.stringify(results), 'EX', 60 * 60 * 24); // 24 hours
        console.log('Results cached.');
        // On Success. 200 (OK)
        return ctx.json(runnersResponse(results, 'Runner(s) fetched successfully.'), 200);
    }
    catch (err) {
        // 500 (Internal Server Error)
        return ctx.json({ error: 'Internal Server Error.' }, 500);
    }
});
export default runnerRoutes;
