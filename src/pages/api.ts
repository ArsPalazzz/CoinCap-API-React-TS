const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "https://api.coincap.io/v2";

async function fetchCoinsLimitOffset(limit: number, offset: number = 0) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/assets?limit=${limit}&offset=${offset}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching coins:", error);
    throw error;
  }
}

async function fetchCoinsNoLimit() {
  try {
    const response = await fetch(`${API_BASE_URL}/assets`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching coins:", error);
    throw error;
  }
}

async function fetchCoin(id: string | undefined) {
  try {
    const response = await fetch(`${API_BASE_URL}/assets/${id}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching coin:", error);
    throw error;
  }
}

async function fetchCoinHistory(id: string | undefined) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/assets/${id}/history?interval=h6`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching coins:", error);
    throw error;
  }
}

export {
  fetchCoinsLimitOffset,
  fetchCoinsNoLimit,
  fetchCoin,
  fetchCoinHistory,
};
