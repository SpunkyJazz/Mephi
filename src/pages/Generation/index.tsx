import { useState } from "react";
import {
  Button,
  Card,
  Input,
  Row,
  Col,
  InputNumber,
  TreeSelect,
  message
  // Tree
} from "antd";
import { MephiApi } from "src/api/mephi";

export const GenerationPage = (): JSX.Element => {
  const [newName, setName] = useState("");
  const [newVariants, setVariants] = useState(0);
  const [newQuestions, setQuestions] = useState(0);
  const [newMinutes, setMinutes] = useState(0);

  // TODO добавить выбранные темы
  const generateTest = (): void => {
    const test = {
      name: newName,
      variants: newVariants,
      questions: newQuestions,
      minutes: newMinutes,
      usage: false
    };
    if (test) {
      MephiApi.generateTest(test)
        .then(() => {
          message.success("Тест создан");
        })
        .catch(() => {
          message.error("Ошибка при создании теста");
        });
    }
  };

  // TODO сделать mock
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

  // TODO переделать layout
  return (
    <Col>
      <Card
        style={{
          marginBottom: 10,
          height: "80px",
          alignItems: "center",
          fontSize: 25,
          display: "flex",
          justifyContent: "center"
        }}>
        Генерация теста
      </Card>
      <Input
        placeholder="Имя теста"
        style={{ height: 40, fontSize: 20, marginBottom: 10 }}
        onChange={(event) => setName(event.target.value)}
      />
      <Row style={{ display: "flex", justifyContent: "space-between" }}>
        <InputNumber
          min={0}
          max={50}
          style={{ width: "20vw", height: 40, fontSize: 20 }}
          placeholder="Количество вариантов"
          onChange={() => setVariants}
        />
        <InputNumber
          min={0}
          max={50}
          style={{ width: "20vw", height: 40, fontSize: 20 }}
          placeholder="Количество вопросов"
          onChange={() => setQuestions}
        />
        <InputNumber
          min={0}
          max={120}
          style={{ width: "20vw", height: 40, fontSize: 20 }}
          placeholder="Минут на тест"
          onChange={() => setMinutes}
        />
        <Button
          type="primary"
          style={{ width: "20vw", height: 40, fontSize: 20 }}
          onClick={generateTest}>
          Создать
        </Button>
      </Row>
      <TreeSelect
        size="large"
        treeData={treeData}
        treeCheckable="true"
        placeholder="Выберите темы"
        style={{ marginTop: 10, width: "100%", fontSize: 20 }}
      />
      {/* <div style={{ fontSize: 25, marginTop: 10, backgroundColor: "white" }}>
        Выберите темы:
      </div>
      <Tree
        checkable
        style={{ marginTop: 15 }}
        onSelect={onSelect}
        onCheck={onCheck}
        treeData={treeData}
      /> */}
    </Col>
  );
};
