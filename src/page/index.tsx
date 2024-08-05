import { TwitterOutlined, YoutubeOutlined } from "@ant-design/icons";
import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { Layout, Menu, Row } from "antd";
import {GenerationPage } from "./Generation";
import { TestsPage } from "./Tests";
import { clientRoutes } from "src/routes/client";
import { SiderStyled } from "./style"
import { MENU_ITEMS } from "src/constants";
import "src/styles/index.css";

export const Page = observer((): JSX.Element => {
  const { Content, Sider } = Layout;

  const navigate = useNavigate();

  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout style={{ height: "100vh" }}>
      <SiderStyled
        width={250}
        breakpoint="lg"
        collapsedWidth="0"
        style={{backgroundColor: "#1A3262" }}
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}>
        <Row justify="center" style={{ height: 64, alignItems: "center" }}>
           <img src="https://i.yapx.ru/W2oMO.png" width={50} height={50} />
        </Row>
        <Menu
          mode="inline"
          selectedKeys={[location.pathname]}
          items={MENU_ITEMS}
          onClick={(info) => navigate(info.key)}
          style={{
            fontSize: 18,
            fontWeight: 600,
            height: "100%",
            backgroundColor: "#1A3262",
            color: "white"
          }}
        />
      </SiderStyled>
      <Layout>
        <Content
          style={{
            padding: 24,
            minHeight: 280,
            overflow: "auto",
            backgroundColor: "#395283"
          }}>
          <Routes>
            <Route path={clientRoutes.generation} element={<GenerationPage />} />
            <Route path={clientRoutes.tests} element={<TestsPage />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
});
