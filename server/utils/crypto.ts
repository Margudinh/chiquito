import crypto from "crypto";

export const hashContent = (
  content: Buffer | string,
  method: string = "sha256"
): string => {
  const hash = crypto.createHash(method);
  return hash.update(content).digest("hex");
};
