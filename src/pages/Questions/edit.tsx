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
import { SaveButton } from "src/components/SaveButton";

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

  const handleChangeText = (value: string): void => {
    question && setQuestion({ ...question, text: value });
  };

  const handleChangeComplexity = (value: number | null): void => {
    question && setQuestion({ ...question, complexity: value });
  };

  const [newAnswerText, setNewAnswerText] = useState("");
  const [newAnswerCorrectness, setNewAnswerCorrectness] = useState(false);

  const addNewAnswer = (): void => {
    if (question) {
      const index = question.answers.length;
      const _index = question.answers[index - 1].id;
      setQuestion({
        ...question,
        answers: [
          ...question.answers,
          {
            id: _index + 1,
            text: newAnswerText,
            correctness: newAnswerCorrectness
          }
        ]
      });
      MephiApi.addAnswer(question)
        .then(() => {
          message.success("Изменения сохранены");
        })
        .catch(() => {
          message.error("Ошибка при добавлении ответа");
        });
    }
  };

  const handleChangeTextAnswer = (identifier: number, text: string): void => {
    if (question) {
      const _answers = question.answers;
      const index = _answers.findIndex((item) => item.id === identifier);
      _answers[index].text = text;
      setQuestion({ ...question, answers: _answers });
    }
  };

  const handleChangeСorrectnessAnswer = (
    identifier: number,
    correctness: boolean
  ): void => {
    if (question) {
      const _answers = question.answers;
      const index = _answers.findIndex((item) => item.id === identifier);
      _answers[index].correctness = !correctness;
      setQuestion({ ...question, answers: _answers });
    }
  };

  const handleDeleteAnswer = (identifier: number): void => {
    if (question) {
      const _answers = question.answers.filter((q) => q.id !== identifier);
      setQuestion({ ...question, answers: _answers });
    }
  };

  const handleSaveQuestion = (): void => {
    if (question) {
      MephiApi.saveQuestion(question)
        .then(() => {
          message.success("Изменения сохранены");
        })
        .catch(() => {
          message.error("Ошибка при сохранении");
        });
    }
  };

  const renderContent = (): JSX.Element => {
    if (isLoading) {
      return (
        <Row justify="center">
          <Skeleton />
        </Row>
      );
    }
    if (question) {
      return (
        <div>
          <Card
            style={{
              marginBottom: 10,
              height: "80px",
              alignItems: "center",
              fontSize: 25,
              display: "flex",
              justifyContent: "center"
            }}>
            Редактирование вопроса
          </Card>
          <Row
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between"
            }}>
            <Input
              value={question.text}
              style={{ fontSize: 20, width: "50%", height: 40 }}
              onChange={(event) => handleChangeText(event.target.value)}
            />
            <InputNumber
              value={question.complexity}
              min={1}
              max={3}
              style={{ width: "18%", height: 40, fontSize: 20 }}
              onChange={handleChangeComplexity}
            />
            <Button
              type="primary"
              disabled={!question}
              style={{ width: "18%", height: 40, fontSize: 20 }}
              onClick={handleSaveQuestion}>
              Сохранить изменения
            </Button>
          </Row>
          <div style={{ fontSize: 25, marginTop: 10, marginBottom: 10 }}>
            Новый ответ:
          </div>
          <Row
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between"
            }}>
            <Input
              placeholder="Ответ"
              style={{ fontSize: 20, width: "70%", height: 40 }}
              onChange={(event) => setNewAnswerText(event.target.value)}
            />
            <Checkbox
              style={{
                backgroundColor: "white",
                fontSize: 18,
                width: "15%",
                justifyContent: "center",
                height: 40,
                alignItems: "center"
              }}
              onChange={(event) =>
                setNewAnswerCorrectness(event.target.checked)
              }>
              Корректность
            </Checkbox>
            <SaveButton
              style={{ width: "140px", fontSize: 20 }}
              disabled={!newAnswerText}
              onClick={addNewAnswer}>
              Добавить
            </SaveButton>
          </Row>
          <div style={{ fontSize: 25, marginTop: 10, marginBottom: 10 }}>
            Ответы:
          </div>
          {question?.answers?.map((item) => (
            <Row
              key={item.id}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "8px"
              }}>
              <Input
                defaultValue={item.text}
                style={{ fontSize: 20, width: "70%", height: 40 }}
                onChange={(event) =>
                  handleChangeTextAnswer(item.id, event.target.value)
                }
              />
              <Checkbox
                checked={item.correctness}
                style={{
                  backgroundColor: "white",
                  fontSize: 18,
                  width: "15%",
                  justifyContent: "center",
                  height: 40,
                  alignItems: "center"
                }}
                onClick={() =>
                  handleChangeСorrectnessAnswer(item.id, item.correctness)
                }>
                Корректность
              </Checkbox>
              <Button
                danger
                style={{ width: "140px", fontSize: 20 }}
                onClick={() => handleDeleteAnswer(item.id)}>
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
