import React, { useMemo, useCallback, useState } from "react";
import Layout from "../components/layout/Layout";
import styles from "../styles/home.module.scss";
import { InboxOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { message, Upload, Button, Form, Input, Alert } from "antd";

const { Dragger } = Upload;
type submitVal = {
  audioId: string;
};

function Home() {
  const [errorUpload, setErrorUpload] = useState<string | null>();
  const [file, setFile] = useState<any>(null);
  const props: UploadProps = useMemo(() => {
    return {
      name: "file",
      accept: "video/mp4,video/x-m4v,video/*",
      multiple: false,
      onChange(info) {
        const { status } = info.file;
        if (status === "done") {
          message.success(`${info.file.name} file uploaded successfully.`);
          setFile(info.file);
        } else if (status === "error") {
          message.error(`${info.file.name} file upload failed.`);
        }
      },
      customRequest({ onSuccess, file }) {
        onSuccess("okay");
      },
      beforeUpload: (file) => {
        const isPNG =
          file.type === "video/mp4" ||
          file.type === "video/x-m4v" ||
          file.type === "video/*";
        if (!isPNG) {
          message.error(`${file.name} is not a png file`);
        }
        return isPNG || Upload.LIST_IGNORE;
      },
    };
  }, []);

  const setErrorUp = useCallback((err: string) => {
    setErrorUpload(err);
    setTimeout(() => {
      setErrorUpload(null);
    }, 3000);
  }, []);

  const onFinish = useCallback((values: submitVal) => {
    if (!values || !values.audioId) {
      setErrorUp("Please Enter audio ID.");
      return;
    }
  }, [setErrorUp]);

  return (
    <div>
      <Layout>
        <div className={styles.allCenter}>
          <div className={styles.draggerWrapper}>
            {!file ? (
              <Dragger {...props} style={{ padding: "25px" }}>
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">
                  Click or drag file to this area to upload
                </p>
                <p className="ant-upload-hint">
                  Support for a single video upload. Strictly prohibit from
                  uploading company data or other band files
                </p>
              </Dragger>
            ) : (
              <div>
                <h3>
                  Uploaded file: {file.name}
                  <span
                    className={styles.crossFile}
                    onClick={() => {
                      setFile(null);
                    }}
                  >
                    X
                  </span>
                </h3>
              </div>
            )}
          </div>
          <div className={styles.downloadWrapper}>
            <Form
              name="basic"
              labelCol={{ span: 30 }}
              wrapperCol={{ span: 46 }}
              layout="vertical"
              style={{ maxWidth: 600, minWidth: "30vw" }}
              initialValues={{ remember: true }}
              onFinish={onFinish}
              autoComplete="off"
            >
              <Form.Item label="Download Converted Video" name="audioId">
                <Input
                  type="number"
                  size="large"
                  placeholder="Enter Audio Id"
                />
              </Form.Item>
              {errorUpload && (
                <Form.Item style={{ width: "100%" }}>
                  <Alert message={errorUpload} type="error" />
                </Form.Item>
              )}
              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button size="large" type="primary" htmlType="submit">
                  Download
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </Layout>
    </div>
  );
}

export default Home;
