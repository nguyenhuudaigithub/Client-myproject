import DataTable from "@/components/client/data-table";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { IBlog } from "@/types/backend";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { ActionType, ProColumns } from "@ant-design/pro-components";
import { Button, Popconfirm, Space, Tag, message, notification } from "antd";
import { useState, useRef } from "react";
import dayjs from "dayjs";
import { callDeleteBlog } from "@/config/api";
import queryString from "query-string";
import { fetchBlog } from "@/redux/slice/blogSlide";
import ViewDetailBlog from "@/components/admin/blog/view.blog";
import ModalBlog from "@/components/admin/blog/modal.blog";
import Access from "@/components/share/access";
import { ALL_PERMISSIONS } from "@/config/permissions";

const BlogPage = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [dataInit, setDataInit] = useState<IBlog | null>(null);
  const [openViewDetail, setOpenViewDetail] = useState<boolean>(false);

  const tableRef = useRef<ActionType>();

  console.log(tableRef);

  const isFetching = useAppSelector((state) => state.blog.isFetching);
  const meta = useAppSelector((state) => state.blog.meta);
  const permissions = useAppSelector((state) => state.blog.result);
  const dispatch = useAppDispatch();

  const handleDeletePermission = async (_id: string | undefined) => {
    if (_id) {
      const res = await callDeleteBlog(_id);
      if (res && res.data) {
        message.success("Xóa Profile thành công");
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

  const columns: ProColumns<IBlog>[] = [
    {
      title: "Id",
      dataIndex: "_id",
      width: 250,
      render: (text, record, index, action) => {
        return (
          <a
            href="#"
            onClick={() => {
              setOpenViewDetail(true);
              setDataInit(record);
            }}
          >
            {record._id}
          </a>
        );
      },
      hideInSearch: true,
    },
    {
      title: "Title",
      dataIndex: "title",
      sorter: true,
    },
    {
      title: "Description",
      dataIndex: "description",
      sorter: true,
    },
    {
      title: "Trạng thái",
      dataIndex: "isActive",
      render(dom, entity, index, action, schema) {
        return (
          <>
            <Tag color={entity.isActive ? "lime" : "red"}>
              {entity.isActive ? "ACTIVE" : "INACTIVE"}
            </Tag>
          </>
        );
      },
      hideInSearch: true,
    },
    {
      title: "CreatedAt",
      dataIndex: "createdAt",
      width: 200,
      sorter: true,
      render: (text, record, index, action) => {
        return <>{dayjs(record.createdAt).format("DD-MM-YYYY HH:mm:ss")}</>;
      },
      hideInSearch: true,
    },
    {
      title: "UpdatedAt",
      dataIndex: "updatedAt",
      width: 200,
      sorter: true,
      render: (text, record, index, action) => {
        return <>{dayjs(record.updatedAt).format("DD-MM-YYYY HH:mm:ss")}</>;
      },
      hideInSearch: true,
    },
    {
      title: "Actions",
      hideInSearch: true,
      width: 50,
      render: (_value, entity, _index, _action) => (
        <Space>
          <Access permission={ALL_PERMISSIONS.PERMISSIONS.UPDATE} hideChildren>
            <EditOutlined
              style={{
                fontSize: 20,
                color: "#ffa500",
              }}
              type=""
              onClick={() => {
                setOpenModal(true);
                setDataInit(entity);
              }}
            />
          </Access>
          <Access permission={ALL_PERMISSIONS.PERMISSIONS.DELETE} hideChildren>
            <Popconfirm
              placement="leftTop"
              title={"Xác nhận xóa permission"}
              description={"Bạn có chắc chắn muốn xóa permission này ?"}
              onConfirm={() => handleDeletePermission(entity._id)}
              okText="Xác nhận"
              cancelText="Hủy"
            >
              <span style={{ cursor: "pointer", margin: "0 10px" }}>
                <DeleteOutlined
                  style={{
                    fontSize: 20,
                    color: "#ff4d4f",
                  }}
                />
              </span>
            </Popconfirm>
          </Access>
        </Space>
      ),
    },
  ];

  const buildQuery = (params: any, sort: any, filter: any) => {
    const clone = { ...params };

    if (clone.title) clone.title = `/${clone.title}/i`;
    if (clone.logo) clone.logo = `/${clone.logo}/i`;
    if (clone.description) clone.description = `/${clone.description}/i`;

    if (clone.isActive) {
      clone.isActive = clone.isActive === "ACTIVE" ? true : false;
    }

    let queryStr = queryString.stringify(clone);

    let sortBy = "";
    if (sort) {
      if (sort.title) {
        sortBy = sort.title === "ascend" ? "sort=title" : "sort=-title";
      }
      if (sort.logo) {
        sortBy = sort.logo === "ascend" ? "sort=logo" : "sort=-logo";
      }
      if (sort.description) {
        sortBy =
          sort.description === "ascend"
            ? "sort=description"
            : "sort=-description";
      }
      if (sort.createdAt) {
        sortBy =
          sort.createdAt === "ascend" ? "sort=createdAt" : "sort=-createdAt";
      }
      if (sort.updatedAt) {
        sortBy =
          sort.updatedAt === "ascend" ? "sort=updatedAt" : "sort=-updatedAt";
      }
      if (sort.isActive) {
        sortBy =
          sort.isActive === "ascend" ? "sort=isActive" : "sort=-isActive";
      }
    }

    if (!sortBy) {
      queryStr = `${queryStr}&sort=-updatedAt`;
    } else {
      queryStr = `${queryStr}&${sortBy}`;
    }

    return queryStr;
  };

  return (
    <div>
      <Access permission={ALL_PERMISSIONS.PERMISSIONS.GET_PAGINATE}>
        <DataTable<IBlog>
          actionRef={tableRef}
          headerTitle="Danh sách Blog"
          rowKey="_id"
          loading={isFetching}
          columns={columns}
          dataSource={permissions}
          request={async (params, sort, filter): Promise<any> => {
            const query = buildQuery(params, sort, filter);
            dispatch(fetchBlog({ query }));
          }}
          scroll={{ x: true }}
          pagination={{
            current: meta.current,
            pageSize: meta.pageSize,
            showSizeChanger: true,
            total: meta.total,
            showTotal: (total, range) => {
              return (
                <div>
                  {" "}
                  {range[0]}-{range[1]} trên {total} rows
                </div>
              );
            },
          }}
          rowSelection={false}
          toolBarRender={(_action, _rows): any => {
            return (
              <Button
                icon={<PlusOutlined />}
                type="default"
                onClick={() => setOpenModal(true)}
              >
                Thêm mới
              </Button>
            );
          }}
        />
      </Access>
      <ModalBlog
        openModal={openModal}
        setOpenModal={setOpenModal}
        reloadTable={reloadTable}
        dataInit={dataInit}
        setDataInit={setDataInit}
      />

      <ViewDetailBlog
        onClose={setOpenViewDetail}
        open={openViewDetail}
        dataInit={dataInit}
        setDataInit={setDataInit}
      />
    </div>
  );
};

export default BlogPage;
