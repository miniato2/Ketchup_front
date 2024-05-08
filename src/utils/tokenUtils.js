import jwt_decode from "jwt-decode";

export function decodeJwt(token) {

    if(token === null) return null;

    return jwt_decode(token);
};

export function getDepartmentFromToken(token) {
    if (!token) return null;
    try {
        const decodedToken = jwt_decode(token);
        return decodedToken.dptNo;
    } catch (error) {
        console.error("Error decoding token:", error);
        return null;
    }
}