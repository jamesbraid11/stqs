const tokenName = "STQS-TOKEN";

// This function takes a request object and returns form data as a JS object
export async function formToObj(request: Request): Promise<Record<string, string>> {
  const formData = await request.formData();
  return Object.fromEntries(formData.entries()) as Record<string, string>;
}

// This function stores game access token in local storage
export function setToken(token: string): void {
  localStorage.setItem(tokenName, token);
}

// This function gets game access token from local storage
export function getToken(): string | null {
  const token = localStorage.getItem(tokenName);
  // Report if no token found
  if (!token) {
    console.warn("No token found in local storage");
    return null;
  }
  return token;
}