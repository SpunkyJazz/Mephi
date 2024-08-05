import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { Layout, Menu } from "antd";
import { GenerationPage } from "./pages/Generation";
import { TestsPage } from "./pages/Tests";
import { EditPage } from "./pages/Tests/edit";
import { clientRoutes } from "src/routes/client";
import { MENU_ITEMS } from "src/constants";
import { AppStyled, AppWrapper } from "./AppStyle";
import "src/styles/index.css";

export const App = observer((): JSX.Element => {
  const { Content, Header } = Layout;

  const location = useLocation();
  const navigate = useNavigate();

  return (
    <AppWrapper>
      <AppStyled>
        <Layout>
          <Header style={{ display: "flex", alignItems: "center" }}>
            <img src="https://i.yapx.ru/W2oMO.png" width={50} height={50} />
            <Menu
              theme="dark"
              mode="horizontal"
              selectedKeys={[location.pathname]}
              items={MENU_ITEMS}
              style={{ flex: 1, minWidth: 0 }}
              onClick={(info) => navigate(info.key)}
            />
          </Header>
          <Content style={{ padding: "0 48px" }}>
            <Routes>
              <Route
                path={clientRoutes.generation}
                element={<GenerationPage />}
              />
              <Route path={clientRoutes.tests} element={<TestsPage />} />
              <Route path={clientRoutes.testEdit} element={<EditPage />} />
            </Routes>
          </Content>
        </Layout>
      </AppStyled>
    </AppWrapper>
  );
});
