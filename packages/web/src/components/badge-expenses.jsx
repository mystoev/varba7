import { useQuery } from "@apollo/client";

import { useSharedNavigation } from "../navigation";
import { GET_BADGE_EXPENSES } from "../queries/expenses";
import { Heading1, Heading2, Heading3, Loading, WhiteLabel } from "./styled";

const Badge_Expenses = () => {
  const { loading, error, data } = useQuery(GET_BADGE_EXPENSES);
  const { navigate } = useSharedNavigation();

  if (error) return <Text>Error : {error.message}</Text>;

  return (
    <div
      onClick={() => {
        navigate("expenses");
      }}
    >
      <div
        style={{
          backgroundColor: "royalblue",
          width: "90%",
          alignSelf: "center",
          margin: "auto",
          borderRadius: 5,
        }}
      >
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
      </div>
    </div>
  );
};

export default Badge_Expenses;
