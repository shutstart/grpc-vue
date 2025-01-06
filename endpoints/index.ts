export const BASIC_HOST = process.env.BASIC_HOST || "localhost";
export const BASIC_PORT = process.env.BASIC_PORT || "5001";

export const BASIC_DOMAIN = `${BASIC_HOST}:${BASIC_PORT}`;

console.log(`connecting to basic service on ${BASIC_DOMAIN}`);
