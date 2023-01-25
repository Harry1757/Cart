import React, { useState, useEffect, useRef } from "react";
import {
  useGetBottomList,
  useGetUserData,
  useSaveItem,
} from "../react-query/productList";
import Image from "next/image";
import { Card, Popover, Rate, message, Popconfirm, Radio, Button } from "antd";
import styled from "@emotion/styled";
import {
  PlusCircleOutlined,
  CaretDownOutlined,
  CaretRightOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useGradeList } from "../recoil/global";
const { Meta } = Card;

interface Option {
  size: string;
  amount: number;
  id: number;
  info: any;
}

const ProductListStyle = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;
const RateStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  & .gaveRatePeople {
    color: #fadb13;
    font-size: 6px;
  }
`;
const PriceAndSizeStyle = styled.div`
  .originPrice {
    text-decoration-line: line-through;
    font-size: 10px;
  }
  .saledPrice {
    font-size: 12px;
    font-weight: bold;
    color: black;
  }
`;
const BrandAndNameStyle = styled.div`
  .brand {
    font-size: 11px;
  }
  .productName {
    overflow: scroll;
    scroll-behavior: smooth;
    font-size: 13px;
  }
`;

const MemberShipStyle = styled(Popover)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 10px;
`;

const AddProductInBucketStyle = styled(PlusCircleOutlined)`
  position: absolute;
  right: 10px;
  top: 20px;
  font-size: 20px;
  height: 0px !important;
  margin: 0px !important;
  color: #747474;
  &:hover {
    color: black !important;
  }
`;

const GradeStyle = styled.div`
  & .eachGrade {
    display: flex;
    justify-content: space-between;
    margin: 5px;
  }
`;
const OptionStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const CountStyle = styled.div`
  display: flex;
  justify-content: space-evenly;
  > button {
    height: 20px !important;
    width: 30px;
    font-size: 10px;
    padding: 0px;
  }
`;
const Savelist = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Option = ({
  reset,
  setSaveData,
  itemInfo,
}: {
  reset: boolean;
  setSaveData: any;
  itemInfo: any;
}) => {
  const [count, setCount] = useState<number>(0);
  const [size, setSize] = useState<string>("");
  const [saveList, setSaveList] = useState<Option[]>([]);
  const [id, setId] = useState<number>(0);

  useEffect(() => {
    setId(0);
    setCount(0);
    setSize("");
    setSaveList([]);
  }, [reset]);

  useEffect(() => {
    setSaveData(saveList);
  }, [saveList]);

  const handlePlusButton = () => {
    if (count === 10) return;
    setCount(count + 1);
  };

  const handleMinusButton = () => {
    if (count === 0) return;
    setCount(count - 1);
  };

  const handleSizeButton = (e: any) => {
    setSize(e.target.value);
  };

  const handleSaveButton = () => {
    if (count === 0) {
      message.info("1개이상 선택해주세요");
      return;
    }
    if (size === "") {
      message.info("사이즈를 선택해주세요");
      return;
    }
    setSaveList([
      { size: size, amount: count, id: id, info: itemInfo },
      ...saveList,
    ]);
    setId(id + 1);
    setCount(0);
    setSize("");
  };

  const handleRemoveitem = (removeId: number) => {
    const removeItemList = saveList.filter(
      (savedItem) => savedItem.id !== removeId
    );
    setSaveList(removeItemList);
  };
  return (
    <OptionStyle>
      <Radio.Group onChange={handleSizeButton} value={size}>
        <Radio.Button value="S">S</Radio.Button>
        <Radio.Button value="M">M</Radio.Button>
        <Radio.Button value="L">L</Radio.Button>
      </Radio.Group>
      <CountStyle>
        <div>{count}</div>
        <Button onClick={handlePlusButton}>+</Button>
        <Button onClick={handleMinusButton}>-</Button>
        <Button onClick={handleSaveButton}>저장</Button>
      </CountStyle>
      {saveList.map((savedItem, index) => (
        <Savelist key={index}>
          <DeleteOutlined onClick={() => handleRemoveitem(savedItem.id)} />
          <div>size: {savedItem.size}</div>
          <div>amount: {savedItem.amount}</div>
        </Savelist>
      ))}
    </OptionStyle>
  );
};

