import { useState } from "react";
import {
  Button,
  Card,
  Input,
  Row,
  Col,
  InputNumber,
  TreeSelect
  // Tree,
  // TreeProps
} from "antd";

export const GenerationPage = (): JSX.Element => {
  const onChange = (value: any): void => {
    console.log("changed", value);
  };

  const treeData = [
    {
      title: "Интеллектуальные системы и технологии",
      value: "0-0",
      key: "0-0",
      children: [
        {
          title: "Проектирование кибернетических систем, основанных на знаниях",
          value: "0-0-0",
          key: "0-0-0"
        },
        {
          title: "Динамические интеллектуальные системы",
          value: "0-0-1",
          key: "0-0-1"
        },
        {
          title: "Современные архитектуры интеллектуальных систем",
          value: "0-0-2",
          key: "0-0-2"
        }
      ]
    },
    {
      title: "Введение в интеллектуальные системы",
      value: "0-1",
      key: "0-1",
      children: [
        {
          title: "Общее представление человека об окружающем мире",
          value: "0-1-0",
          key: "0-1-0"
        },
        {
          title:
            "Основные направления исследований в области искусственного интеллекта",
          value: "0-1-1",
          key: "0-1-1"
        },
        {
          title: "Архитектуры интеллектуальных систем и их эволюции",
          value: "0-1-2",
          key: "0-1-2"
        }
      ]
    },
    {
      title: "Введение в интеллектуальные системы",
      value: "0-2",
      key: "0-2",
      children: [
        {
          title: "Обобщенная функциональная схема ИДС",
          value: "0-2-0",
          key: "0-2-0"
        },
        {
          title: "Понимание входных высказываний",
          value: "0-2-1",
          key: "0-2-1"
        },
        {
          title: "Построение лингвистической модели входного подъяыка",
          value: "0-2-2",
          key: "0-2-2"
        }
      ]
    },
    {
      title: "Функциональное программирование",
      value: "0-3",
      key: "0-3"
    },
    {
      title: "Технология построения динамических интеллектуальных систем",
      value: "0-4",
      key: "0-4"
    }
  ];

  const [value, setValue] = useState(["0-0-0"]);

  const OnChange = (newValue: string[]): void => {
    console.log("onChange ", newValue);
    setValue(newValue);
  };

  // const onSelect: TreeProps['onSelect'] = (selectedKeys, info) => {
  //   console.log('selected', selectedKeys, info);
  // };

  // const onCheck: TreeProps['onCheck'] = (checkedKeys, info) => {
  //   console.log('onCheck', checkedKeys, info);
  // };

  return (
    <Col>
      <Card
        style={{
          marginBottom: 10,
          fontSize: 30,
          display: "flex",
          justifyContent: "center"
        }}>
        Создание теста
      </Card>
      <Input
        placeholder="Имя теста"
        style={{ height: 50, fontSize: 25, marginBottom: 10 }}
      />
      <Row style={{ display: "flex", justifyContent: "space-between" }}>
        <InputNumber
          min={0}
          max={50}
          style={{ width: "20vw", height: 50, fontSize: 25 }}
          placeholder="Количество вариантов"
          onChange={onChange}
        />
        <InputNumber
          min={0}
          max={50}
          style={{ width: "20vw", height: 50, fontSize: 25 }}
          placeholder="Количество вопросов"
          onChange={onChange}
        />
        <InputNumber
          min={0}
          max={120}
          style={{ width: "20vw", height: 50, fontSize: 25 }}
          placeholder="Минут на тест"
          onChange={onChange}
        />
        <Button
          type="primary"
          style={{ width: "20vw", height: 50, fontSize: 25 }}>
          Отправить
        </Button>
      </Row>
      <TreeSelect
        size="large"
        treeData={treeData}
        onChange={OnChange}
        treeCheckable="true"
        placeholder="Выберите темы"
        style={{ marginTop: 10, width: "100%", fontSize: 25 }}
      />
      {/* <div style={{fontSize: 25, marginTop: 10, backgroundColor: "white"}}>Выберите темы:</div>
        <Tree
          checkable
          style={{marginTop: 15}}
          onSelect={onSelect}
          onCheck={onCheck}
          treeData={treeData}
        /> */}
    </Col>
  );
};
