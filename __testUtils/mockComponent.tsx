import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

function MockedComponent({ children }: Props) {
  return <div>{children}</div>;
}

export default function mockComponent(moduleRef, methodName) {
  jest.spyOn(moduleRef, methodName).mockImplementation(MockedComponent);
}
