// ! Current form inputs are just strings as expected, so these interfaces may not be strictly necessary at this point in the project, but it provides consistency and future-proofing for any added validation or input transformation in future development.

// * New game form data interface
export interface NewGameFormData {
  symbol: string;
  faction: string;
}

// * User game access token form interface
export interface GameAccessToken {
  token: string;
}

// * Accept contract with id form interface
export interface AcceptContractId {
  contractId: string;
}