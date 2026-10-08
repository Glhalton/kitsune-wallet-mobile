import * as SecureStore from "expo-secure-store";

const apiUrl = process.env.EXPO_PUBLIC_API_URL;
const ACCESS_TOKEN_KEY = "accessToken";

export interface User {
  id: number;
  name: string;
  email: string;
}

export class UnauthorizedError extends Error {}

/**
 * Calls the API with the stored access token. Throws UnauthorizedError when
 * there is no token or the API rejects it, so screens can send the user back
 * to the login.
 */
export async function authenticatedFetch(path: string, init?: RequestInit) {
  const token = await SecureStore.getItemAsync(ACCESS_TOKEN_KEY);

  if (!token) {
    throw new UnauthorizedError();
  }

  const response = await fetch(`${apiUrl}${path}`, {
    ...init,
    headers: { ...init?.headers, Authorization: `Bearer ${token}` },
  });

  if (response.status === 401) {
    throw new UnauthorizedError();
  }

  return response;
}

export async function getCurrentUser(): Promise<User> {
  const response = await authenticatedFetch("/auth/me");

  if (!response.ok) {
    throw new Error("Não foi possível carregar o usuário.");
  }

  return response.json();
}

export async function signOut() {
  await SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY);
}
