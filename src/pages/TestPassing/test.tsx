import {
  Button,
  Card,
  message,
  Result,
  Row,
  Skeleton,
  List,
  Checkbox
} from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { MephiApi } from "src/api/mephi";
import { TTestPassing } from "src/api/mephi/types";

export const TestPassingPage = (): JSX.Element => {
  const { passingTestId } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  const [test, setTest] = useState<TTestPassing>();
  useEffect(() => {
    if (passingTestId) {
      MephiApi.getTestPassing(passingTestId)
        .then((res) => setTest(res.data))
        .catch(() => {
          message.error("Ошибка при загрузке");
        })
        .finally(() => setIsLoading(false))
        .catch(() => null);
    }
  }, [passingTestId]);

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
          <Button
            // TODO Настроить отправку теста
            type="primary"
            style={{
              width: "100%",
              marginBottom: 15,
              height: 50,
              fontSize: 24
            }}>
            Отправить
          </Button>
          {test?.questions.map((item) => (
            <div key={item.complexity}>
              <Card
                style={{
                  height: 50,
                  display: "flex",
                  alignItems: "center",
                  fontWeight: 600
                }}>
                {item.id}. {item.text}
              </Card>
              <List
                itemLayout="horizontal"
                dataSource={item.answers}
                loading={isLoading}
                renderItem={(el) => (
                  <List.Item
                    actions={[
                      <Checkbox
                        key="key"
                        // TODO Настроить checkbox + перенести его влево
                        // onChange={}
                      ></Checkbox>
                    ]}>
                    <List.Item.Meta
                      // TODO Сделать текст жирнее?
                      // title={el.text}
                      description={el.text}
                      style={{ marginLeft: 20 }}
                    />
                  </List.Item>
                )}
              />
            </div>
          ))}
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
