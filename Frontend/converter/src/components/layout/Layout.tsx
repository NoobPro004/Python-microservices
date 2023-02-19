import React from "react";
import { Breadcrumb, Layout as LayoutAntd, Menu, theme } from "antd";
import styles from "./Layout.module.scss";

const { Header, Content, Footer } = LayoutAntd;
function Layout({ children }: any) {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <LayoutAntd className={styles.layout}>
      <Header>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["2"]}
          items={new Array(0).fill(null).map((_, index) => {
            const key = index + 1;
            return {
              key,
              label: `nav ${key}`,
            };
          })}
        />
      </Header>
      <Content style={{ padding: "0 50px" }}>
        <div
          className="site-layout-content"
          style={{ background: colorBgContainer, margin: "34px 0 0 0" }}
        >
          {children}
        </div>
      </Content>
      <Footer style={{ textAlign: "center", color: "purple" }}>
        Converter ©2023 Created by Hims.G
      </Footer>
    </LayoutAntd>
  );
}

export default Layout;
