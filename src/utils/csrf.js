export async function getCsrfToken() {
  const response = await fetch("/csrf/", {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Failed to fetch CSRF token");
  }
  return response.headers.get("X-CSRFToken");
}
