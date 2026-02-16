import { AsyncDatabase } from "promised-sqlite3";

const db = await AsyncDatabase.open("./pizza.sqlite");

export default db;
