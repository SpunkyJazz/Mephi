import { Popconfirm, Table } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router";
import { clientRoutes } from "src/routes/client";

interface DataType {
  key: number;
  name: string;
  variants: string;
  questions: string;
}

export const TestsPage = (): JSX.Element => {
  const navigate = useNavigate();

  const handleDelete = (key: number) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
  };

  const [dataSource, setDataSource] = useState<DataType[]>([
    {
      key: 0,
      name: "Test 1",
      variants: "20",
      questions: "20"
    },
    {
      key: 1,
      name: "Test 2",
      variants: "10",
      questions: "15"
    },
    {
      key: 2,
      name: "Test 3",
      variants: "10",
      questions: "20"
    },
    {
      key: 3,
      name: "Test 4",
      variants: "15",
      questions: "20"
    },
    {
      key: 4,
      name: "Test 5",
      variants: "20",
      questions: "10"
    },
    {
      key: 5,
      name: "Test 6",
      variants: "15",
      questions: "10"
    },
    {
      key: 6,
      name: "Test 7",
      variants: "10",
      questions: "10"
    }
  ]);

  const columns: any = [
    {
      title: "Название теста",
      dataIndex: "name",
      width: "30%",
      editable: true
    },
    {
      title: "Вариантов",
      dataIndex: "variants"
    },
    {
      title: "Вопросов",
      dataIndex: "questions"
    },
    {
      dataIndex: "edit",
      render: (_: any, record: any) => (
        <Popconfirm
          title="Перейти к редактированию?"
          onConfirm={() => navigate(`${clientRoutes.tests}/${record.key}`)}>
          <a>Редактировать</a>
        </Popconfirm>
      )
    },
    {
      dataIndex: "delete",
      render: (_: any, record: any) =>
        dataSource.length >= 1 ? (
          <Popconfirm
            title="Уверены?"
            onConfirm={() => handleDelete(record.key)}>
            <a>Удалить</a>
          </Popconfirm>
        ) : null
    }
  ];

  return (
    <div>
      <Table bordered dataSource={dataSource} columns={columns} />
    </div>
  );
};
