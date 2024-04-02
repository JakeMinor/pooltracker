import PocketBase from "pocketbase";

const pocketbase = new PocketBase(import.meta.env.VITE_DATABASE_URL)

export { pocketbase }