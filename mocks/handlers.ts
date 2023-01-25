import { rest } from "msw";

const UserData = {
  id: 1,
  grade: "비회원",
  numberOfPurchases: 0,
  bucketList: [],
};

export const handlers = [
  // Handles a GET /user request
  rest.get("/TopList", (req, res, ctx) => {
    return res(
      ctx.json([
        {
          id: 6,
          brand: "수아레",
          name: "워셔블 하찌 니트 - 11 COLOR",
          originPrice: 59000,
          price: 39900,
          rate: "5",
          gaveRatePeople: 17327,
          url: "https://image.msscdn.net/images/goods_img/20220303/2396645/2396645_4_500.jpg?t=20220930095511",
        },
        {
          id: 7,
          brand: "키뮤어",
          name: "코튼 워셔블 하찌 하프집업 니트_5 COLOR",
          originPrice: 69000,
          price: 56900,
          rate: "5",
          gaveRatePeople: 10651,
          url: "https://image.msscdn.net/images/goods_img/20220807/2702396/2702396_16734042163511_500.jpg?t=20230111113020",
        },
        {
          id: 8,
          brand: "수아레",
          name: "[리뉴얼] 하프 터틀넥 니트 세트",
          originPrice: 66000,
          price: 39900,
          rate: "4",
          gaveRatePeople: 25088,
          url: "https://image.msscdn.net/images/goods_img/20200821/1558847/1558847_13_500.jpg?t=20221012135738",
        },
        {
          id: 9,
          brand: "이에스엔",
          name: "[세트] 하프 폴라 니트 티셔츠",
          originPrice: 78000,
          price: 35100,
          rate: "4",
          gaveRatePeople: 60221,
          url: "https://image.msscdn.net/images/goods_img/20171025/659554/659554_6_500.jpg?t=20220901142614",
        },
        {
          id: 10,
          brand: "드로우핏",
          name: "[드로우핏X깡스타일리스트] 터틀넥 니트 티셔츠",
          originPrice: 60000,
          price: 43900,
          rate: "5",
          gaveRatePeople: 13390,
          url: "https://image.msscdn.net/images/goods_img/20210917/2139144/2139144_5_500.jpg?t=20220902141532",
        },
      ])
    );
  }),
  rest.get("/BottomList", (req, res, ctx) => {
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
