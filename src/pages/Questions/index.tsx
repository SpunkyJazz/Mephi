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
      .then(() => {
        setQuestions(questions.filter((q) => q.id !== id));
        message.success("Вопрос успешно удалён");
      })
      .catch(() => {
        message.error("Ошибка при удалении");
      });
  };

  const handleEditUsage = (data: TQuestion): void => {
    const editData = { ...data, usage: !data.usage };
    MephiApi.editQuestionUsage(editData)
      .then(() => {
        const editQuestions = [...questions];
        const index = editQuestions.findIndex((item) => item.id === data.id);
        editQuestions[index] = editData;
        setQuestions(editQuestions);
        message.success("Изменения сохранены");
      })
      .catch(() => {
        message.error("Ошибка при изменении");
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
        <Checkbox
          checked={record.usage}
          onClick={() => handleEditUsage(record)}
          style={{ display: "flex", justifyContent: "center" }}></Checkbox>
      )
    },
    {
      dataIndex: "edit",
      width: "10%",
      render: (_: any, record: TQuestion) => (
        <div
          style={{ display: "flex", justifyContent: "center" }}
          onClick={() =>
            navigate(
              generatePath(clientRoutes.questionEdit, {
                id: String(record.id)
              })
            )
          }>
          <a>Редактировать</a>
        </div>
      )
    },
    {
      dataIndex: "delete",
      width: "10%",
      render: (_: any, record: TQuestion) => (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Popconfirm
            title="Уверены?"
            onConfirm={() => handleDeleteQuestion(record.id)}>
            <a>Удалить</a>
          </Popconfirm>
        </div>
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
