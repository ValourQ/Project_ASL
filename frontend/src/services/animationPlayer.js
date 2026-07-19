/**
 * ============================================================
 * SignSync
 *
 * Animation Playback Engine
 *
 * Controls playback of runtime animation sequences.
 *
 * This service is completely independent of:
 *
 * • React
 * • Three.js
 * • UI
 *
 * It simply manages playback state.
 *
 * ============================================================
 */

class AnimationPlayer {

    constructor() {

        this.sequence = [];

        this.wordIndex = 0;

        this.frameIndex = 0;

        this.speed = 0.15;

        this.isPlaying = false;

        this.timer = null;

        this.onFrame = null;

        this.onWordChange = null;

        this.onFinish = null;

    }

    /**
     * ========================================================
     * Load Animation
     * ========================================================
     */

    load(sequence = []) {

        this.stop();

        this.sequence = sequence;

        this.wordIndex = 0;

        this.frameIndex = 0;

    }

    /**
     * ========================================================
     * Play
     * ========================================================
     */

    play() {

        if (this.isPlaying) {

            return;

        }

        if (!this.sequence.length) {

            return;

        }

        this.isPlaying = true;

        this.nextFrame();

    }

    /**
     * ========================================================
     * Pause
     * ========================================================
     */

    pause() {

        this.isPlaying = false;

        clearTimeout(this.timer);

    }

    /**
     * ========================================================
     * Stop
     * ========================================================
     */

    stop() {

        this.pause();

        this.wordIndex = 0;

        this.frameIndex = 0;

    }

    /**
     * ========================================================
     * Replay
     * ========================================================
     */

    replay() {

        this.stop();

        this.play();

    }

    /**
     * ========================================================
     * Playback Speed
     * ========================================================
     */

    setSpeed(speed = 1) {

        this.speed = speed;

    }

    /**
     * ========================================================
     * Current Word
     * ========================================================
     */

    currentWord() {

        return this.sequence[this.wordIndex];

    }

    /**
     * ========================================================
     * Current Frame
     * ========================================================
     */

    currentFrame() {

        const word = this.currentWord();

        if (!word) {

            return null;

        }

        return word.animation[this.frameIndex];

    }

    /**
     * ========================================================
     * Next Frame
     * ========================================================
     */

    nextFrame() {

        if (!this.isPlaying) {

            return;

        }

        const word = this.currentWord();

        if (!word) {

            this.finish();

            return;

        }

        const frame = this.currentFrame();

        if (this.onFrame) {

            this.onFrame(

                frame,

                this.frameIndex,

                this.wordIndex,

                word

            );

        }

        this.frameIndex++;

        if (this.frameIndex >= word.animation.length) {

            this.wordIndex++;

            this.frameIndex = 0;

            if (this.onWordChange) {

                this.onWordChange(

                    this.wordIndex,

                    word.word

                );

            }

        }

        if (this.wordIndex >= this.sequence.length) {

            this.finish();

            return;

        }

        this.timer = setTimeout(

            () => this.nextFrame(),

            33 / this.speed

        );

    }

    /**
     * ========================================================
     * Finish
     * ========================================================
     */

    finish() {

        this.pause();

        if (this.onFinish) {

            this.onFinish();

        }

    }

    /**
     * ========================================================
     * Progress
     * ========================================================
     */

    progress() {

        return {

            wordIndex: this.wordIndex,

            frameIndex: this.frameIndex,

            totalWords: this.sequence.length,

            currentWord: this.currentWord()?.word ?? null,

        };

    }

}

/**
 * ============================================================
 * Singleton
 * ============================================================
 */

const animationPlayer = new AnimationPlayer();

export default animationPlayer;