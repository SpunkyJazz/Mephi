import {
  Button,
  Card,
  Checkbox,
  Popconfirm,
  Result,
  Row,
  Skeleton,
  Table,
  message
} from "antd";
import { useEffect, useState } from "react";
import { generatePath, useNavigate } from "react-router";
import { clientRoutes } from "src/routes/client";
import { MephiApi } from "src/api/mephi";
import { TQuestion } from "src/api/mephi/types";

export const QuestionsPage = (): JSX.Element => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);

  const [questions, setQuestions] = useState<TQuestion[]>([]);
  useEffect(() => {
    MephiApi.getQuestions()
      .then((res) => setQuestions(res.data))
      .catch(() => {
        message.error("Ошибка при загрузке");
      })
      .finally(() => setIsLoading(false))
      .catch(() => null);
  }, []);

  const handleDeleteQuestion = (value: number): void => {
    const _questions = questions;
    _questions.splice(value, 1);
    setQuestions(_questions);
  };

  const columns: any = [
    {
      title: "Тема",
      dataIndex: "theme",
      width: "10%"
    },
    {
      title: "Идентификатор",
      dataIndex: "identifier",
      width: "10%"
    },
    {
      title: "Вопрос",
      dataIndex: "text",
      width: "40%"
    },
    {
      title: "Сложность",
      dataIndex: "complexity",
      width: "10%"
    },
    {
      title: "Использование",
      dataIndex: "usage",
      width: "10%",
      render: (_: any, record: TQuestion) => (
        <Checkbox checked={record.usage}></Checkbox>
      )
    },
    {
      dataIndex: "edit",
      width: "10%",
      render: (_: any, record: TQuestion) => (
        <Popconfirm
          title="Перейти к редактированию?"
          onConfirm={() =>
            navigate(
              generatePath(clientRoutes.questionEdit, {
                id: String(record.id)
              })
            )
          }>
          <a>Редактировать</a>
        </Popconfirm>
      )
    },
    {
      dataIndex: "delete",
      width: "10%",
      render: (_: any, __: any, index: number) => (
        <Popconfirm
          title="Уверены?"
          onConfirm={() => handleDeleteQuestion(index)}>
          <a>Удалить</a>
        </Popconfirm>
      )
    }
  ];

  const renderContent = (): JSX.Element => {
    if (isLoading) {
      return (
        <Row justify="center">
          <Skeleton />
        </Row>
      );
    }
    if (questions.length > 0) {
      return (
        <>
          <Card
            style={{
              marginBottom: 10,
              fontSize: 30,
              display: "flex",
              justifyContent: "center"
            }}>
            Список вопросов
          </Card>
          <Table bordered columns={columns} dataSource={questions}></Table>
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
