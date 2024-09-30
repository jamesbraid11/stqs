// Helper functions
import { formToObj, getToken } from '../helpers/common.ts';

// Types
import type { RegisterAgentResponse, NewGameFormData, GameAccessToken, FetchAgentResponse, AcceptContractId, AcceptContractResponse } from '../../types/index.ts';


// *This function sends a post request containing user data from NewGame to create an agent
export async function registerAgent(request: Request): Promise<RegisterAgentResponse> {
  // Convert request data into object containing user form entries using formToObj helper function
  const formData: Record<string, string> = await formToObj(request);
  const obj: NewGameFormData = {
    ...formData,
    symbol: formData.symbol || "",
    faction: formData.faction || "",
  }
  console.log("obj:", obj);

  try {
    // Send POST request to SpaceTraders API to register a new agent
    const resp = await fetch("https://api.spacetraders.io/v2/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        symbol: obj.symbol,
        faction: obj.faction,
      }),
    })

    const json = await resp.json();

    // Throw error if the response is not successful
    if (!resp.ok) {
      throw new Error(json.error || "Registration failed: response error");
    }

    console.log("json:", json);

    return json;

  } catch (error) {
    // Report error if request failed
    console.error("Registration failed: request error", error);
    return { error: error instanceof Error ? error.message : String(error) };
  }
}


// *This function sends a GET request containing user token from local storage to fetch basic agent data
export async function fetchAgent(request: Request): Promise<FetchAgentResponse> {
  // Convert request data into object containing user form entries using formToObj helper function
  const formData: Record<string, string> = await formToObj(request);
  const obj: GameAccessToken = {
    ...formData,
    token: formData.token || "",
  }
  console.log("obj:", obj);

  try {
    // Send GET request to SpaceTraders API to fetch agent data
    const resp = await fetch("https://api.spacetraders.io/v2/my/agent", {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${obj.token}`
      }
    });

    const json = await resp.json();

    // Throw error if the response is not successful
    if (!resp.ok) {
      throw new Error(json.error || "Agent log in failed: response error");
    }

    console.log("json:", json);

    return json;

  } catch (error) {
    // Report error if request failed
    console.error("Agent log in failed: request error", error);
    return { error: error instanceof Error ? error.message : String(error) };
  }
}


// * This function sends a POST request containing user token from local storage and contract id from Contracts component to accept a contract
export async function acceptContract(request: Request): Promise<AcceptContractResponse> {
  // Get user game access token from local storage
  const token = getToken();
  console.log(token);

  // Convert request data into object containing user form entries using formToObj helper function
  const formData = await formToObj(request);
  const obj: AcceptContractId = {
    ...formData,
    contractId: formData.contractId || "",
  }
  console.log("obj:", obj);

  try {
    // Send POST request to SpaceTraders API to accept a contract
    const resp = await fetch(`https://api.spacetraders.io/v2/my/contracts/${obj.contractId}/accept`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    });

    const json = await resp.json();

    // Throw error if the response is not successful
    if (!resp.ok) {
      throw new Error(json.error || "Accepting contract failed: response error");
    }

    console.log("json:", json);

    return json;

  } catch (error) {
    // Report error if request failed
    console.error("Accepting contract failed: request error", error);
    return { error: error instanceof Error ? error.message : String(error) };
  }
}