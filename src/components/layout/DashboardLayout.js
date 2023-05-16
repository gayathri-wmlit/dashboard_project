import { useEffect, useState } from "react";
import { Button, Layout, Menu, theme ,ConfigProvider} from "antd";
import Link from "next/link";
import { createFromIconfontCN } from "@ant-design/icons";
import React from "react";

import { useSelector } from "react-redux";
import { useRouter } from "next/router";

const { Header, Content, Footer, Sider } = Layout;

const IconFont = createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js",
});

const DashboardLayout = ({ children }) => {
  const [current, setCurrent] = useState("0");
  const router = useRouter();
  const selectedKeys = [router.pathname];

  const handleMenuClick = ({ key }) => {
    router.push(key);
  };

  const { accessToken } = useSelector((state) => state.user);

  console.log(accessToken, "accessToken");
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout hasSider>
      <Sider 
     
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
          
        }}
      >
        <div>
          <img
            style={{ paddingBottom: "25px", paddingTop: "20px" }}
            src="https://www.agnicart.com/static/images/logo/agni-cart.png"
          />
        </div>
        <Menu
         onClick={handleMenuClick} selectedKeys={selectedKeys}
         theme="dark"
         mode="inline"
         style={{backgroundColor:'#001529'}}
        >
          <Menu.Item key="/dashboard/billing" >
          Billing <IconFont type="icon-bill-o" />{" "}
          </Menu.Item>
          <Menu.Item key="/dashboard/live-stores" >Live Stores</Menu.Item>
          <Menu.Item key="/dashboard/store-orders">Store Orders</Menu.Item>
       
        </Menu>
      </Sider>
      <Layout className="site-layout" style={{ marginLeft: 200 }}>
      <ConfigProvider theme="dark"   mode="inline">
        <Header style={{ padding: 0,backgroundColor:'#001529' }}>
       
          <h1 style={{ textAlign: "center", fontSize: "20px",color:'white' }}>
            <b>Dashboard</b>
          </h1>
         
        </Header>
        </ConfigProvider>

        <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
          <div
            style={{
              padding: 24,
              textAlign: "center",
              background: colorBgContainer,
            }}
          >
            {children}
          </div>
        </Content>
        
      </Layout>
    </Layout>
  );
};
export default DashboardLayout;
