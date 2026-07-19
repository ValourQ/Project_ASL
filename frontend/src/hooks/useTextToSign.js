/**
 * ============================================================
 * SignSync
 *
 * Text → Sign Hook
 *
 * Centralized state management for the
 * Text → Sign feature.
 *
 * Handles:
 *
 * • Input Text
 * • Loading
 * • Errors
 * • Translation
 * • Animation Sequence
 * • Statistics
 * • Runtime Info
 *
 * ============================================================
 */

import { useCallback, useEffect, useState } from "react";
import animationPlayer from "../services/animationPlayer";
import textToSignApi from "../api/textToSignApi";

export default function useTextToSign() {

    /**
     * ========================================================
     * Input
     * ========================================================
     */

    const [text, setText] = useState("");

    /**
     * ========================================================
     * Loading
     * ========================================================
     */

    const [loading, setLoading] = useState(false);

    /**
     * ========================================================
     * Error
     * ========================================================
     */

    const [error, setError] = useState(null);

    /**
     * ========================================================
     * Translation Result
     * ========================================================
     */

    const [translation, setTranslation] = useState(null);

    /**
     * ========================================================
     * Animation Sequence
     * ========================================================
     */

    const [sequence, setSequence] = useState([]);

    /**
     * ========================================================
     * Statistics
     * ========================================================
     */

    const [statistics, setStatistics] = useState(null);

    /**
     * ========================================================
     * Runtime
     * ========================================================
     */

    const [runtime, setRuntime] = useState(null);

    /**
     * ========================================================
     * Runtime Summary
     * ========================================================
     */

    const [summary, setSummary] = useState(null);

    /**
     * ========================================================
     * Supported Vocabulary
     * ========================================================
     */

    const [supportedWords, setSupportedWords] = useState(0);

    /**
     * ========================================================
     * Translate
     * ========================================================
     */

    const translate = useCallback(async () => {

        if (!text.trim()) {

            setError("Please enter some text.");

            return;

        }

        try {

            setLoading(true);

            setError(null);

            const result =
                await textToSignApi.translateText(text);

            setTranslation(result);

            setSequence(result.sequence || []);

            setStatistics(result.statistics || null);

            animationPlayer.load(

                result.sequence || []

            );

            animationPlayer.play();

        }

        catch (err) {

            console.error(err);

            setError(

                err?.response?.data?.detail ||

                "Translation failed."

            );

        }

        finally {

            setLoading(false);

        }

    }, [text]);

    /**
     * ========================================================
     * Runtime
     * ========================================================
     */

    const loadRuntime = useCallback(async () => {

        try {

            const data =
                await textToSignApi.getRuntimeInformation();

            setRuntime(data);

        }

        catch (err) {

            console.error(err);

        }

    }, []);

    /**
     * ========================================================
     * Summary
     * ========================================================
     */

    const loadSummary = useCallback(async () => {

        try {

            const data =
                await textToSignApi.getSummary();

            setSummary(data);

        }

        catch (err) {

            console.error(err);

        }

    }, []);

    /**
     * ========================================================
     * Vocabulary
     * ========================================================
     */

    const loadSupportedWords =
        useCallback(async () => {

            try {

                const data =
                    await textToSignApi.getSupportedWords();

                setSupportedWords(

                    data.supported_words || 0

                );

            }

            catch (err) {

                console.error(err);

            }

        }, []);

    /**
     * ========================================================
     * Reset
     * ========================================================
     */

    function clearTranslation() {

        setTranslation(null);

        setSequence([]);

        setStatistics(null);

        setError(null);

    }

    /**
     * ========================================================
     * Load Runtime Data
     * ========================================================
     */

    useEffect(() => {

        loadRuntime();

        loadSummary();

        loadSupportedWords();

    }, [

        loadRuntime,

        loadSummary,

        loadSupportedWords

    ]);

    /**
     * ========================================================
     * Exports
     * ========================================================
     */

    return {

        text,

        setText,

        loading,

        error,

        translation,

        sequence,

        statistics,

        runtime,

        summary,

        supportedWords,

        translate,

        clearTranslation,

    };

}