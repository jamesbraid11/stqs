import { formToObj } from '../helpers/common'

// This function sends a post request containing 
export async function registerAgent(request) {
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
    });

    const json = await resp.json();
    
    if (!resp.ok) {
      throw new Error(json.error || "Registration failed: response not ok");
    }

    console.log("json:", json)

    return json;
  } catch (error) {
    console.error("Registration failed: catch error", error)
    return { error: error.message };
  }
}