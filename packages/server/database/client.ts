import { Sequelize } from "sequelize";

export const databaseClient = new Sequelize(Bun.env?.POSTGRES_CONNECTION_URL || "");
