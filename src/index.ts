import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import { randFirstName } from '@ngneat/falso';

async function main() {
  const newRescue = await prisma.rescue.create({
    data: {
      name: randFirstName(),
    }
  })

  console.log(newRescue)
}

main().catch(e => {
  console.error(e)
  process.exit(1)
})