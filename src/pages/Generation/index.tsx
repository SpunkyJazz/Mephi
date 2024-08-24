import { useEffect, useState } from "react";
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
import { TTheme } from "src/api/mephi/types";

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

  const [themes, setThemes] = useState<TTheme[]>([]);
  useEffect(() => {
    MephiApi.getThemes()
      .then((res) => setThemes(res.data))
      .catch(() => {
        message.error("Ошибка при загрузке");
      })
      .catch(() => null);
  }, []);

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
        treeData={themes}
        // onSelect={}
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
