import { rest } from "msw";

export const handlers = [
  // Handles a GET /user request
  rest.get("/productList", (req, res, ctx) => {
    return res(
      ctx.json([
        {
          id: 1,
          brand: "토피",
          name: "와이드 데님 팬츠",
          originPrice: 49500,
          price: 36500,
          rate: "4",
          gaveRatePeople: 53453,
          url: "https://image.msscdn.net/images/goods_img/20181025/890338/890338_8_500.jpg?t=20220628150451",
        },
      ])
    );
  }),
  rest.get("/user", (req, res, ctx) => {
    return res(
      ctx.json({
        id: 1,
        grade: "비회원",
        numberOfPurchases: 0,
        bucketList: [],
      })
    );
  }),
];
