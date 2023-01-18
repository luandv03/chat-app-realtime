/* eslint-disable @typescript-eslint/ban-types */
import { useCallback, useState } from "react";

type Status = "idle" | "pending" | "resolved" | "rejected";

export function useAsync<IPayload = unknown>({
    asyncFunction,
    onResolve,
    onReject,
    delay = 0,
}: {
    asyncFunction: (payload?: IPayload) => Promise<unknown>;
    onResolve?: (value: unknown) => void;
    onReject?: (error: unknown) => void;
    delay?: number;
}) {
    const [status, setStatus] = useState<Status>("idle");

    const execute = useCallback(
        (payload: IPayload) => {
            setStatus("pending");
            const timeStart = Date.now();

            asyncFunction(payload)
                .then((data) => {
                    const timeElapsed = Date.now() - timeStart;
                    if (timeElapsed < delay) {
                        setTimeout(() => {
                            setStatus("resolved");
                            onResolve?.(data);
                        }, delay - timeElapsed);
                    } else {
                        setStatus("resolved");
                        onResolve?.(data);
                    }
                })
                .catch((error) => {
                    const timeElapsed = Date.now() - timeStart;
                    if (timeElapsed < delay) {
                        setTimeout(() => {
                            setStatus("rejected");
                            onReject?.(error);
                        }, delay - timeElapsed);
                    } else {
                        setStatus("rejected");
                        onReject?.(error);
                    }
                });
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [asyncFunction, onResolve, onReject]
    );

    return [execute, status] as const;
}
