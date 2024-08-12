import { Col, Row } from "antd";
import styles from "styles/client.module.scss";
import BlogCard from "@/components/client/card/blog.card";

const ClientBlogPage = (props: any) => {
  return (
    <div className={styles["container"]} style={{ marginTop: 20 }}>
      <Row gutter={[20, 20]}>
        <Col span={24}>
          <BlogCard showPagination={true} />
        </Col>
      </Row>
    </div>
  );
};

export default ClientBlogPage;
