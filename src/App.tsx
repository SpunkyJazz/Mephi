import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { Avatar, Menu } from "antd";
import {
  AppStyled,
  AppWrapper,
  Content,
  Header,
  HeaderContent
} from "./AppStyle";
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
  const location = useLocation();
  const navigate = useNavigate();

  const HEADER_MENU_ITEMS = [
    {
      key: "user-menu-item",
      // когда будет юзер сделать username[0].toLocaleUpperCase()
      label: <Avatar>М</Avatar>,
      children: [
        {
          label: "Выйти"
        }
      ]
    }
  ];

  return (
    <AppWrapper>
      <Header>
        <HeaderContent>
          <img src="https://i.yapx.ru/W2oMO.png" />
          <Menu
            theme="dark"
            mode="horizontal"
            selectedKeys={[location.pathname]}
            items={MENU_ITEMS}
            style={{ flex: 1, minWidth: 0 }}
            onClick={(info) => navigate(info.key)}
          />
          <Menu
            theme="dark"
            mode="horizontal"
            items={HEADER_MENU_ITEMS}
            // TODO добавить логаут
            onClick={() => null}
          />
        </HeaderContent>
      </Header>
      <AppStyled>
        <Content>
          <Routes>
            <Route path={clientRoutes.questions} element={<QuestionsPage />} />
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
      </AppStyled>
    </AppWrapper>
  );
});
