interface SerializedError {
    name?: string;
    message?: string;
    code?: string;
    stack?: string;
}

export interface PendingAction<ThunkArg> {
    type: string;
    payload: undefined;
    meta: {
        requestId: string;
        arg: ThunkArg;
    };
}

export interface FulfilledAction<ThunkArg, PromiseResult> {
    type: string;
    payload: PromiseResult;
    meta: {
        requestId: string;
        arg: ThunkArg;
    };
}

export interface RejectedAction<ThunkArg> {
    type: string;
    payload: undefined;
    error: SerializedError | any;
    meta: {
        requestId: string;
        arg: ThunkArg;
        aborted: boolean;
        condition: boolean;
    };
}
