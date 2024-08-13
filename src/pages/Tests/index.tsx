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
import { ColumnsType } from "antd/lib/table";
import { useEffect, useState } from "react";
import { generatePath, useNavigate } from "react-router";
import { MephiApi } from "src/api/mephi";
import { TTest } from "src/api/mephi/types";
import { clientRoutes } from "src/routes/client";

export const TestsPage = (): JSX.Element => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);

  const [tests, setTests] = useState<TTest[]>([]);
  useEffect(() => {
    MephiApi.getTests()
      .then((res) => setTests(res.data))
      .catch(() => {
        setTests([]);
        message.error("Ошибка при загрузке");
      })
      .finally(() => setIsLoading(false))
      .catch(() => null);
  }, []);

  const handleDeleteTest = (value: number): void => {
    const _tests = tests;
    _tests.splice(value, 1);
    setTests(_tests);
  };

  const columns: ColumnsType<TTest> = [
    {
      title: "Название теста",
      dataIndex: "name",
      width: "40%"
    },
    {
      title: "Вариантов",
      dataIndex: "variants",
      width: "10%"
    },
    {
      title: "Вопросов",
      dataIndex: "questions",
      width: "10%"
    },
    {
      title: "Минут",
      dataIndex: "minutes",
      width: "10%"
    },
    {
      title: "Использование",
      dataIndex: "usage",
      width: "10%",
      render: (_: any, record: TTest) => (
        <Checkbox
          checked={record.usage}
          style={{ display: "flex", justifyContent: "center" }}></Checkbox>
      )
    },
    {
      width: "10%",
      render: (_: any, record: TTest) => (
        <div
          style={{ display: "flex", justifyContent: "center" }}
          onClick={() =>
            navigate(
              generatePath(clientRoutes.testVariants, {
                testId: String(record.id)
              })
            )
          }>
          <a>Просмотр</a>
        </div>
      )
    },
    {
      width: "10%",
      render: (_: any, __: TTest, index: number) => (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Popconfirm
            title="Уверены?"
            onConfirm={() => handleDeleteTest(index)}>
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
    if (tests.length > 0) {
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
            Созданные тесты
          </Card>
          <Table
            bordered
            pagination={{ defaultPageSize: 8 }}
            columns={columns}
            dataSource={tests}></Table>
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
