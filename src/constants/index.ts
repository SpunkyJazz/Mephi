import { TeamOutlined } from "@ant-design/icons";
import { createElement } from "react";
import { clientRoutes } from "src/routes/client";

export const MENU_ITEMS = [
  {
    key: clientRoutes.generation,
    icon: createElement(TeamOutlined),
    label: "Генерация тестов"
  },
  {
    key: clientRoutes.tests,
    icon: createElement(TeamOutlined),
    label: "Тесты"
  }
];