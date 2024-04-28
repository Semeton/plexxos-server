import "dotenv/config";

const config = {
  db: {
    live_url: process.env.LIVE_URL,
    local_url: process.env.LOCAL_URL,
  },
};

export default config;
