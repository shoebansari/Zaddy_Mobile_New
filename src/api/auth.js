"use client";

import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BASE_URL = "https://api.zaddycare.in/api";


export const isLoggedIn = async () => {
  try {
    const token = await AsyncStorage.getItem("loginDetails");
    return token !== null;
  } catch (error) {
    console.error("Error checking login status:", error);
    return false;
  }
};

export const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem("token");
    return token;
  } catch (error) {
    console.error("Failed to get token from AsyncStorage:", error);
    return null;
  }
};

export const getUserId = async () => {
  try {
    const loginDetails = await AsyncStorage.getItem('loginDetails');
    if (loginDetails) {
      const parsed = JSON.parse(loginDetails);
      return parsed.userId || null;
    }
    return null;
  } catch (error) {
    console.error("Error getting user ID:", error);
    return null;
  }
};


export const getRequest = async (endpoint) => {
  const token = await getToken();

  if (!token) {
    throw new Error("No token found");
  }

  const response = await axios.get(`${BASE_URL}${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const postRequestWithData = async (endpoint, data = {}) => {
  try {
    const response = await axios.post(
      `${BASE_URL}${endpoint}`,
      data || {},
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("API Call Failed:", error.response?.data || error.message);
    throw error;
  }
};

export const getRequestNoToken = async (endpoint) => {
  const response = await axios.get(`${BASE_URL}${endpoint}`, {
  });

  return response.data;
};

export const postRequest = async (endpoint, data) => {
  const response = await axios.post(`${BASE_URL}${endpoint}`, data);
  return response.data;
};

export const postRequestWithToken = async (endpoint, data) => {
  try {
    const token = await getToken(); 
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const response = await axios.post(`${BASE_URL}${endpoint}`, data, {
      headers,
    });
    return response.data;
  } catch (error) {
    console.error("API Call Failed:", error.response?.data || error.message);
    throw error;
  }
};
export const postRequestWithParams = async (endpoint, data) => {
  try {
    const queryString = new URLSearchParams(data).toString();
    const response = await axios.post(`${BASE_URL}${endpoint}?${queryString}`);
    return response.data;
  } catch (error) {
    console.error(" API Call Failed:", error.response?.data || error.message);
    throw error;
  }
};

export const getRequestWithParams = async (endpoint, params) => {
  try {
    const queryString = new URLSearchParams(params).toString();
    const response = await axios.get(`${BASE_URL}${endpoint}?${queryString}`);
    return response.data;
  } catch (error) {
    console.error('GET API Call Failed:', error.response?.data || error.message);
    throw error;
  }
};

export const getRequestUserId = async (endpoint) => {
  try {
    const token = await getToken();
    if (!token) {
      throw new Error("No token found");
    }
    const userId = await getUserId(); 

    const response = await axios.get(
      `${BASE_URL}${endpoint}?userId=${userId}`, 
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(" API Call Failed:", error);
    throw error;
  }
};
export const postCreate = async (endpoint, data) => {
  const token = getToken();
  if (!token) {
    throw new Error("No token found");
  }
  const dataWitCreatedBy = {
    ...data,
    createdBy: await getUserId()
  };
  const response = await axios.post(
    `${BASE_URL}${endpoint}`,
    dataWitCreatedBy,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};


export const postSetup = async (endpoint, data) => {
  const dataWitCreatedBy = {
    ...data,
  };

  const response = await axios.post(`${BASE_URL}${endpoint}`, dataWitCreatedBy);
  return response.data;
};

export const postUpdate = async (endpoint, data) => {
  const token = getToken();
  if (!token) {
    throw new Error("No token found");
  }

  const dataWithUpdatedBy = {
    ...data,
    updatedBy: getUserId(),
  };

  const response = await axios.post(
    `${BASE_URL}${endpoint}`,
    dataWithUpdatedBy,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const postCreateWithUpdatedBy = async (endpoint, data) => {
  const token = getToken();
  const userId = await  getUserId();

  if (!token) {
    throw new Error("No token found");
  }

  if (!userId) {
    throw new Error("User ID is missing");
  }

  const finalPayload = {
      ...data,
      userId,
      updatedBy: userId,

  };

  const response = await axios.post(`${BASE_URL}${endpoint}`, finalPayload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

