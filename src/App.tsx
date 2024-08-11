import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { Layout, Menu } from "antd";
import { AppStyled, AppWrapper } from "./AppStyle";
import { QuestionsPage } from "./pages/Questions";
import { QuestionEditPage } from "./pages/Questions/edit";
import { GenerationPage } from "./pages/Generation";
import { TestsPage } from "./pages/Tests";
import { TestVariantsPage } from "./pages/Tests/testVariants";
import { VariantQuestionsPage } from "./pages/Tests/variantQuestions";
import { clientRoutes } from "src/routes/client";
import { MENU_ITEMS } from "src/constants";
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
            <img
              src="https://i.yapx.ru/W2oMO.png"
              width={50}
              height={50}
              style={{ marginRight: 50 }}
            />
            <Menu
              theme="dark"
              mode="horizontal"
              selectedKeys={[location.pathname]}
              items={MENU_ITEMS}
              style={{ flex: 1, minWidth: 0, fontSize: 20, fontWeight: 600 }}
              onClick={(info) => navigate(info.key)}
            />
          </Header>
          <Content style={{ padding: "0 48px" }}>
            <Routes>
              <Route
                path={clientRoutes.questions}
                element={<QuestionsPage />}
              />
              <Route
                path={clientRoutes.questionEdit}
                element={<QuestionEditPage />}
              />
              <Route
                path={clientRoutes.generation}
                element={<GenerationPage />}
              />
              <Route path={clientRoutes.tests} element={<TestsPage />} />
              <Route
                path={clientRoutes.testVariants}
                element={<TestVariantsPage />}
              />
              <Route
                path={clientRoutes.variantQuestions}
                element={<VariantQuestionsPage />}
              />
            </Routes>
          </Content>
        </Layout>
      </AppStyled>
    </AppWrapper>
  );
});
