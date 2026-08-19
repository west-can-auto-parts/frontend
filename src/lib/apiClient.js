const isProduction = process.env.NODE_ENV === "production";

export const API_BASE_URL = isProduction
  ? "https://clientsidebackend.onrender.com/api"
  : "http://localhost:8080/api";

export const AUTH_API_BASE_URL = isProduction
  ? "https://westcanuserbackend.onrender.com/api"
  : "http://localhost:8080/api";

export class ApiError extends Error {
  constructor(message, status, data) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

function readJwtToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("jwt_token");
}

function buildUrl(path, baseUrl = API_BASE_URL) {
  if (/^https?:\/\//.test(path)) return path;
  return `${baseUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

export async function apiFetch(path, options = {}) {
  const {
    method = "GET",
    body,
    headers = {},
    includeAuth = false,
    credentials = "include",
    baseUrl,
    ...rest
  } = options;

  const requestHeaders = {
    Accept: "application/json",
    ...headers,
  };

  let requestBody = body;
  if (body !== undefined && body !== null && !(body instanceof FormData)) {
    requestHeaders["Content-Type"] =
      requestHeaders["Content-Type"] || "application/json";
    requestBody = JSON.stringify(body);
  }

  if (includeAuth) {
    const token = readJwtToken();
    if (token) {
      requestHeaders.Authorization = `Bearer ${token}`;
    }
  }

  const response = await fetch(buildUrl(path, baseUrl), {
    method,
    credentials,
    headers: requestHeaders,
    body: requestBody,
    ...rest,
  });

  if (response.status === 204) {
    return null;
  }

  const contentType = response.headers.get("content-type") || "";
  const raw = await response.text();

  if (!raw) {
    if (!response.ok) {
      throw new ApiError(
        `Request failed with status ${response.status}`,
        response.status,
        null,
      );
    }
    return null;
  }

  let data = raw;
  if (contentType.includes("application/json")) {
    try {
      data = JSON.parse(raw);
    } catch {
      throw new ApiError("Invalid JSON response from server", response.status, raw);
    }
  }

  if (!response.ok) {
    const fallbackMessage =
      typeof data === "object" && data?.message
        ? data.message
        : `Request failed with status ${response.status}`;
    throw new ApiError(fallbackMessage, response.status, data);
  }

  return data;
}
