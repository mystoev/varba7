import { useQuery } from "@apollo/client";

import { useSharedNavigation } from "../navigation";
import { GET_BADGE_EXPENSES } from "../queries/expenses";
import {
  Container,
  Heading1,
  Heading2,
  Heading3,
  Loading,
  WhiteLabel,
} from "./styled";

const Badge_Expenses = () => {
  const { loading, error, data } = useQuery(GET_BADGE_EXPENSES);
  const { navigate } = useSharedNavigation();

  if (error) return <p>Error : {error.message}</p>;

  return (
    <a
      onClick={() => {
        navigate("expenses");
      }}
    >
      <Container backgroundColor={"royalblue"}>
        <Heading1>Expenses</Heading1>
        {loading ? (
          <Loading>Loading...</Loading>
        ) : (
          <>
            <Heading2>
              This Month:{" "}
              <WhiteLabel>
                {data?.badgeExpenses.month.toLocaleString()}лв
              </WhiteLabel>
            </Heading2>
            <Heading2>
              This Year:{" "}
              <WhiteLabel>
                {data?.badgeExpenses.year.toLocaleString()}лв
              </WhiteLabel>
            </Heading2>
            <Heading3>
              Last entry:{" "}
              <WhiteLabel>{data?.badgeExpenses.lastEntry}</WhiteLabel>
            </Heading3>
          </>
        )}
      </Container>
    </a>
  );
};

export default Badge_Expenses;
