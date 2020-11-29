import { useEffect, useState } from "react";
import NestedError from "nested-error-stacks";
import { useAppConfig } from "../../contexts/appConfig";
import useResourceInfo from "../useResourceInfo";
import { getBase } from "../../models/base";
import useErrorMethods from "../useErrorMethods";

export default function useBase() {
  const [base, setBase] = useState(getBase(true));
  const { solidBaseUrl } = useAppConfig();
  const { getErrorUrl } = useErrorMethods();
  const solidBaseSwr = useResourceInfo(solidBaseUrl, {
    onError: (error) => {
      if (error.statusCode === 401 || error.statusCode === 403)
        return new NestedError(getErrorUrl("baseNoAccess"), error);
      if (error.statusCode === 404)
        return new NestedError(getErrorUrl("baseNotFound"), error);
      return error;
    },
  });
  const { error, isValidating } = solidBaseSwr;

  useEffect(() => {
    setBase(getBase(isValidating, error, solidBaseSwr));
  }, [error, isValidating, solidBaseSwr]);

  return base;
}
