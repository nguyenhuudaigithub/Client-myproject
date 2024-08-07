import { IProfile } from "@/types/backend";
import { Descriptions, Drawer } from "antd";
import dayjs from "dayjs";

interface IProps {
  onClose: (v: boolean) => void;
  open: boolean;
  dataInit: IProfile | null;
  setDataInit: (v: any) => void;
}
const ViewDetailProfile = (props: IProps) => {
  const { onClose, open, dataInit, setDataInit } = props;

  return (
    <>
      <Drawer
        title="Thông Tin Profile"
        placement="right"
        onClose={() => {
          onClose(false);
          setDataInit(null);
        }}
        open={open}
        width={"40vw"}
        maskClosable={false}
      >
        <Descriptions title="" bordered column={2} layout="vertical">
          <Descriptions.Item label="Tên Profile">
            {dataInit?.title}
          </Descriptions.Item>
          <Descriptions.Item label="API Path">
            {dataInit?.logo}
          </Descriptions.Item>

          <Descriptions.Item label="Method">
            {dataInit?.title}
          </Descriptions.Item>
          <Descriptions.Item label="Thuộc Module">
            {dataInit?.description}
          </Descriptions.Item>

          <Descriptions.Item label="Ngày tạo">
            {dataInit && dataInit.createdAt
              ? dayjs(dataInit.createdAt).format("DD-MM-YYYY HH:mm:ss")
              : ""}
          </Descriptions.Item>
          <Descriptions.Item label="Ngày sửa">
            {dataInit && dataInit.updatedAt
              ? dayjs(dataInit.updatedAt).format("DD-MM-YYYY HH:mm:ss")
              : ""}
          </Descriptions.Item>
        </Descriptions>
      </Drawer>
    </>
  );
};

export default ViewDetailProfile;
