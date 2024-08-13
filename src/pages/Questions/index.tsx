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

  const handleDeleteQuestion = (id: TQuestion["id"]): void => {
    MephiApi.deleteQuestion(id)
      .then(() => setQuestions(questions.filter((q) => q.id !== id)))
      .catch(() => {
        message.error("Ошибка при загрузке");
      });
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
      render: (_: any, record: TQuestion) => (
        <Popconfirm
          title="Уверены?"
          onConfirm={() => handleDeleteQuestion(record.id)}>
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
              height: "80px",
              alignItems: "center",
              fontSize: 25,
              display: "flex",
              justifyContent: "center"
            }}>
            Список вопросов
          </Card>
          <Table
            bordered
            pagination={{ defaultPageSize: 8 }}
            columns={columns}
            dataSource={questions}
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
