import {
  Modal,
  Row,
  Col,
  message,
  notification,
  Card,
  Upload,
  Space,
  Button,
} from "antd";
import {
  ProForm,
  ProFormGroup,
  ProFormList,
  ProFormSelect,
  ProFormSwitch,
  ProFormText,
} from "@ant-design/pro-components";
import { isMobile } from "react-device-detect";
import {
  callCreateProfile,
  callUpdateProfile,
  callUploadSingleFile,
} from "@/config/api";
import { IProfile } from "@/types/backend";
import { TAG_LIST } from "@/config/utils";
import { UploadOutlined } from "@ant-design/icons";
import { useState } from "react";
import { UploadProps } from "antd/lib";

interface IProps {
  openModal: boolean;
  setOpenModal: (v: boolean) => void;
  dataInit?: IProfile | null;
  setDataInit: (v: any) => void;
  reloadTable: () => void;
}

const ModalProfile = (props: IProps) => {
  const { openModal, setOpenModal, reloadTable, dataInit, setDataInit } = props;

  const [form] = ProForm.useForm();

  const submitProfile = async (valuesForm: any) => {
    const {
      title,
      logo,
      description,
      navLink,
      heroSection,
      achievementsList,
      about,
      tabData,
      projectsData,
      contact,
      isActive,
    } = valuesForm;

    console.log(valuesForm);

    const profile: IProfile = {
      title,
      logo,
      description,
      navLink: navLink,
      heroSection: {
        image: heroSection.image,
        text: heroSection.text,
        myCv: heroSection.myCv,
        infor: heroSection.infor,
      },
      achievementsList: achievementsList,
      about: {
        title: about.title,
        imageAbout: about.imageAbout,
        detail: about.detail,
      },
      tabData: tabData,
      projectsData: {
        title: projectsData.title,
        data: projectsData.data,
      },
      contact: {
        title: contact.title,
        detail: contact.detail,
        socialMedia: contact.socialMedia,
      },
      isActive,
    };

    console.log(profile);

    if (dataInit?._id) {
      // update profile
      const res = await callUpdateProfile(profile, dataInit._id);
      if (res.data) {
        message.success("Cập nhật profile thành công");
        handleReset();
        reloadTable();
      } else {
        notification.error({
          message: "Có lỗi xảy ra",
          description: res.message,
        });
      }
    } else {
      // create profile
      const res = await callCreateProfile(profile);
      if (res.data) {
        message.success("Thêm mới profile thành công");
        handleReset();
        reloadTable();
      } else {
        notification.error({
          message: "Có lỗi xảy ra",
          description: res.message,
        });
      }
    }
  };

  const handleReset = () => {
    setDataInit(null);
    setOpenModal(false);
  };

  //img
  const [url, setUrl] = useState<string>("");

  const propsUpload: UploadProps = {
    maxCount: 1,
    multiple: false,
    accept: "application/jpg,application/img, .png",
    async customRequest({ file, onSuccess, onError }: any) {
      const res = await callUploadSingleFile(file, "profile");
      if (res && res.data) {
        setUrl(res.data.url);
        if (onSuccess) onSuccess("ok");
      } else {
        if (onError) {
          setUrl("");
          const error = new Error(res.message);
          onError({ event: error });
        }
      }
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        // console.log(info.file, info.fileList);
      }
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

  return (
    <Modal
      title={dataInit?._id ? "Cập nhật Profile" : "Tạo mới Profile"}
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
        onFinish={submitProfile}
        initialValues={dataInit?._id ? dataInit : {}}
        scrollToFirstError
        preserve={false}
      >
        <Row gutter={16}>
          <Col lg={12} md={12} sm={24} xs={24}>
            <ProFormText
              label="Tên Hồ Sơ"
              name="title"
              rules={[{ required: true, message: "Vui lòng không bỏ trống" }]}
              placeholder="Nhập tên hồ sơ"
            />
          </Col>
          <Col lg={12} md={12} sm={24} xs={24}>
            <ProFormText
              label="Logo"
              name="logo"
              rules={[{ required: true, message: "Vui lòng không bỏ trống" }]}
              placeholder="Nhập link logo"
            />
          </Col>
          <Col lg={12} md={12} sm={24} xs={24}>
            {dataInit?._id ? (
              <ProFormSelect
                name="isActive"
                label="Trạng thái"
                valueEnum={{ true: "Active", false: "Inactive" }}
                rules={[
                  { required: true, message: "Vui lòng chọn trạng thái!" },
                ]}
              />
            ) : (
              <ProFormSelect
                name="isActive"
                label="Trạng thái"
                disabled
                initialValue={false}
              />
            )}
          </Col>
          <Col lg={12} md={12} sm={24} xs={24}>
            <ProFormText
              label="Mô tả"
              name="description"
              rules={[{ required: true, message: "Vui lòng không bỏ trống" }]}
              placeholder="Nhập mô tả"
            />
          </Col>
        </Row>

        <Card
          title="Liên kết điều hướng"
          bordered={false}
          style={{ marginBottom: 16 }}
        >
          <ProFormList
            name="navLink"
            creatorButtonProps={{ creatorButtonText: "Thêm liên kết" }}
          >
            <ProFormGroup key="group">
              <Card style={{ marginBottom: 16 }}>
                <Row gutter={16}>
                  <Col span={12}>
                    <ProFormText
                      name="title"
                      label="Title"
                      placeholder="Nhập title"
                      rules={[
                        { required: true, message: "Vui lòng không bỏ trống" },
                      ]}
                    />
                  </Col>
                  <Col span={12}>
                    <ProFormText
                      name="path"
                      label="Path"
                      placeholder="Nhập path"
                      rules={[
                        { required: true, message: "Vui lòng không bỏ trống" },
                      ]}
                    />
                  </Col>
                </Row>
              </Card>
            </ProFormGroup>
          </ProFormList>
        </Card>

        <Card
          title="Hero Section"
          bordered={false}
          style={{ marginBottom: 16 }}
        >
          <ProFormText
            name={["heroSection", "text"]}
            label="Text"
            placeholder="Nhập text"
            rules={[{ required: true, message: "Vui lòng không bỏ trống" }]}
          />
          <Row gutter={16}>
            <Col span={24}>
              <ProForm.Item
                label={"Upload file Image"}
                rules={[{ required: true, message: "Vui lòng upload file!" }]}
              >
                <Upload {...propsUpload}>
                  <Button icon={<UploadOutlined />}>
                    Tải lên ảnh của bạn ( Hỗ trợ *.jpg, *.png, *.img, and &lt;
                    5MB )
                  </Button>
                </Upload>
              </ProForm.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <ProForm.Item
                label={"Upload file CV"}
                rules={[{ required: true, message: "Vui lòng upload file!" }]}
              >
                <Upload {...propsUpload}>
                  <Button icon={<UploadOutlined />}>
                    Tải lên ảnh của bạn ( Hỗ trợ *.jpg, *.png, *.img, and &lt;
                    5MB )
                  </Button>
                </Upload>
              </ProForm.Item>
            </Col>
          </Row>
          <ProFormList
            name={["heroSection", "infor"]}
            label="Infor"
            creatorButtonProps={{ creatorButtonText: "Thêm thông tin" }}
          >
            <Card style={{ marginBottom: 16 }}>
              <ProFormGroup key="group">
                <ProFormText
                  name="title"
                  label="Title"
                  placeholder="Nhập title"
                  rules={[
                    { required: true, message: "Vui lòng không bỏ trống" },
                  ]}
                />
                <ProFormText
                  name="time"
                  label="Time"
                  placeholder="Nhập thời gian"
                  rules={[
                    { required: true, message: "Vui lòng không bỏ trống" },
                  ]}
                />
              </ProFormGroup>
            </Card>
          </ProFormList>
        </Card>

        <Card
          title="Danh sách thành tựu"
          bordered={false}
          style={{ marginBottom: 16 }}
        >
          <ProFormList
            name="achievementsList"
            creatorButtonProps={{ creatorButtonText: "Thêm thành tựu" }}
          >
            <ProFormGroup key="group" title="Thành tựu">
              <Card style={{ marginBottom: 16 }}>
                <Row gutter={16}>
                  <Col span={6}>
                    <ProFormText
                      name="prefix"
                      label="Prefix"
                      placeholder="Nhập prefix"
                    />
                  </Col>
                  <Col span={6}>
                    <ProFormText
                      name="metric"
                      label="Metric"
                      placeholder="Nhập metric"
                    />
                  </Col>
                  <Col span={6}>
                    <ProFormText
                      name="value"
                      label="Value"
                      placeholder="Nhập value"
                      rules={[
                        { required: true, message: "Vui lòng không bỏ trống" },
                      ]}
                    />
                  </Col>
                  <Col span={6}>
                    <ProFormText
                      name="postfix"
                      label="Postfix"
                      placeholder="Nhập postfix"
                    />
                  </Col>
                </Row>
              </Card>
            </ProFormGroup>
          </ProFormList>
        </Card>

        <Card title="About" bordered={false} style={{ marginBottom: 16 }}>
          <ProFormText
            name={["about", "title"]}
            label="Title"
            placeholder="Nhập title"
            rules={[{ required: true, message: "Vui lòng không bỏ trống" }]}
          />
          <Row gutter={16}>
            <Col span={24}>
              <ProForm.Item
                label={"Upload file Image"}
                rules={[{ required: true, message: "Vui lòng upload file!" }]}
              >
                <Upload {...propsUpload}>
                  <Button icon={<UploadOutlined />}>
                    Tải lên ảnh của bạn ( Hỗ trợ *.jpg, *.png, *.img, and &lt;
                    5MB )
                  </Button>
                </Upload>
              </ProForm.Item>
            </Col>
          </Row>
          <ProFormText
            name={["about", "detail"]}
            label="Detail"
            placeholder="Nhập detail"
            rules={[{ required: true, message: "Vui lòng không bỏ trống" }]}
          />
        </Card>

        <Card title="Tab Data" bordered={false} style={{ marginBottom: 16 }}>
          <ProFormList
            name="tabData"
            creatorButtonProps={{ creatorButtonText: "Thêm tab" }}
          >
            <ProFormGroup key="group">
              <ProFormText
                name="title"
                label="Title"
                placeholder="Nhập title"
                rules={[{ required: true, message: "Vui lòng không bỏ trống" }]}
              />
              <ProFormText
                name="id"
                label="Id"
                placeholder="Nhập id"
                rules={[{ required: true, message: "Vui lòng không bỏ trống" }]}
              />
              <ProFormText
                name="content"
                label="Content"
                placeholder="Nhập content"
                rules={[{ required: true, message: "Vui lòng không bỏ trống" }]}
              />
            </ProFormGroup>
          </ProFormList>
        </Card>
        <Card title="Project" bordered={false} style={{ marginBottom: 16 }}>
          <ProFormText
            name={["projectsData", "title"]}
            label="Title"
            placeholder="Nhập title"
            rules={[{ required: true, message: "Vui lòng không bỏ trống" }]}
          />
          <ProFormList
            name={["projectsData", "data"]}
            creatorButtonProps={{ creatorButtonText: "Thêm project" }}
          >
            <ProFormGroup key="group">
              <Card
                title="Projects Data"
                bordered={false}
                style={{ marginBottom: 16 }}
              >
                <Row gutter={16}>
                  <Col span={8}>
                    <ProFormText
                      name="id"
                      label="ID"
                      placeholder="Nhập ID"
                      rules={[
                        { required: true, message: "Vui lòng không bỏ trống" },
                      ]}
                    />
                  </Col>
                  <Col span={8}>
                    <ProFormText
                      name="title"
                      label="Title"
                      placeholder="Nhập title"
                      rules={[
                        { required: true, message: "Vui lòng không bỏ trống" },
                      ]}
                    />
                  </Col>
                  <Col span={8}>
                    <ProFormText
                      name="description"
                      label="Description"
                      placeholder="Nhập description"
                      rules={[
                        { required: true, message: "Vui lòng không bỏ trống" },
                      ]}
                    />
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col span={24}>
                    <ProFormSelect
                      name="tag"
                      label="Tag"
                      options={TAG_LIST}
                      placeholder="Nhập tag"
                      rules={[
                        { required: true, message: "Vui lòng chọn kỹ năng!" },
                      ]}
                      allowClear
                      mode="multiple"
                      fieldProps={{ showArrow: false }}
                    />
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={8}>
                    <ProFormText
                      name="gitUrl"
                      label="Git URL"
                      placeholder="Nhập Git URL"
                      rules={[
                        { required: true, message: "Vui lòng không bỏ trống" },
                      ]}
                    />
                  </Col>
                  <Col span={8}>
                    <ProFormText
                      name="previewUrl"
                      label="Preview URL"
                      placeholder="Nhập Preview URL"
                      rules={[
                        { required: true, message: "Vui lòng không bỏ trống" },
                      ]}
                    />
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={24}>
                    <ProForm.Item
                      label={"Upload file Image"}
                      rules={[
                        { required: true, message: "Vui lòng upload file!" },
                      ]}
                    >
                      <Upload {...propsUpload}>
                        <Button icon={<UploadOutlined />}>
                          Tải lên ảnh của bạn ( Hỗ trợ *.jpg, *.png, *.img, and
                          &lt; 5MB )
                        </Button>
                      </Upload>
                    </ProForm.Item>
                  </Col>
                </Row>
              </Card>
            </ProFormGroup>
          </ProFormList>{" "}
        </Card>

        <Card title="Contact" bordered={false} style={{ marginBottom: 16 }}>
          <ProFormText
            name={["contact", "title"]}
            label="Title"
            placeholder="Nhập title"
            rules={[{ required: true, message: "Vui lòng không bỏ trống" }]}
          />
          <ProFormText
            name={["contact", "detail"]}
            label="Detail"
            placeholder="Nhập detail"
            rules={[{ required: true, message: "Vui lòng không bỏ trống" }]}
          />

          <ProFormList
            name={["contact", "socialMedia"]}
            creatorButtonProps={{ creatorButtonText: "Thêm mạng xã hội" }}
          >
            <ProFormGroup key="group" title="Social Media">
              <Card style={{ marginBottom: 16 }}>
                <Row gutter={16}>
                  <Col span={8}>
                    <ProFormText
                      name="name"
                      label="Name"
                      placeholder="Nhập name"
                      rules={[
                        { required: true, message: "Vui lòng không bỏ trống" },
                      ]}
                    />
                  </Col>
                  <Col span={8}>
                    <ProFormText
                      name="image"
                      label="Image"
                      placeholder="Nhập link ảnh"
                      rules={[
                        { required: true, message: "Vui lòng không bỏ trống" },
                      ]}
                    />
                  </Col>
                  <Col span={8}>
                    <ProFormText
                      name="link"
                      label="Link"
                      placeholder="Nhập link"
                      rules={[
                        { required: true, message: "Vui lòng không bỏ trống" },
                      ]}
                    />
                  </Col>
                </Row>
              </Card>
            </ProFormGroup>
          </ProFormList>
        </Card>
      </ProForm>
    </Modal>
  );
};

export default ModalProfile;
