const isProduction = process.env.NODE_ENV === "production";

export const USER_SESSION_API_BASE = isProduction
  ? "https://clientsidebackend.onrender.com/api"
  : "http://localhost:8080/api";

/**
 * GET /user-session — sends cookies (e.g. customerBrowserId) when credentials: "include".
 */
export async function fetchUserSession() {
  const response = await fetch(`${USER_SESSION_API_BASE}/user-session`, {
    method: "GET",
    credentials: "include",
    headers: {
      accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`User session request failed: ${response.status}`);
  }

  return response.json();
}

/**
 * DELETE /garage/vehicle — removes a vehicle from the user's garage.
 */
export async function deleteGarageVehicle(payload) {
  const response = await fetch(`${USER_SESSION_API_BASE}/garage/vehicle`, {
    method: "DELETE",
    credentials: "include",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Delete garage vehicle failed: ${response.status}`);
  }
}
