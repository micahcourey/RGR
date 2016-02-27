import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLList,
  GraphQLInt,
  GraphQLString,
  GraphQLNonNull,
  GraphQLID
} from 'graphql';

import {
  connectionDefinitions,
  connectionArgs,
  connectionFromPromisedArray,
  globalIdField,
  mutationWithClientMutationID
} from "graphql-relay"

let Schema = (db) => {
  let store = {};

  let storeType = new GraphQLObjectType({
    name: 'Store',
    fields: () => ({
      id: globalIdField("Store"),
      linkConnection: {
        type: linkConnection.connectionType,
        args: connectionArgs,
        resolve: (_, args) => connectionFromPromisedArray(
          db.collection("links").find({}).limit(args.first).toArray(),
          args
        )
      }
    })
  });

  let linkType = new GraphQLObjectType({
    name: 'Link',
    fields: () => ({
      id: {
        type: GraphQLNonNull(GraphQLID),
        resolve: (obj) => obj._id

      },
      title: { type: GraphQLString },
      url: { type: GraphQLString }
    })
  });

  let linkConnection = connectionDefinitions({
    name: 'Link',
    nodeType: linkType
  });

  let createLinkMutation = mutationWithClientMutationID({
    name: 'CreateLink',

    inputFields: {
      title: { type: new GraphQLNonNull(GraphQLString)},
      url: { type: new GraphQLNonNull(GraphQLString)}
    },

    outputFields: {
      linkEdge: {
        type: linkConnection.edgeType,
        resolve: (obj) => ({ node: obj.ops[0], curser: obj.insertedId })
      },
      store: {
        type: storeType,
        resolve: () => store
      }
    },

    mutateAndGetPayload: () => {
      return db.collection("links").insertOne({title, url});
    }
  });

  let schema = new GraphQLSchema({
    query: new GraphQLObjectType({
      name: 'Query',
      fields: () => ({
        store: {
          type: storeType,
          resolve: () => store
        }
      })
    }),

    mutation: new GraphQLObjectType({
      name: 'Mutation',
      fields: () => ({
        createLink: createLinkMutation
      })
    })
  });

  return schema;
};

export default Schema;
