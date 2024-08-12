import { Modal, Row, Col, message, notification, Upload, Button } from "antd";
import {
  ProForm,
  ProFormSwitch,
  ProFormText,
} from "@ant-design/pro-components";
import { isMobile } from "react-device-detect";
import {
  callCreateBlog,
  callUpdateBlog,
  callUploadSingleFile,
} from "@/config/api";
import { IBlog } from "@/types/backend";
import { UploadOutlined } from "@ant-design/icons";
import { UploadProps } from "antd/lib";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useState } from "react";

interface IProps {
  openModal: boolean;
  setOpenModal: (v: boolean) => void;
  dataInit?: IBlog | null;
  setDataInit: (v: any) => void;
  reloadTable: () => void;
}

const ModalBlog = (props: IProps) => {
  const { openModal, setOpenModal, reloadTable, dataInit, setDataInit } = props;
  const [blogDetail, setBlogDetail] = useState("");

  const [form] = ProForm.useForm();

  const submitBlog = async (valuesForm: any) => {
    const { title, img, description, detail, isActive } = valuesForm;

    const blog: IBlog = {
      title,
      img,
      description,
      detail: blogDetail,

      isActive,
    };

    try {
      if (dataInit?._id) {
        // Update blog
        const res = await callUpdateBlog(blog, dataInit._id);
        if (res.data) {
          message.success("Cập nhật blog thành công");
          handleReset();
          reloadTable();
        } else {
          notification.error({
            message: "Có lỗi xảy ra",
            description: res.message,
          });
        }
      } else {
        // Create blog
        const res = await callCreateBlog(blog);
        if (res.data) {
          message.success("Thêm mới blog thành công");
          handleReset();
          reloadTable();
        } else {
          notification.error({
            message: "Có lỗi xảy ra",
            description: res.message,
          });
        }
      }
    } catch (error) {
      notification.error({
        message: "Có lỗi xảy ra",
        description: "Lỗi không xác định.",
      });
    }
  };

  const handleReset = () => {
    setDataInit(null);
    setOpenModal(false);
    form.resetFields();
  };

  const generateUploadProps = (namePath: (string | number)[]) => {
    const propsUpload: UploadProps = {
      maxCount: 1,
      multiple: false,
      accept: "image/*",
      async customRequest({ file, onSuccess, onError }: any) {
        const res = await callUploadSingleFile(file, "images");
        if (res && res.data) {
          form.setFieldValue(namePath, res.data.url);
          if (onSuccess) onSuccess("ok");
        } else {
          if (onError) {
            const error = new Error(res.message);
            onError({ event: error });
          }
        }
      },
      onChange(info) {
        if (info.file.status === "done") {
          message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === "error") {
          message.error(
            info?.file?.error?.event?.message ??
              "Đã có lỗi xảy ra khi upload file."
          );
        }
      },
    };
    return propsUpload;
  };

  const renderImageUploadSection = (
    namePath: (string | number)[],
    label: string
  ) => (
    <Row gutter={16}>
      <Col span={17}>
        <ProFormText
          name={namePath}
          label={label}
          placeholder="Nhập liên kết hình ảnh"
        />
      </Col>
      <Col span={7}>
        <ProForm.Item label="  ">
          <Upload {...generateUploadProps(namePath)}>
            <Button icon={<UploadOutlined />}>
              Tải lên ảnh của bạn (&lt; 5MB)
            </Button>
          </Upload>
        </ProForm.Item>
      </Col>
    </Row>
  );

  const handleEditorChange = (event: any, editor: any) => {
    const data = editor.getData();
    setBlogDetail(data);
  };

  return (
    <Modal
      title={dataInit?._id ? "Cập nhật Blog" : "Tạo mới Blog"}
      visible={openModal}
      onCancel={handleReset}
      onOk={() => form.submit()}
      okText={dataInit?._id ? "Cập nhật" : "Tạo mới"}
      cancelText="Hủy"
      width={isMobile ? "100%" : 900}
      destroyOnClose
      maskClosable={false}
      keyboard={false}
    >
      <ProForm
        form={form}
        onFinish={submitBlog}
        initialValues={dataInit || {}}
        scrollToFirstError
        preserve={false}
        submitter={false}
      >
        <Row gutter={16}>
          <Col lg={24}>
            <ProFormText
              label="Tên Hồ Sơ"
              name="title"
              rules={[{ required: true, message: "Vui lòng không bỏ trống" }]}
              placeholder="Nhập tên hồ sơ"
            />
          </Col>
          <Col lg={24}>{renderImageUploadSection(["img"], "Image URL")}</Col>
          <Col lg={12} md={12} sm={24} xs={24}>
            <ProFormSwitch
              label="Trạng thái"
              name="isActive"
              checkedChildren="ACTIVE"
              unCheckedChildren="INACTIVE"
            />
          </Col>
          <Col lg={24} md={12} sm={24} xs={24}>
            <ProFormText
              label="Mô tả"
              name="description"
              rules={[{ required: true, message: "Vui lòng không bỏ trống" }]}
              placeholder="Nhập mô tả"
            />
          </Col>
          <Col lg={24} md={12} sm={24} xs={24}>
            <CKEditor
              editor={ClassicEditor}
              data={dataInit?.detail}
              onChange={handleEditorChange}
              onReady={(e: any) => {
                e.editing.view.change((w: any) => {
                  w.setStyle(
                    "height",
                    "500px",
                    e.editing.view.document.getRoot()
                  );
                });
              }}
            />
          </Col>
        </Row>
      </ProForm>
    </Modal>
  );
};

export default ModalBlog;
