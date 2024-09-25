import { getToken } from '../helpers/common'

export async function fetchContracts() {

  // Get user game access token from local storage
  const token = getToken()

  // Check if token exists
  if (!token) {
    console.error("No token found")
    return { error: "No authentication token available" }
  }

  try {
    const resp = await fetch("https://api.spacetraders.io/v2/my/contracts", {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    })

    const json = await resp.json()
    
    if (!resp.ok) {
      throw new Error(json.error || "Fetching contracts failed: response not ok")
    }

    console.log("json:", json)

    return json
  } catch (error) {
    console.error("Fetching contracts failed: catch error", error)
    return { error: error.message }
  }
}