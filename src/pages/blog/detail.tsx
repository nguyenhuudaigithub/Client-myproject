import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { IBlog } from "@/types/backend";
import { callFetchBlogById } from "@/config/api";
import styles from "styles/client.module.scss";
import parse from "html-react-parser";
import { Col, Divider, Row, Skeleton } from "antd";
import { EnvironmentOutlined } from "@ant-design/icons";

const ClientBlogDetailPage = (props: any) => {
  const [blogDetail, setBlogDetail] = useState<IBlog | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  let location = useLocation();
  let params = new URLSearchParams(location.search);
  const id = params?.get("id");

  useEffect(() => {
    const init = async () => {
      if (id) {
        setIsLoading(true);
        const res = await callFetchBlogById(id);
        if (res?.data) {
          setBlogDetail(res.data);
        }
        setIsLoading(false);
      }
    };
    init();
  }, [id]);

  return (
    <div className={`${styles["container"]} ${styles["detail-blog-section"]}`}>
      {isLoading ? (
        <Skeleton />
      ) : (
        <Row gutter={[20, 20]}>
          {blogDetail && blogDetail._id && (
            <>
              <Col span={24} md={16}>
                <div className={styles["header"]}>{blogDetail.title}</div>

                <div className={styles["location"]}>
                  <EnvironmentOutlined style={{ color: "#58aaab" }} />
                  &nbsp;{blogDetail?.description}
                </div>

                <Divider />
                {parse(blogDetail?.detail ?? "")}
                <Divider />
              </Col>

              <Col span={24} md={8}>
                <div className={styles["blog"]}>
                  <div>
                    <img alt="example" src={blogDetail?.img} />
                  </div>
                  <div>{blogDetail?.title}</div>
                </div>
              </Col>
            </>
          )}
        </Row>
      )}
    </div>
  );
};
export default ClientBlogDetailPage;
