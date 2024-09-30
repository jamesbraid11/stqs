import { getToken } from '../helpers/common';

// * Fetch contracts loader
// Define types for important API response data
// Here I would define the types for more of the response when needed in future scaling
// ! Need to check in future what response data contains when all contracts have expired
interface Contract {
  id: string;
  accepted: boolean;
}

interface ContractsResponse {
  error?: string;
  data?: Contract[];
}

export async function fetchContracts(): Promise<ContractsResponse> {
  // Get user game access token from local storage
  const token = getToken();

  // Check if token exists and report if not
  if (!token) {
    console.error("No token found");
    return { error: "No authentication token available" };
  }

  try {
    // Send GET request to SpaceTraders API to view an agent's current contracts
    const resp = await fetch("https://api.spacetraders.io/v2/my/contracts", {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    });

    const json = await resp.json();
    
    // Throw error if the response is not successful
    if (!resp.ok) {
      throw new Error(json.error || "Fetching contracts failed: response error");
    }

    console.log("json:", json);

    return json;

  } catch (error) {
    // Report error if request failed
    console.error("Fetching contracts failed: request error", error);
    return { error: error instanceof Error ? error.message : String(error) };
  }
}