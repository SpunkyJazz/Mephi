import { Button, Card, List, message, Result, Row, Skeleton } from "antd";
import { useEffect, useState } from "react";
import { generatePath, useNavigate, useParams } from "react-router";
import { MephiApi } from "src/api/mephi";
import { TTestDetails } from "src/api/mephi/types";
import { clientRoutes } from "src/routes/client";

export const TestVariantsPage = (): JSX.Element => {
  const { testId } = useParams();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const [test, setTest] = useState<TTestDetails | undefined>();
  useEffect(() => {
    if (testId) {
      setIsLoading(true);
      MephiApi.getTest(testId)
        .then((res) => setTest(res.data))
        .catch(() => {
          setTest(undefined);
          message.error("Ошибка при загрузке");
        })
        .finally(() => setIsLoading(false))
        .catch(() => null);
    }
  }, [testId]);

  const renderContent = (): JSX.Element => {
    if (isLoading) {
      return (
        <Row justify="center">
          <Skeleton />
        </Row>
      );
    }
    if (test) {
      return (
        <>
          <Card
            style={{
              marginBottom: 10,
              fontSize: 30,
              display: "flex",
              justifyContent: "center"
            }}>
            {test.name}
          </Card>
          <List
            itemLayout="horizontal"
            dataSource={test?.variants}
            loading={isLoading}
            renderItem={(item) => (
              <List.Item
                actions={[
                  <Button
                    key="key"
                    onClick={() =>
                      navigate(
                        generatePath(clientRoutes.variantQuestions, {
                          testId: String(test?.id),
                          variantNumber: String(item.number)
                        })
                      )
                    }>
                    Просмотр
                  </Button>
                ]}>
                <List.Item.Meta
                  title={["Вариант ", item.number]}
                  style={{ fontSize: 40 }}
                />
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
