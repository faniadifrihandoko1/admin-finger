// src/lib/auth-utils.ts
export const normalizePath = (pathname: string, locales: string[]): string => {
  const parts = pathname.split("/").filter(Boolean);

  // Remove locale
  if (locales.includes(parts[0])) {
    parts.shift();
  }

  return parts.length > 0 ? `/${parts.join("/")}` : "/";
};

export const isPathAllowed = (
  path: string,
  allowedPaths: string[]
): boolean => {
  const normalizedPath = path.toLowerCase();

  return allowedPaths.some((allowedPath) => {
    const normalizedAllowed = allowedPath.toLowerCase();

    // Exact match
    if (normalizedAllowed === normalizedPath) return true;

    // Wildcard match (e.g., /products/*)
    if (normalizedAllowed.endsWith("/*")) {
      const basePath = normalizedAllowed.slice(0, -2);
      return normalizedPath.startsWith(basePath);
    }

    return false;
  });
};
