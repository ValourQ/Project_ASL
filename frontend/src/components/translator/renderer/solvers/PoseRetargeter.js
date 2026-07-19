import PoseContext from "../core/PoseContext";

import SpineSolver from "./SpineSolver";
import ShoulderSolver from "./ShoulderSolver";
import ArmSolver from "./ArmSolver";
import HandSolver from "./HandSolver";
import FingerSolver from "./FingerSolver";

export default class PoseRetargeter {

    constructor(vrm) {

        this.vrm = vrm;

        this.context = new PoseContext();

        this.spineSolver = new SpineSolver(vrm);
        this.shoulderSolver = new ShoulderSolver(vrm);
        this.armSolver = new ArmSolver(vrm);
        this.handSolver = new HandSolver(vrm);
        this.fingerSolver = new FingerSolver(vrm);

        this.solvers = [

            this.spineSolver,

            this.shoulderSolver,

            this.armSolver,

            this.handSolver,

            this.fingerSolver,

        ].filter(Boolean);

    }

    update(frame, delta = 1 / 60) {

        if (!frame) return;

        //
        // Build shared pose context
        //

        this.context.update(frame, delta);

        //
        // Run every solver
        //

        for (const solver of this.solvers) {

            if (!solver?.solve) continue;

            solver.solve(this.context);

        }

    }

    reset() {

        for (const solver of this.solvers) {

            solver.reset?.();

        }

    }

    dispose() {

        this.solvers.length = 0;

    }

}