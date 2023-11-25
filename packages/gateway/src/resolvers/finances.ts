import { FinancesAPI } from "../datasources/finances-api";

export const finances = async (
  _parent: any,
  _args: any,
  {
    dataSources: { financesAPI },
  }: { dataSources: { financesAPI: FinancesAPI } }
) => {
  return financesAPI.allTransactions();
};
