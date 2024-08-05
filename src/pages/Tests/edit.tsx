import { useEffect } from "react";
import { useParams } from "react-router";

export const EditPage = (): JSX.Element => {
  const { id } = useParams();

  useEffect(() => {
    console.log(id);
  }, [id]);

  return <div></div>;
};
