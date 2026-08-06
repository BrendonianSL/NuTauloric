import 'dotenv/config'
import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { pgTable, serial, text } from 'drizzle-orm/pg-core';
import runnerRoutes from './_routes/runner-routes.js';
/* QUESTIONS:
--save-dev CLI tag
Upstash Redis 
SDKs
*/

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.route('/runners', runnerRoutes);

serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
