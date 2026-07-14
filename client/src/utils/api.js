const API_BASE = "/api/v1";

export async function api(path, method = "GET", body = null, token = null) {
  try {
    const headers = { "Content-Type": "application/json" };
    if (token) headers["Authorization"] = `Bearer ${token}`;

    const url = path.startsWith("/") ? `${API_BASE}${path}` : `${API_BASE}/${path}`;

    const res = await fetch(url, {
      method,
      headers,
      body: body ? JSON.stringify(body) : null,
    });

    const data = await res.json().catch(() => null);

    return { ok: res.ok, status: res.status, data };
  } catch (err) {
    return { ok: false, status: 0, data: { message: err.message } };
  }
}