import React from "react";
import { useGetProductList, useGetUserData } from "../react-query/productList";
import Image from "next/image";
import { Card, Popover, Rate } from "antd";
import styled from "@emotion/styled";
import {
  PlusCircleOutlined,
  CaretDownOutlined,
  CaretRightOutlined,
} from "@ant-design/icons";
import { useGradeList } from "../recoil/global";
const { Meta } = Card;

const ProductListStyle = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;
const RateStyle = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  & .gaveRatePeople {
    color: #fadb13;
    font-size: 12px;
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

const Grade = ({ price }: { price: number }) => {
  const gradeList = useGradeList();
  const userData = useGetUserData();

  return (
    <GradeStyle>
      {gradeList.map((grade, index) => (
        <div className="eachGrade">
          {userData.data?.grade === grade ? (
            <div>
              <CaretRightOutlined />
              {grade}
            </div>
          ) : (
            <div>{grade}</div>
          )}
          <div>
            {`${((price * (100 - index)) / 100).toLocaleString("ko-KR")}원`}
          </div>
        </div>
      ))}
    </GradeStyle>
  );
};
export const ProductData = () => {
  const productList = useGetProductList();
  return (
    <ProductListStyle>
      {!productList.isLoading ? (
        productList.data.map((productData: any, index: string) => (
          <Card
            key={index}
            hoverable
            style={{ width: 200, height: 350, position: "relative" }}
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
                  <div className="productName">{productData.name}</div>
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
                    content={<Grade price={productData.price} />}
                  >
                    <div>MEMBERSHIP PRICE</div>
                    <CaretDownOutlined />
                  </MemberShipStyle>
                  <RateStyle>
                    <Rate
                      disabled
                      defaultValue={productData.rate}
                      style={{ fontSize: 10 }}
                    />
                    <div className="gaveRatePeople">
                      {productData.gaveRatePeople.toLocaleString("ko-KR")}
                    </div>
                  </RateStyle>
                </PriceAndSizeStyle>
              }
            />
            <AddProductInBucketStyle
              onClick={() => {
                alert("dfs");
              }}
            />
          </Card>
        ))
      ) : (
        <></>
      )}
    </ProductListStyle>
  );
};
