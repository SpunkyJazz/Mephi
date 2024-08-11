import {
  Button,
  Card,
  Checkbox,
  Input,
  InputNumber,
  message,
  Result,
  Row,
  Skeleton
} from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { MephiApi } from "src/api/mephi";
import { TQuestionDetails } from "src/api/mephi/types";

export const QuestionEditPage = (): JSX.Element => {
  const { id } = useParams();

  const [isLoading, setIsLoading] = useState(true);

  const [question, setQuestion] = useState<TQuestionDetails | undefined>();
  useEffect(() => {
    if (id) {
      MephiApi.getQuestion(id)
        .then((res) => setQuestion(res.data))
        .catch(() => {
          setQuestion(undefined);
          message.error("Ошибка при загрузке");
        })
        .finally(() => setIsLoading(false))
        .catch(() => null);
    }
  }, [id]);

  // TODO Отправлять изменения

  const handleChangeComplexity = (value: number | null): void => {
    question && setQuestion({ ...question, complexity: value });
  };

  const handleChangeText = (value: string): void => {
    question && setQuestion({ ...question, text: value });
  };

  const renderContent = (): JSX.Element => {
    if (isLoading) {
      return (
        <Row justify="center">
          <Skeleton />
        </Row>
      );
    }
    // TODO поменять
    if (question) {
      return (
        <div>
          <Card
            style={{
              marginBottom: 10,
              fontSize: 30,
              display: "flex",
              justifyContent: "center"
            }}>
            Редактирование вопроса
          </Card>
          <Row>
            <Input
              value={question?.text}
              style={{ fontSize: 20, width: "50%", height: 40 }}
              onChange={(event) => handleChangeText(event.target.value)}
            />
            <InputNumber
              value={question?.complexity}
              min={1}
              max={3}
              style={{ width: "20%", height: 40, fontSize: 20 }}
              onChange={handleChangeComplexity}
            />
            {/* TODO Настроить изменение использования вопроса */}
            <Checkbox
              style={{
                backgroundColor: "white",
                fontSize: 20,
                width: "15%",
                justifyContent: "center",
                height: 40,
                alignItems: "center"
              }}>
              Использовать
            </Checkbox>
            {/* TODO Сохранение изменений */}
            <Button
              type="primary"
              style={{ width: "15%", height: 40, fontSize: 20 }}>
              Сохранить
            </Button>
          </Row>
          {/* Настроить сохранение нового ответа */}
          <div style={{ fontSize: 25, marginTop: 10, marginBottom: 10 }}>
            Новый ответ:
          </div>
          <Row style={{ display: "flex", alignItems: "center" }}>
            <Input
              placeholder="Ответ"
              style={{ fontSize: 20, width: "70%", height: 40 }}
            />
            <Checkbox
              style={{
                backgroundColor: "white",
                fontSize: 20,
                width: "15%",
                justifyContent: "center",
                height: 40,
                alignItems: "center"
              }}>
              Корректность
            </Checkbox>
            <Button
              type="primary"
              style={{ width: "15%", height: 40, fontSize: 20 }}>
              Добавить
            </Button>
          </Row>
          <div style={{ fontSize: 25, marginTop: 10, marginBottom: 10 }}>
            Ответы:
          </div>
          {question?.answers?.map((item) => (
            <Row
              key={item.id}
              style={{ display: "flex", alignItems: "center" }}>
              <Input
                defaultValue={item.text}
                style={{ fontSize: 20, width: "70%", height: 40 }}
              />
              <Checkbox
                checked={item.correctness}
                style={{
                  backgroundColor: "white",
                  fontSize: 20,
                  width: "15%",
                  justifyContent: "center",
                  height: 40,
                  alignItems: "center"
                }}>
                Корректность
              </Checkbox>
              <Button
                type="primary"
                style={{ width: "15%", height: 40, fontSize: 20 }}>
                Удалить
              </Button>
            </Row>
          ))}
        </div>
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
