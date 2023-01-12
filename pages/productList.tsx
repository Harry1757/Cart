import React, { useState } from "react";
import { useGetProductList } from "../react-query/productList";
import styled from "@emotion/styled";
import { UserData } from "./userData";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme, Avatar, Badge } from "antd";
import { FaTshirt } from "react-icons/fa";
import { GiArmoredPants } from "react-icons/gi";
const { Header, Sider, Content } = Layout;

const ProductListBackground = styled(Layout)`
  background-color: pink;
  width: 100%;
  height: 100%;

  & .anticon[tabindex]:hover {
    color: #1890ff;
  }
  & .anticon[tabindex] {
    height: 32px;
    margin: 16px;
    background: rgba(255, 255, 255, 0.3);
    display: flex;
    align-items: center;
  }
`;

const WishBucket = styled.div`
  margin: 20px;
`;

export const ProductList = () => {
  const { data, isError, isLoading } = useGetProductList();
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
            <Badge count={1}>
              <Avatar shape="square" icon={<UserOutlined />} />
            </Badge>
          </WishBucket>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            color: "pink",
          }}
        >
          {tab === "1" ? <UserData /> : <>sdfa</>}
        </Content>
      </Layout>
    </ProductListBackground>
  );
};
