import NestedError from "nested-error-stacks";
import { useAppConfig } from "../../contexts/appConfig";
import { generateErrorUrl, isError } from "../../models/error";

export default function useErrorMethods() {
  const { errorsUrl } = useAppConfig();
  return {
    getError: (id) => new NestedError(generateErrorUrl(id, errorsUrl)),
    getErrorUrl: (id) => generateErrorUrl(id, errorsUrl),
    isError: (error, errorId) => isError(error, errorId, errorsUrl),
  };
}
