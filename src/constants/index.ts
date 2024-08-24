import { EditOutlined, FormOutlined, TableOutlined } from "@ant-design/icons";
import { createElement } from "react";
import { clientRoutes } from "src/routes/client";

export const MENU_ITEMS = [
  {
    key: clientRoutes.openTests,
    icon: createElement(EditOutlined),
    label: "Пройти тест"
  },
  {
    key: clientRoutes.generation,
    icon: createElement(FormOutlined),
    label: "Генерация тестов"
  },
  {
    key: clientRoutes.tests,
    icon: createElement(TableOutlined),
    label: "Тесты"
  },
  {
    key: clientRoutes.questions,
    icon: createElement(TableOutlined),
    label: "Вопросы"
  }
];
