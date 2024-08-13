import { Button, theme } from "antd";
import styled from "styled-components";

export const SaveButtonPrimary = styled(Button)`
  background-color: #87d068;

  &:hover:not(:disabled) {
    background-color: ${theme.getDesignToken().colorSuccessHover} !important;
  }
`;
