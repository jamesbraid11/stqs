const tokenName = "STQS-TOKEN"

// This function takes a request object and returns form data as a JS object
export async function formToObj(request) {
  const formData = await request.formData()
  return Object.fromEntries(formData.entries())
}

// This function stores game access token in local storage
export function setToken(token) {
  localStorage.setItem(tokenName, token)
}

// This function gets game access token from local storage
export function getToken() {
  const token = localStorage.getItem(tokenName)
  // Report if no token found
  if (!token) {
    console.warn("No token found in local storage")
    return null
  }
  return token
}