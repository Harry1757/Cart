import React, { useState } from "react";
import styled from "@emotion/styled";
import { UserData } from "./userData";
import { ProductData } from "./productData";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme, Avatar, Badge } from "antd";
import { FaTshirt } from "react-icons/fa";
import { GiArmoredPants } from "react-icons/gi";
import {
  useGetUserData,
  useGetTopList,
  useGetBottomList,
} from "../react-query/productList";

const { Header, Sider, Content } = Layout;

const ProductListBackground = styled(Layout)`
  width: 100%;
  height: 100%;

  & .anticon[tabindex]:hover {
    color: #3b3b3b !important;
  }
  & .anticon[tabindex] {
    height: 32px;
    margin: 16px;
    background: rgba(255, 255, 255, 0.3);
    display: flex;
    align-items: center;
    color: #8a8a8a !important;
  }
  & .ant-layout-sider {
    background: #3b3b3b !important;
  }
  & .ant-menu-inline {
    background: #3b3b3b !important;
  }
  & .ant-menu-item-selected {
    background-color: #8a8a8a !important;
  }
  & .ant-menu-dark {
    background: #3b3b3b !important;
  }
  & .ant-menu-item:not(.ant-menu-item-selected):active {
    background-color: #8a8a8a !important;
  }
`;

const WishBucket = styled.div`
  margin: 20px;
`;

export const StoreMainPage = () => {
  const userData = useGetUserData();
  const bottomData = useGetBottomList();
  const topData = useGetTopList();
  const [collapsed, setCollapsed] = useState(false);
  const [tab, SetTab] = useState("1");
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleClickMenu = (e: any) => {
    SetTab(e.key);
  };

  return (
    <ProductListBackground>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          onClick={handleClickMenu}
          items={[
            {
              key: "1",
              icon: <FaTshirt />,
              label: "top",
            },
            {
              key: "2",
              icon: <GiArmoredPants />,
              label: "bottom",
            },
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed),
            }
          )}
          <WishBucket>
            <Badge count={userData.data?.bucketList.length}>
              <Avatar shape="square" icon={<ShoppingCartOutlined />} />
            </Badge>
          </WishBucket>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: "100vh",
            background: colorBgContainer,
            color: "pink",
          }}
        >
          {tab === "1" ? (
            <ProductData productList={topData} />
          ) : (
            <ProductData productList={bottomData} />
          )}
        </Content>
      </Layout>
    </ProductListBackground>
  );
};
