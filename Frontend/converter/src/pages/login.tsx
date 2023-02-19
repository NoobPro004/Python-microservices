import React, { useCallback, useState } from "react";
import { useRouter } from "next/router";
import styles from "./login.module.scss";
import { Alert, Button, Checkbox, Form, Input } from "antd";
import api from "../service/axios";
import { useAuth } from "@/context/auth";
import Error from "next/error";

type submitVal = {
  username: string;
  password: string;
  error: string;
};
function Login() {
  const router = useRouter();
  const { login } = useAuth();
  const [error, setError] = useState<string | null>();

  const onFinish = useCallback(
    async (values: submitVal) => {
      try {
        await login(values.username as string, values.password as string);
      } catch (err: any) {
        setError(err.message);
        setTimeout(() => {
          setError(null);
        }, 4000);
      }
    },
    [login]
  );

  return (
    <div className={styles.verticalFlex}>
      <div className={styles.left}></div>
      <div className={styles.right}>
        <div className={styles.loginForm}>
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600, minWidth: "30vw" }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input size="large" />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password size="large" />
            </Form.Item>

            <Form.Item
              name="remember"
              valuePropName="checked"
              wrapperCol={{ offset: 8, span: 16 }}
            >
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            {error && (
              <Form.Item style={{ marginLeft: "34%", width: "100%" }}>
                <Alert message={error} type="error" />
              </Form.Item>
            )}
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button size="large" type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Login;
