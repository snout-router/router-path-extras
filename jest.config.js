import config from "@snout/jest-config";

export default {
  ...config,
  transform: {
    "\\.tsx?$": ["ts-jest", { tsconfig: "test/tsconfig.json" }],
  },
};
