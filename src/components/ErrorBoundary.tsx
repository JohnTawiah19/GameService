import { useRouteError } from "react-router-dom";

type Props = {};

export default function ErrorBoundary({}: Props) {
  let error = useRouteError();
  console.error(error);
  // Uncaught ReferenceError: path is not defined
  return <div>Dang!</div>;
}
