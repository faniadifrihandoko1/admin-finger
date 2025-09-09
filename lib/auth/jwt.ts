import { jwtVerify } from "jose";

export interface JwtPayload {
  UserName: string;
  EmployeeId: string;
  EmployeeName: string;
  EmployeePhoto: string;

  CutomerId: string;
  UserAccountId: string;
  exp: number;
  iss: string;
}

const JWT_SECRET =
  process.env.JWT_SECRET || "supersecretkeyAltiusyangpanjangbanget123";
export async function verifyToken(token: string): Promise<JwtPayload | null> {
  try {
    const secret = new TextEncoder().encode(JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);

    return payload as unknown as JwtPayload;
  } catch {
    console.log("error verify");

    return null;
  }
}

export function getUserFromClient(): JwtPayload | null {
  try {
    const user = localStorage.getItem("user");
    if (!user) return null;

    return JSON.parse(user);
  } catch {
    return null;
  }
}
