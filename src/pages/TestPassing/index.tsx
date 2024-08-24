import { Button, Card, List, message, Result, Row, Skeleton } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, generatePath } from "react-router";
import { MephiApi } from "src/api/mephi";
import { TOpenTests } from "src/api/mephi/types";
import { clientRoutes } from "src/routes/client";

export const OpenTestsPage = (): JSX.Element => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const [openTests, setOpenTests] = useState<TOpenTests[]>([]);
  useEffect(() => {
    MephiApi.getOpenTests()
      .then((res) => setOpenTests(res.data))
      .catch(() => {
        message.error("Ошибка при загрузке");
      })
      .finally(() => setIsLoading(false))
      .catch(() => null);
  }, []);

  const renderContent = (): JSX.Element => {
    if (isLoading) {
      return (
        <Row justify="center">
          <Skeleton />
        </Row>
      );
    }
    if (openTests) {
      return (
        <>
          <Card
            style={{
              marginBottom: 10,
              height: "80px",
              alignItems: "center",
              fontSize: 25,
              display: "flex",
              justifyContent: "center"
            }}>
            Открытые тесты
          </Card>
          <List
            itemLayout="horizontal"
            dataSource={openTests}
            loading={isLoading}
            renderItem={(item) => (
              <List.Item
                actions={[
                  <Button
                    key="key"
                    onClick={() =>
                      navigate(
                        generatePath(clientRoutes.testPassing, {
                          passingTestId: String(item.id)
                        })
                      )
                    }>
                    Перейти к прохождению
                  </Button>
                ]}>
                <List.Item.Meta title={item.name} />
              </List.Item>
            )}
          />
        </>
      );
    } else {
      return (
        <Result
          title="Ошибка"
          subTitle="Что-то пошло не так"
          // TODO добавить кнопку назад
          extra={<Button type="primary">Вернуться домой</Button>}
        />
      );
    }
  };
  return renderContent();
};
