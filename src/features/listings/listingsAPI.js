import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8080";

const api = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

const formatLocalDate = (date) => {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const dd = String(date.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
};

export const fetchListingsByPriceDiffAPI = async ({
  days = 1,
  limit = 10,
  order = "desc",
} = {}) => {
  const endDate = new Date(); // local time
  const startDate = new Date();
  startDate.setDate(endDate.getDate() - days);

  const params = {
    start_date: formatLocalDate(startDate),
    end_date: formatLocalDate(endDate),
    limit,
    order,
  };

  const response = await api.get("/api/listings", { params });
  return response.data;
};

