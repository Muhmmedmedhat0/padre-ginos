import fastify from "fastify";
import fastifyStatic from "@fastify/static";
import path from "path";
import { fileURLToPath } from "url";

// Import route modules
import pizzaRoutes from "./routes/pizza.js";
import orderRoutes from "./routes/order.js";
import contactRoutes from "./routes/contact.js";

const server = fastify({
  logger: {
    transport: {
      target: "pino-pretty",
    },
  },
});

const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Static files
server.register(fastifyStatic, {
  root: path.join(__dirname, "public"),
  prefix: "/public/",
});

// Register routes
server.register(pizzaRoutes);
server.register(orderRoutes);
server.register(contactRoutes);

const start = async () => {
  try {
    await server.listen({ port: PORT });
    console.log(`Server listening on port ${PORT}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();
