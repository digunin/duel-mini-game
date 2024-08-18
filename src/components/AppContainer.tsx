import React, { FC } from "react";

export const AppContainer: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <div className="app-container">{children}</div>;
};
