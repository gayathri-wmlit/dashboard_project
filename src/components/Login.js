import React, { useState } from "react";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import { Image } from "antd";
import { loginService } from "../services/auth/loginServices";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { loginFailed, updateUser } from "@/libs/slices/LoginSlice";

export default function Login() {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const router = useRouter();

  const onFinish = async (values) => {
    const { email, password } = values;
    setLoading(true);
    const { data, errors } = await loginService(
      email,
      password
    );

    if (errors && Object.keys(errors).length) {
      console.log('errors', errors);
      dispatch(loginFailed());
      setLoading(false);
    } else {
      console.log(data,'logged in')
      dispatch(updateUser({ ...data, isLoggedIn: true, accessToken : data.key}));
      router.push("/dashboard");
    }
  };
  return (
    <div style={{border:'1px solid #f0f0f0;'}}>
      <Form
        name="normal_login"
        className="login-form"
        layout="vertical"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <div
          style={{
            paddingRight: "8px",
            paddingLeft: "8px",
            textAlign: "center",
          }}
          class="ant-col ant-col-24 ant-col-xs-24 ant-col-sm-24 ant-col-md-12"
        >
          <span
            role="img"
            aria-label="play-square"
            style={{ fontSize: "25px", textAlign: "center" }}
            class="anticon anticon-play-square"
          >
            <svg
              viewBox="64 64 896 896"
              focusable="false"
              data-icon="play-square"
              width="1em"
              height="1em"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                d="M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zm-40 728H184V184h656v656z"
                fill="#1890ff"
              ></path>
              <path
                d="M184 840h656V184H184v656zm240-484.7c0-9.4 10.9-14.7 18.3-8.8l199.4 156.7a11.2 11.2 0 010 17.6L442.3 677.6c-7.4 5.8-18.3.6-18.3-8.8V355.3z"
                fill="#e6f7ff"
              ></path>
              <path
                d="M442.3 677.6l199.4-156.8a11.2 11.2 0 000-17.6L442.3 346.5c-7.4-5.9-18.3-.6-18.3 8.8v313.5c0 9.4 10.9 14.6 18.3 8.8z"
                fill="#1890ff"
              ></path>
            </svg>
          </span>
          <h4 class="ant-typography">Sign In</h4>
        </div>

        <p style={{ textAlign: "center", color: "rgba(0, 0, 0, 0.45)" }}>
          Get started with our service
        </p>
        <br />
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your Email!",
            },
          ]}
        >
          <Input
            placeholder="Email Address"
            prefix={<MailOutlined className="site-form-item-icon" />}
          />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          style={{ gap: "5px" }}
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password
            placeholder="Password"
            prefix={<LockOutlined className="site-form-item-icon" />}
          />
        </Form.Item>

        <Form.Item>
          <Form.Item
            name="remember"
            valuePropName="checked"
            noStyle
          ></Form.Item>

          <a
            className="login-form-forgot"
            href="http://localhost:3000/user/forget-password"
            style={{ color: "#1890ff" }}
          >
            Forgot password
          </a>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
          <br></br>
          <div style={{ paddingTop: "20px" }}>
            <small style={{ color: "#8C8C8C" }}>
              {" "}
              Don't have an account yet?
            </small>
            <a href="" style={{ color: "#1890ff" }}>
              {" "}
              Create one now!
            </a>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
}
