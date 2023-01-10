import { rest } from "msw";

export const handlers = [
  // Handles a GET /user request
  rest.get("/users", (req, res, ctx) => {
    return res(
      ctx.json([
        { id: 1, name: "asdf" },
        { id: 2, name: "saf" },
      ])
    );
  }),
];
