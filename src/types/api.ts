// ! I would define the types for more of the response when needed if scaling the project in the future

// * Register agent response interface
export interface RegisterAgentResponse {
  error?: string;
  data?: {
    token: string;
  }
};

// * Fetch agentresponse interface
interface Agent {
  accountId: string;
  symbol: string;
};
export interface FetchAgentResponse {
  error?: string;
  data?: Agent[];
};

// Used in both below interfaces
interface Contract {
  id: string;
  accepted: boolean;
};

// * Fetch contracts loader response interface
// ! Need to check in future what response data contains when all contracts have expired
export interface ContractsLoadData {
  error?: string;
  data?: Contract[];
};

// * Accept contract response interface
export interface AcceptContractResponse {
  error?: string;
  data?: {
    contract: Contract;
  }
};