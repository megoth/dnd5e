import React, { useMemo } from "react";
import { useTable, useSortBy } from "react-table";
import Layout from "../layout";
import Content from "../content";
import Translation from "../translation";
import WarningMessage from "../warningMessage";
import { getMessage } from "../../src/models/translation";
import useApp from "../../src/hooks/useApp";
import { EquipmentQuery } from "../../lib/api/equipment";
import Icon from "../icon";

interface Props {
  equipment: Array<EquipmentQuery>;
}

export default function EquipmentPage({ equipment }: Props) {
  const app = useApp();
  const data = useMemo(() => equipment, [equipment]);
  const columns = useMemo(
    () => [
      {
        Header: <Translation id="name" />,
        accessor: "name",
        sortDescFirst: true,
      },
      {
        Header: <Translation id="cost" />,
        accessor: "cost",
        disableSortBy: true,
      },
    ],
    []
  );
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data }, useSortBy);
  return (
    <Layout pageName={getMessage(app, "equipmentPageTitle")}>
      <Content>
        <h1>
          <Translation id="equipmentPageTitle" />
        </h1>
        <WarningMessage>
          <Translation id="workInProgress" />
        </WarningMessage>
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render("Header")}
                    <span>
                      {" "}
                      {column.isSorted && column.isSortedDesc && (
                        <Icon name="caretDown" />
                      )}
                      {column.isSorted && !column.isSortedDesc && (
                        <Icon name="caretUp" />
                      )}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </Content>
    </Layout>
  );
}
