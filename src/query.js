import { useState } from "react";
import { API, graphqlOperation } from "aws-amplify";

export const useQuery = (queryVar, limitVar) => {
  const [queryData, setQueryData] = useState("");

  let queryData = API.graphql(graphqlOperation(queryVar, { limit: limitVar }));

  setQueryData(queryData);

  return queryData;
};
