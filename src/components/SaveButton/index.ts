import { Button, theme } from "antd";
import styled from "styled-components";

export const SaveButton = styled(Button)`
  color: ${theme.getDesignToken().colorSuccess};
  border-color: ${theme.getDesignToken().colorSuccess};
  background-color: white;

  &:hover:not(:disabled) {
    color: ${theme.getDesignToken().colorSuccessBorderHover} !important;
    border-color: ${theme.getDesignToken().colorSuccessHover} !important;
  }
`;
