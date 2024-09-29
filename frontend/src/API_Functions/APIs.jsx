import axios from "axios";

const api = process.env.REACT_APP_ADMIN_API_URL;

export async function fetchBooks() {
  try {
    const response = await axios.get(`${api}fetchBooks`);
    return response.data;
  } catch (error) {
    console.error("fetchBooks() error:", error);
    if (
      error.response &&
      (error.response.status === 400 ||
        error.response.status === 401 ||
        error.response.status === 404)
    ) {
      throw error.response.data;
    }
  }
}

export async function fetchUsers() {
  try {
    const response = await axios.get(`${api}fetchUsers`);
    return response.data;
  } catch (error) {
    console.error("fetchUsers() error:", error);
    if (
      error.response &&
      (error.response.status === 400 ||
        error.response.status === 401 ||
        error.response.status === 404)
    ) {
      throw error.response.data;
    }
  }
}

export async function addUser(data) {
  try {
    const response = await axios.post(`${api}addUser`, data);
    return response.data;
  } catch (error) {
    console.error("addUser() error:", error);
    if (
      error.response &&
      (error.response.status === 400 || error.response.status === 401)
    ) {
      throw error.response.data;
    }
  }
}

export async function addBook(data) {
  try {
    const response = await axios.post(`${api}addBook`, data);
    return response.data;
  } catch (error) {
    console.error("addBook() error:", error);
    if (
      error.response &&
      (error.response.status === 400 || error.response.status === 401)
    ) {
      throw error.response.data;
    }
  }
}

export async function searchBook(data) {
  try {
    const response = await axios.post(`${api}searchBook`, data);
    return response.data;
  } catch (error) {
    console.error("searchBook() error:", error);
    if (
      error.response &&
      (error.response.status === 400 ||
        error.response.status === 401 ||
        error.response.status === 404)
    ) {
      throw error.response.data;
    }
  }
}

export async function searchBooksByRentRange(data) {
  try {
    const response = await axios.post(`${api}searchBookWithRange`, data);
    return response.data;
  } catch (error) {
    console.error("searchBooksByRentRange() error:", error);
    if (
      error.response &&
      (error.response.status === 400 || error.response.status === 401)
    ) {
      throw error.response.data;
    }
  }
}

export async function filterBooks(data) {
  try {
    const response = await axios.post(`${api}filterBooks`, data);
    return response.data;
  } catch (error) {
    console.error("filterBooks() error:", error);
    if (
      error.response &&
      (error.response.status === 400 ||
        error.response.status === 401 ||
        error.response.status === 404)
    ) {
      throw error.response.data;
    }
  }
}

export async function issueBook(data) {
  try {
    const response = await axios.post(`${api}issueBook`, data);
    return response.data;
  } catch (error) {
    console.error("issueBook() error:", error);
    if (
      error.response &&
      (error.response.status === 400 ||
        error.response.status === 401 ||
        error.response.status === 404)
    ) {
      throw error.response.data;
    }
  }
}

export async function returnBook(data) {
  try {
    const response = await axios.post(`${api}returnBook`, data);
    return response.data;
  } catch (error) {
    console.error("returnBook() error:", error);
    if (
      error.response &&
      (error.response.status === 400 ||
        error.response.status === 401 ||
        error.response.status === 404)
    ) {
      throw error.response.data;
    }
  }
}

export async function getBookHistory(data) {
  try {
    const response = await axios.post(`${api}getTransactionByBook`, data);
    return response.data;
  } catch (error) {
    console.error("getBookHistory() error:", error);
    if (
      error.response &&
      (error.response.status === 400 ||
        error.response.status === 401 ||
        error.response.status === 404)
    ) {
      throw error.response.data;
    }
  }
}

export async function searchBookRent(data) {
  try {
    const response = await axios.post(`${api}getTotalGenRentByBook`, data);
    return response.data;
  } catch (error) {
    console.error("getTotalGenerated() error:", error);
    if (
      error.response &&
      (error.response.status === 400 ||
        error.response.status === 401 ||
        error.response.status === 404)
    ) {
      throw error.response.data;
    }
  }
}

export async function getUserHistory(data) {
  try {
    const response = await axios.post(`${api}getUserIssuedBooks`, data);
    return response.data;
  } catch (error) {
    console.error("getUserHistory() error:", error);
    if (
      error.response &&
      (error.response.status === 400 ||
        error.response.status === 401 ||
        error.response.status === 404)
    ) {
      throw error.response.data;
    }
  }
}

export async function getTransactionsByDateRange(data) {
  try {
    const response = await axios.post(`${api}getTransactionHistoryByDate`, data);
    return response.data;
  } catch (error) {
    console.error("getTransactionsByDateRange() error:", error);
    if (
      error.response &&
      (error.response.status === 400 ||
        error.response.status === 401 ||
        error.response.status === 404)
    ) {
      throw error.response.data;
    }
  }
}
