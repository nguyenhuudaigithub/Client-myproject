import { callFetchBlog } from "@/config/api";
import { convertSlug } from "@/config/utils";
import { IBlog } from "@/types/backend";
import { Card, Col, Divider, Empty, Pagination, Row, Spin } from "antd";
import { useState, useEffect } from "react";
import { isMobile } from "react-device-detect";
import { Link, useNavigate } from "react-router-dom";
import styles from "styles/client.module.scss";

interface IProps {
  showPagination?: boolean;
}

const BlogCard = (props: IProps) => {
  const { showPagination = false } = props;

  const [displayBlog, setDisplayBlog] = useState<IBlog[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(4);
  const [total, setTotal] = useState(0);
  const [filter, setFilter] = useState("");
  const [sortQuery, setSortQuery] = useState("sort=-updatedAt");
  const navigate = useNavigate();

  useEffect(() => {
    fetchBlog();
  }, [current, pageSize, filter, sortQuery]);

  const fetchBlog = async () => {
    setIsLoading(true);
    let query = `current=${current}&pageSize=${pageSize}`;
    if (filter) {
      query += `&${filter}`;
    }
    if (sortQuery) {
      query += `&${sortQuery}`;
    }

    const res = await callFetchBlog(query);
    if (res && res.data) {
      setDisplayBlog(res.data.result);
      setTotal(res.data.meta.total);
    }
    setIsLoading(false);
  };

  const handleOnchangePage = (pagination: {
    current: number;
    pageSize: number;
  }) => {
    if (pagination && pagination.current !== current) {
      setCurrent(pagination.current);
    }
    if (pagination && pagination.pageSize !== pageSize) {
      setPageSize(pagination.pageSize);
      setCurrent(1);
    }
  };

  const handleViewDetailJob = (item: IBlog) => {
    if (item.title) {
      const slug = convertSlug(item.title);
      navigate(`/blogs/${slug}?id=${item._id}`);
    }
  };

  return (
    <div className={`${styles["blogs-section"]}`}>
      <div className={styles["blogs-content"]}>
        <Spin spinning={isLoading} tip="Loading...">
          <Row gutter={[20, 20]}>
            <Col span={24}>
              <div
                className={
                  isMobile ? styles["dflex-mobile"] : styles["dflex-pc"]
                }
              >
                <span className={styles["title"]}>BLOG</span>
                {!showPagination && <Link to="blogs">Xem tất cả</Link>}
              </div>
            </Col>

            {displayBlog?.map((item) => {
              return (
                <Col span={24} md={6} key={item._id}>
                  <Card
                    onClick={() => handleViewDetailJob(item)}
                    style={{ height: 250, width: 250 }}
                    hoverable
                    cover={
                      <div
                        style={{
                          height: "100%",
                          width: "100%",
                          overflow: "hidden",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <img
                          alt="example"
                          src={item?.img}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      </div>
                    }
                  >
                    <Divider
                      style={{
                        margin: 0,
                        padding: 0,
                      }}
                    />

                    <h3
                      style={{
                        textAlign: "center",
                        height: "40px",
                      }}
                    >
                      {item.title}
                    </h3>
                  </Card>
                </Col>
              );
            })}

            {(!displayBlog || (displayBlog && displayBlog.length === 0)) &&
              !isLoading && (
                <div className={styles["empty"]}>
                  <Empty description="Không có dữ liệu" />
                </div>
              )}
          </Row>
          {showPagination && (
            <>
              <div style={{ marginTop: 30 }}></div>
              <Row style={{ display: "flex", justifyContent: "center" }}>
                <Pagination
                  current={current}
                  total={total}
                  pageSize={pageSize}
                  responsive
                  onChange={(p: number, s: number) =>
                    handleOnchangePage({ current: p, pageSize: s })
                  }
                />
              </Row>
              <div style={{ marginTop: 40 }}></div>
            </>
          )}
        </Spin>
      </div>
    </div>
  );
};

export default BlogCard;
