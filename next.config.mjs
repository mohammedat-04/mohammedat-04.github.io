const repository = process.env.GITHUB_REPOSITORY ?? "";
const repositoryName = repository.split("/")[1] ?? "";
const isUserSite = repositoryName === "mohammedat-04.github.io";
const shouldUseBasePath = Boolean(process.env.GITHUB_ACTIONS && repositoryName && !isUserSite);
const basePath = shouldUseBasePath ? `/${repositoryName}` : "";

const nextConfig = {
  output: "export",
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  ...(basePath
    ? {
        basePath,
        assetPrefix: `${basePath}/`,
      }
    : {}),
};

export default nextConfig;
