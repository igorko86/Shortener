// At least eight characters, at least one uppercase letter, one lowercase letter and one number, max 30

export const formFormat = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,30}$/;
