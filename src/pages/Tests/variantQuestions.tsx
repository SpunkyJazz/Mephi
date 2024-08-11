import {
  Button,
  Card,
  message,
  Popconfirm,
  Result,
  Row,
  Skeleton,
  Table
} from "antd";
import { ColumnsType } from "antd/lib/table";
import { useEffect, useState } from "react";
import { generatePath, useNavigate, useParams } from "react-router";
import { MephiApi } from "src/api/mephi";
import { TQuestion, TVariantDetails } from "src/api/mephi/types";
import { clientRoutes } from "src/routes/client";

export const VariantQuestionsPage = (): JSX.Element => {
  const { testId, variantNumber } = useParams();
  const navigate = useNavigate();

  const [variant, setVariant] = useState<TVariantDetails | undefined>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (testId && variantNumber) {
      setIsLoading(true);
      MephiApi.getVariant(testId, variantNumber)
        .then((res) => setVariant(res.data))
        .catch(() => {
          setVariant(undefined);
          message.error("Ошибка при загрузке");
        })
        .finally(() => setIsLoading(false))
        .catch(() => null);
    }
  }, [testId, variantNumber]);

  const columns: ColumnsType<TQuestion> = [
    {
      title: "Тема",
      dataIndex: "theme",
      width: "15%"
    },
    {
      title: "Вопрос",
      dataIndex: "text",
      width: "50%"
    },
    {
      title: "Сложность",
      dataIndex: "complexity",
      width: "15%"
    },
    {
      dataIndex: "edit",
      width: "20%",
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
    if (variant) {
      return (
        <>
          <Card
            style={{
              marginBottom: 10,
              fontSize: 30,
              display: "flex",
              justifyContent: "center"
            }}>
            Вариант {variant.number}
          </Card>
          <Table
            bordered
            style={{ fontSize: 30 }}
            columns={columns}
            dataSource={variant?.questions}></Table>
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