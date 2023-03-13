import { useAuth, useClerk, useUser } from "@clerk/nextjs";

import Layout from "@/components/layouts";
import { GetServerSideProps } from "next";
import client from "@/clients/apollo-client";
import { gql } from "@apollo/client";

export default function Home({ users }: any) {
  const { signOut } = useClerk();
  const { user } = useUser();
  const { getToken } = useAuth();
  const endpoint = process.env.NEXT_PUBLIC_HASURA_PROJECT_ENDPOINT;
  const query = `query MyQuery {
    users{
      id
      last_name
      first_name
      email
    }
  }`;
  console.log(users);

  const makeQuery = async () => {
    try {
      const response = await fetch(endpoint as string, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${await getToken({ template: "hasura" })}`,
        },
        body: JSON.stringify({ query }),
      });
      const data = await response.json();

      // Do something with your data
      console.log(data);
    } catch (err) {
      // Handle errors
    }
  };

  return (
    <>
      <Layout>
        <button type="button" onClick={makeQuery}>
          Make query
        </button>
        <button className="text-3xl font-bold underline" onClick={() => signOut()}>
          Sign out
        </button>
        <div>Hello {user?.firstName}</div>
      </Layout>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { data } = await client.query({
    query: gql`
      query MyQuery {
        users {
          id
          last_name
          first_name
          email
        }
      }
    `,
  });

  return {
    props: {
      users: data.users,
    },
  };
};
