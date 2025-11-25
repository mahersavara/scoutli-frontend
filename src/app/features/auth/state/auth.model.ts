export interface AuthState {
    token: string | null;
    user: any | null; // Replace 'any' with your User interface
}

export function createInitialState(): AuthState {
    return {
        token: null,
        user: null
    };
}
