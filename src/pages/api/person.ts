import { NextApiRequest, NextApiResponse } from "next";

import instances from "src/lib/axios-instance";
import { CREATE_PERSON, GET_PERSON, GET_PERSONS } from "./graphql/person";

async function getPerson(req: NextApiRequest, res: NextApiResponse) {
  const { email } = req.query;

  if (email) {
    try {
      const requestBody = {
        query: GET_PERSON,
        variables: {
          email,
        },
      };

      const response = await instances.post("", requestBody);
      const { data } = response.data;

      return res.status(200).send(data.person);
    } catch (err) {
      console.log("ERROR AXIOS REQUEST", err);
      return res.send(err);
    }
  } else {
    try {
      const requestBody = {
        query: GET_PERSONS,
        variables: {},
      };

      const response = await instances.post("", requestBody);
      const { data } = response.data;

      return res.status(200).send(data.persons);
    } catch (err) {
      console.log("ERROR AXIOS REQUEST", err);
      return res.send(err);
    }
  }
}

async function createPerson(req: NextApiRequest, res: NextApiResponse) {
  const { name, email } = req.body;

  try {
    const requestBody = {
      query: CREATE_PERSON,
      variables: {
        name,
        email,
      },
    };

    const response = await instances.post("", requestBody);
    const { data } = response.data;

    return res.status(200).send(data.createPerson);
  } catch (err) {
    console.log("ERROR AXIOS REQUEST", err);
    return res.send(err);
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      await getPerson(req, res);
      break;

    case "POST":
      await createPerson(req, res);
      break;

    default:
      return res.send({
        message: "REQUEST IS NOT DEFINED",
        method: req.method,
      });
  }
}
