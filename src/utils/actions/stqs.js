import { formToObj } from '../helpers/common'
import { getToken } from '../helpers/common'

// This function sends a post request containing user data from NewGame to create an agent
export async function registerAgent(request) {
  // Convert request data into object containing user form entries using formToObj helper function
  const obj = await formToObj(request)
  console.log("obj:", obj)
  // const data = JSON.stringify(obj)
  // console.log(data)
  try {
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

    const json = await resp.json()
    
    if (!resp.ok) {
      throw new Error(json.error || "Registration failed: response not ok")
    }

    console.log("json:", json)

    return json
  } catch (error) {
    console.error("Registration failed: catch error", error)
    return { error: error.message }
  }
}

// This function sends a post request containing user token from local storage to load basic agent data
export async function loadAgent(request) {
  // Convert request data into object containing user form entries using formToObj helper function
  const obj = await formToObj(request)
  console.log("obj:", obj)
  try {
    const resp = await fetch("https://api.spacetraders.io/v2/my/agent", {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${obj.token}`
      }
    })

    const json = await resp.json()
    
    if (!resp.ok) {
      throw new Error(json.error || "Registration failed: response not ok");
    }

    console.log("json:", json)

    return json;
  } catch (error) {
    console.error("Registration failed: catch error", error)
    return { error: error.message }
  }
}

// This function sends a post request containing user token and from local storage and contract id from Contracts component to accept a contract
export async function acceptContract(request) {

  // Get user game access token from local storage
  const token = getToken()
  console.log(token)

  // Convert request data into object containing user form entries using formToObj helper function
  const obj = await formToObj(request)
  console.log("obj:", obj)
  try {
    const resp = await fetch(`https://api.spacetraders.io/v2/my/contracts/${obj.contractId}/accept`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    })

    const json = await resp.json()
    
    if (!resp.ok) {
      throw new Error(json.error || "Registration failed: response not ok");
    }

    console.log("json:", json)

    return json;
  } catch (error) {
    console.error("Registration failed: catch error", error)
    return { error: error.message }
  }
}