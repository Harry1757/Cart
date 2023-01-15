import { rest } from "msw";

const UserData = {
  id: 1,
  grade: "비회원",
  numberOfPurchases: 0,
  bucketList: [],
};

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
        {
          id: 2,
          brand: "가까이 유니언즈",
          name: "원턱 와이드 스웨트팬츠 그레이",
          originPrice: 52000,
          price: 34800,
          rate: "5",
          gaveRatePeople: 133549,
          url: "https://image.msscdn.net/images/goods_img/20210906/2112059/2112059_1_500.jpg?t=20210909113606",
        },
        {
          id: 3,
          brand: "토피",
          name: "와이드 데님 팬츠 (LIGHT BLUE)",
          originPrice: 49000,
          price: 36500,
          rate: "5",
          gaveRatePeople: 127745,
          url: "https://image.msscdn.net/images/goods_img/20180914/858911/858911_6_500.jpg?t=20220628150414",
        },
        {
          id: 4,
          brand: "제로",
          name: "Deep One Tuck Sweat Pants [Grey]",
          originPrice: 39000,
          price: 35100,
          rate: "4",
          gaveRatePeople: 173781,
          url: "https://image.msscdn.net/images/goods_img/20200818/1551840/1551840_1_500.jpg?t=20200818161624",
        },
        {
          id: 5,
          brand: "우알롱",
          name: "원턱 와이드 스웨트팬츠 그레이",
          originPrice: 79000,
          price: 67150,
          rate: "5",
          gaveRatePeople: 1379,
          url: "https://image.msscdn.net/images/goods_img/20220519/2569078/2569078_1_500.jpg?t=20220519021953",
        },
      ])
    );
  }),

  rest.get("/user", (req, res, ctx) => {
    return res(ctx.json(UserData));
  }),

  rest.post("/user/save/item", (req: any, res, ctx) => {
    const saveData = req.body?.itemList;
    UserData.bucketList = UserData.bucketList.concat(saveData);
    return res(ctx.json(UserData));
  }),
];
