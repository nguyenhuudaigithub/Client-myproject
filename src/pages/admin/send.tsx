import DataTable from "@/components/client/data-table";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { ISend } from "@/types/backend";
import { DeleteOutlined } from "@ant-design/icons";
import { ActionType, ProColumns } from "@ant-design/pro-components";
import { Popconfirm, Space, message, notification } from "antd";
import { useState, useRef } from "react";
import dayjs from "dayjs";
import { callDeleteSend } from "@/config/api";
import queryString from "query-string";
import { fetchSend } from "@/redux/slice/sendSlide";
import ViewDetailSend from "@/components/admin/send/view.send";
import Access from "@/components/share/access";
import { ALL_PERMISSIONS } from "@/config/permissions";

const SendPage = () => {
  const [dataInit, setDataInit] = useState<ISend | null>(null);
  const [openViewDetail, setOpenViewDetail] = useState<boolean>(false);

  const tableRef = useRef<ActionType>();

  const isFetching = useAppSelector((state) => state.send.isFetching);
  const meta = useAppSelector((state) => state.send.meta);
  const permissions = useAppSelector((state) => state.send.result);
  const dispatch = useAppDispatch();

  const handleDeletePermission = async (_id: string | undefined) => {
    if (_id) {
      const res = await callDeleteSend(_id);
      if (res && res.data) {
        message.success("Xóa Send thành công");
        reloadTable();
      } else {
        notification.error({
          message: "Có lỗi xảy ra",
          description: res.message,
        });
      }
    }
  };

  const reloadTable = () => {
    tableRef?.current?.reload();
  };

  const columns: ProColumns<ISend>[] = [
    {
      title: "Id",
      dataIndex: "_id",
      width: 250,
      render: (_, record) => (
        <a
          href="#"
          onClick={() => {
            setOpenViewDetail(true);
            setDataInit(record);
          }}
        >
          {record._id}
        </a>
      ),
      hideInSearch: true,
    },
    {
      title: "Email",
      dataIndex: "email",
      sorter: true,
    },
    {
      title: "Subject",
      dataIndex: "subject",
      sorter: true,
    },
    {
      title: "Message",
      dataIndex: "message",
      sorter: true,
    },
    {
      title: "CreatedAt",
      dataIndex: "createdAt",
      width: 200,
      sorter: true,
      render: (_, record) =>
        dayjs(record.createdAt).format("DD-MM-YYYY HH:mm:ss"),
      hideInSearch: true,
    },
    {
      title: "Actions",
      hideInSearch: true,
      width: 50,
      render: (_, entity) => (
        <Space>
          <Access permission={ALL_PERMISSIONS.PERMISSIONS.DELETE} hideChildren>
            <Popconfirm
              placement="leftTop"
              title="Xác nhận xóa permission"
              description="Bạn có chắc chắn muốn xóa permission này?"
              onConfirm={() => handleDeletePermission(entity._id)}
              okText="Xác nhận"
              cancelText="Hủy"
            >
              <DeleteOutlined
                style={{
                  fontSize: 20,
                  color: "#ff4d4f",
                  cursor: "pointer",
                  margin: "0 10px",
                }}
              />
            </Popconfirm>
          </Access>
        </Space>
      ),
    },
  ];

  const buildQuery = (params: any, sort: any) => {
    const clone = { ...params };
    if (clone.email) clone.email = `/${clone.email}/i`;
    if (clone.subject) clone.subject = `/${clone.subject}/i`;
    if (clone.message) clone.message = `/${clone.message}/i`;

    let queryStr = queryString.stringify(clone);
    const sortBy = sort?.createdAt
      ? `sort=${sort.createdAt === "ascend" ? "" : "-"}createdAt`
      : "sort=-updatedAt";

    return `${queryStr}&${sortBy}`;
  };

  return (
    <div>
      <Access permission={ALL_PERMISSIONS.PERMISSIONS.GET_PAGINATE}>
        <DataTable<ISend>
          actionRef={tableRef}
          headerTitle="Danh sách Send"
          rowKey="_id"
          loading={isFetching}
          columns={columns}
          dataSource={permissions}
          request={async (params, sort) =>
            dispatch(fetchSend({ query: buildQuery(params, sort) }))
          }
          scroll={{ x: true }}
          pagination={{
            current: meta.current,
            pageSize: meta.pageSize,
            showSizeChanger: true,
            total: meta.total,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} trên ${total} rows`,
          }}
          rowSelection={false}
        />
      </Access>
      <ViewDetailSend
        onClose={setOpenViewDetail}
        open={openViewDetail}
        dataInit={dataInit}
        setDataInit={setDataInit}
      />
    </div>
  );
};

export default SendPage;
