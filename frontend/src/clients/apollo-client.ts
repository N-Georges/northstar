import { useStore } from "@/store/store";
import { ApolloClient, createHttpLink, InMemoryCache, split } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { getMainDefinition } from "@apollo/client/utilities";
import { createClient } from "graphql-ws";

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_HASURA_PROJECT_ENDPOINT,
});

const wsLink =
  typeof window !== "undefined"
    ? new GraphQLWsLink(
        createClient({
          url: process.env.NEXT_PUBLIC_HASURA_PROJECT_ENDPOINT_WS as string,
          lazy: true,
          connectionParams: async () => {
            const { token } = useStore.getState().user;
            // console.log("WSLINK : connectionParams", token, user);
            if (!token) {
              throw new Error("Need token to call hasura!");
            }
            return {
              headers: {
                "content-type": "application/json",
                "x-hasura-admin-secret": process.env.NEXT_PUBLIC_HASURA_ADMIN_SECRET,
                ...(token && { Authorization: `Bearer ${token}` }),
              },
            };
          },
        })
      )
    : null;

const splitLink = wsLink
  ? split(
      ({ query }) => {
        const definition = getMainDefinition(query);
        return definition.kind === "OperationDefinition" && definition.operation === "subscription";
      },
      wsLink,
      httpLink
    )
  : httpLink;

const authLink = setContext((_, { headers }) => {
  const { token } = useStore.getState().user;

  // if (!token) {
  //   throw new Error("Need token to call hasura!");
  // }

  return {
    headers: {
      ...headers,
      ...(token && { Authorization: `Bearer ${token}` }),
      "Content-Type": "application/json",
      "x-hasura-admin-secret": process.env.NEXT_PUBLIC_GRAPHQL_ADMIN_SECRET as string,
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(splitLink),
  cache: new InMemoryCache(),
});

export default client;
