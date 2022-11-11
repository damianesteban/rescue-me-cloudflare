import { PrismaClient } from '@prisma/client/edge'
const prisma = new PrismaClient()
import { randFirstName } from '@ngneat/falso';


addEventListener('fetch', event => {
  event.respondWith(handleEvent(event))
})

async function handleEvent(event: FetchEvent): Promise<Response> {
  const { request } = event;

  event.waitUntil(
    prisma.rescue.create({
      data: {
        name: randFirstName(),
      }
    }).then()
  )

  return new Response('Rescue Name: ' + randFirstName());
}
