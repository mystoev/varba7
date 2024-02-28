import { useQuery } from "@apollo/client";

import { useSharedNavigation } from "../navigation";
import { GET_BADGE_EXPENSES } from "../queries/expenses";

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
        <p
          style={{
            fontSize: 32,
            fontWeight: "bold",
            color: "black",
            textAlign: "center",
            paddingTop: 10,
          }}
        >
          Expenses
        </p>
        {loading ? (
          <p
            style={{
              textAlign: "center",
              padding: 10,
            }}
          >
            Loading...
          </p>
        ) : (
          <>
            <p
              style={{
                fontWeight: "bold",
                textAlign: "center",
                padding: 5,
                fontSize: 24,
                color: "#d3d3d3",
              }}
            >
              This Month:{" "}
              <span style={{ color: "white" }}>
                {data?.badgeExpenses.month.toLocaleString()}лв
              </span>
            </p>
            <p
              style={{
                fontWeight: "bold",
                textAlign: "center",
                padding: 5,
                fontSize: 24,
                color: "#d3d3d3",
              }}
            >
              This Year:{" "}
              <span style={{ color: "white" }}>
                {data?.badgeExpenses.year.toLocaleString()}лв
              </span>
            </p>
            <p
              style={{
                fontWeight: "bold",
                textAlign: "center",
                color: "#d3d3d3",
                padding: 5,
              }}
            >
              Last entry:{" "}
              <span style={{ color: "white" }}>
                {data?.badgeExpenses.lastEntry}
              </span>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Badge_Expenses;
