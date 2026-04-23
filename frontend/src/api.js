const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

export const apiRequest = async (endpoint, options = {}) => {
  const token = localStorage.getItem("token");

  let response;
  try {
    response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(options.headers || {}),
      },
    });
  } catch (error) {
    throw new Error("Cannot connect to server. Please try again.");
  }

  let data = {};
  try {
    data = await response.json();
  } catch (error) {
    data = {};
  }

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
};
