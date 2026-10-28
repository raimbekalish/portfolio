import { duplicateSubmit, staleSearch, withRun } from "../../content/reproseed";
import { duplicateSubmitRun, staleSearchRun } from "../../content/reproseed-run";

/** The two verified examples with their recorded runs. Duplicate submit leads; stale search follows. */
export const duplicate = withRun(duplicateSubmit, duplicateSubmitRun);
export const stale = withRun(staleSearch, staleSearchRun);
export const examples = [duplicate, stale];
