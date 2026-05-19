// This file is loaded via --import flag by tsx BEFORE any other module
// It ensures .env.local is loaded before ioredis/BullMQ initialize their connections
import { config } from "dotenv";
config({ path: ".env.local" });
config({ path: ".env" });
