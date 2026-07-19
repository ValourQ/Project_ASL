/**
 * ============================================================
 * SignSync
 *
 * Text → Sign API
 *
 * This module contains every API request related to the
 * Text → Sign backend.
 *
 * Components should NEVER call Axios directly.
 *
 * Instead they should call these functions.
 *
 * ============================================================
 */

import apiClient from "./apiClient";

/**
 * ============================================================
 * API Endpoints
 * ============================================================
 */

const BASE_ENDPOINT = "/text-to-sign";

/**
 * ============================================================
 * Translate Text
 * ============================================================
 *
 * POST /text-to-sign/translate
 */

export async function translateText(text) {

    const response = await apiClient.post(

        `${BASE_ENDPOINT}/translate`,

        {
            text,
        }

    );

    return response.data;

}

/**
 * ============================================================
 * Runtime Information
 * ============================================================
 *
 * GET /text-to-sign/runtime
 */

export async function getRuntimeInformation() {

    const response = await apiClient.get(

        `${BASE_ENDPOINT}/runtime`

    );

    return response.data;

}

/**
 * ============================================================
 * Runtime Summary
 * ============================================================
 *
 * GET /text-to-sign/summary
 */

export async function getSummary() {

    const response = await apiClient.get(

        `${BASE_ENDPOINT}/summary`

    );

    return response.data;

}

/**
 * ============================================================
 * Supported Vocabulary
 * ============================================================
 *
 * GET /text-to-sign/supported-words
 */

export async function getSupportedWords() {

    const response = await apiClient.get(

        `${BASE_ENDPOINT}/supported-words`

    );

    return response.data;

}

/**
 * ============================================================
 * Health Check
 * ============================================================
 *
 * GET /text-to-sign/health
 */

export async function getHealth() {

    const response = await apiClient.get(

        `${BASE_ENDPOINT}/health`

    );

    return response.data;

}

/**
 * ============================================================
 * Default Export
 * ============================================================
 */

const textToSignApi = {

    translateText,

    getRuntimeInformation,

    getSummary,

    getSupportedWords,

    getHealth,

};

export default textToSignApi;