const Grade = ({ price, userData }: { price: number; userData: any }) => {
  const gradeList = useGradeList();

  return (
    <GradeStyle>
      {gradeList.map((grade, index) => (
        <div className="eachGrade" key={index}>
          {userData.data?.grade === grade ? (
            <div>
              <CaretRightOutlined />
              {grade}
            </div>
          ) : (
            <div>{grade}</div>
          )}
          <div>
            {`${Math.round((price * (100 - index)) / 100).toLocaleString(
              "ko-KR"
            )}원`}
          </div>
        </div>
      ))}
    </GradeStyle>
  );
};

export const ProductData = ({ productList }: { productList: any }) => {
  const [reset, setReset] = useState<boolean>(false);
  const [saveListUser, setSaveListUser] = useState<Option[]>([]);
  const userData = useGetUserData();
  const { mutate } = useSaveItem();
  const productNametest = useRef<any>([]);

  const confirm = () => {
    setReset(!reset);
    if (saveListUser.length === 0) {
      message.info("선택한 상품이 없습니다.");
      return;
    }
    mutate(saveListUser);
    message.info("장바구니에 넣었습니다.");
  };

  const cancel = () => {
    setReset(!reset);
  };

  const handleHoverProductName = (index: number) => {
    // let setData = 0;
    const maxScrollWidth = productNametest?.current[index]?.scrollWidth;
    productNametest?.current[index]?.scrollTo(maxScrollWidth, 0);

    // while (maxScrollWidth !== setData) {
    //   console.log(setData);
    //   if (setData + 1 > maxScrollWidth) {
    //     setData = maxScrollWidth;
    //   } else {
    //     setData = setData + 1;
    //   }
    //   productNametest?.current[index]?.scrollTo(setData, 0);
    // }
  };
  const handleremoveProductNameEvent = (index: number) => {
    productNametest?.current[index]?.scrollTo(0, 0);
  };

  return (
    <ProductListStyle>
      {!productList.isLoading ? (
        productList.data.map((productData: any, index: string) => (
          <Card
            key={index}
            hoverable
            style={{ width: 170, height: 350, position: "relative" }}
            cover={
              <Image
                src={productData.url}
                alt={productData.id}
                width={100}
                height={200}
              />
            }
          >
            <Meta
              title={
                <BrandAndNameStyle>
                  <div className="brand">{productData.brand}</div>
                  <div
                    className="productName"
                    onMouseOver={() => handleHoverProductName(index)}
                    onMouseLeave={() => handleremoveProductNameEvent(index)}
                    ref={(element) =>
                      (productNametest.current[index] = element)
                    }
                  >
                    {productData.name}
                  </div>
                </BrandAndNameStyle>
              }
              description={
                <PriceAndSizeStyle>
                  <div className="originPrice">
                    {productData.originPrice.toLocaleString("ko-KR")} 원
                  </div>
                  <div className="saledPrice">
                    {productData.price.toLocaleString("ko-KR")} 원
                  </div>

                  <MemberShipStyle
                    placement="bottom"
                    title={"MEMBERSHIP PRICE"}
                    content={
                      <Grade price={productData.price} userData={userData} />
                    }
                  >
                    <div>MEMBERSHIP PRICE</div>
                    <CaretDownOutlined />
                  </MemberShipStyle>
                  <RateStyle>
                    <Rate
                      disabled
                      defaultValue={productData.rate}
                      style={{ fontSize: 8 }}
                    />
                    <div className="gaveRatePeople">
                      {productData.gaveRatePeople.toLocaleString("ko-KR")}
                    </div>
                  </RateStyle>
                </PriceAndSizeStyle>
              }
            />
            <Popconfirm
              placement="bottom"
              title={"장바구니에 넣겠습니까?"}
              description={
                <Option
                  reset={reset}
                  setSaveData={setSaveListUser}
                  itemInfo={productData}
                />
              }
              onConfirm={confirm}
              onCancel={cancel}
              okText="Yes"
              cancelText="No"
            >
              <AddProductInBucketStyle />
            </Popconfirm>
          </Card>
        ))
      ) : (
        <></>
      )}
    </ProductListStyle>
  );
};
