import styled from "styled-components";
import { Layout } from "antd";

export const SiderStyled = styled(Layout.Sider)`
  & > div {
    display: flex;
    flex-direction: column;
  }
`;