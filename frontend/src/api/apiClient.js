/**
 * ============================================================
 * SignSync
 *
 * Central Axios Client
 *
 * This module creates a single Axios instance that is shared
 * across the entire application.
 *
 * All backend communication should go through this client.
 *
 * Features
 * --------
 * • Base URL configuration
 * • Request timeout
 * • JSON headers
 * • Centralized error handling
 * • Easy authentication support (future)
 *
 * ============================================================
 */

import axios from "axios";

/**
 * ============================================================
 * Backend Base URL
 * ============================================================
 *
 * Uses the environment variable if provided.
 * Falls back to localhost during development.
 */

const BASE_URL =
    import.meta.env.VITE_API_BASE_URL ||
    "http://127.0.0.1:8000";

/**
 * ============================================================
 * Axios Instance
 * ============================================================
 */

const apiClient = axios.create({

    baseURL: BASE_URL,

    timeout: 30000,

    headers: {

        "Content-Type": "application/json",

        Accept: "application/json",

    },

});

/**
 * ============================================================
 * Request Interceptor
 * ============================================================
 *
 * Runs before every request.
 *
 * Useful later for:
 *
 * • JWT Tokens
 * • Refresh Tokens
 * • Logging
 * • Request IDs
 *
 */

apiClient.interceptors.request.use(

    (config) => {

        // Future:
        // const token = localStorage.getItem("token");
        //
        // if (token) {
        //     config.headers.Authorization = `Bearer ${token}`;
        // }

        return config;

    },

    (error) => Promise.reject(error)

);

/**
 * ============================================================
 * Response Interceptor
 * ============================================================
 *
 * Handles all API errors in one place.
 *
 */

apiClient.interceptors.response.use(

    (response) => response,

    (error) => {

        if (error.response) {

            console.error(
                "API Response Error:",
                error.response.status,
                error.response.data
            );

        }

        else if (error.request) {

            console.error(
                "Backend is unreachable."
            );

        }

        else {

            console.error(
                "Request Error:",
                error.message
            );

        }

        return Promise.reject(error);

    }

);

/**
 * ============================================================
 * Export
 * ============================================================
 */

export default apiClient;