export const apiVersion = process.env.SANITY_API_VERSION ||
  "2023-06-28";

export const dataset = assertValue(
  process.env.EXPO_PUBLIC_SANITY_DATASET || "production",
  "Missing environment variable: SANITY_DATASET",
);

export const projectId = assertValue(
  process.env.EXPO_PUBLIC_SANITY_PROJECT_ID || "jglu2ssy",
  "Missing environment variable: SANITY_PROJECT_ID",
);

export const token = assertValue(
  process.env.EXPO_PUBLIC_SANITY_API_WRITE_TOKEN ||
    "sklTv9iZR16cZfHt89zuOOFwwnsgc0iAR1jiX1bYFzT1RW4Mal2fy8PWjmfw0cGCN0PqFeGo9AzGIO1dHz6SjZd0CADbyBhWgPj9MaCf0S9UzZgE1LgcQvFf9Bq4QXXovsTLGanbdAAzFPg2sMY3nA66e8oNf5Dd6X2M9M5jvVICCEWGEbWe",
  "Missing environment variable: SANITY_API_WRITE_TOKEN",
);

export const useCdn = false;

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage);
  }

  return v;
}
