import { PrismaClient } from '@prisma/client/edge'
// const prisma = new PrismaClient()
// import { randFirstName } from '@ngneat/falso';
import { createServer } from '@graphql-yoga/common';

// addEventListener('fetch', event => {
//   event.respondWith(handleEvent(event))
// })

// async function handleEvent(event: FetchEvent): Promise<Response> {
//   const { request } = event;

//   event.waitUntil(
//     prisma.rescue.create({
//       data: {
//         name: randFirstName(),
//       }
//     }).then()
//   )

//   return new Response('Rescue Name: ' + randFirstName());
// }



interface Env {
  NAMESPACE: KVNamespace
}

 

type QueryType = {
  rescue: (_: any, { id }: { id: string; }, { NAMESPACE }: { NAMESPACE: Env['NAMESPACE']; }) => Promise<any>;
  rescues: (_: any, __: any, { NAMESPACE }: { NAMESPACE: Env['NAMESPACE']; }) => Promise<any>;
}

type Context = { NAMESPACE: Env['NAMESPACE']; }

type MutationType = {
  createRescue: (_: any, { id, text }: { id: string, text: string; }, { NAMESPACE }: { NAMESPACE: Env['NAMESPACE']; }) => Promise<any>;
  deleteRescue: (_: any, { id }: { id: string; }, context: Context) => Promise<any>;
}

export default createServer<Env>({
  schema: {
    typeDefs: /* GraphQL */ `
    type Query {
      todo(id: ID!): String
      todos: [String]
    }
    type Mutation {
      createTodo(id: ID!, text: String!): String
      deleteTodo(id: ID!): String
    }
  `,
  resolvers: {
    Query: {
      rescue: (_, { id }, { NAMESPACE }) => NAMESPACE.get(id),
      rescues: (_, _2, { NAMESPACE }) => NAMESPACE.list()
    } as QueryType,
    Mutation: {
      // MY_NAMESPACE is available as a GraphQL context
      createRescue(_, { id, text }, context ) {
        return context.NAMESPACE.put(id, text)
      },
      deleteRescue(_, { id }, context) {
        return context.NAMESPACE.delete(id)
      }
    } as MutationType
  }
  }
})
