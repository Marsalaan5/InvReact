// /* eslint-disable react/prop-types */
// /* eslint-disable no-unused-vars */
// import React,{useState} from "react";
// import { Table } from "antd";
// import { onShowSizeChange } from "./pagination";

// const Datatable = ({ props, columns, dataSource }) => {
//   const [selectedRowKeys, setSelectedRowKeys] = useState([]);
//   const onSelectChange = (newSelectedRowKeys) => {
//     console.log("selectedRowKeys changed: ", selectedRowKeys);
//     setSelectedRowKeys(newSelectedRowKeys);
//   };

//   const rowSelection = {
//     selectedRowKeys,
//     onChange: onSelectChange,
//   };
//   return (
//     <Table
//       key={props}
//       className="table datanew dataTable no-footer"
//       rowSelection={rowSelection}
//       columns={columns}
//       dataSource={dataSource}

//       rowKey={(record) => record.id}
//     />
//   );
// };

// export default Datatable;


/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Table } from "antd";
import { itemRender, onShowSizeChange } from "./pagination"; // your pagination helpers

const Datatable = ({ columns, dataSource }) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  return (
    <Table
      className="table datanew dataTable no-footer"
      rowSelection={rowSelection}
      columns={columns}
      dataSource={dataSource}
      rowKey={(record) => record.id}
      pagination={{
        showSizeChanger: true,       // allow changing page size
        pageSizeOptions: ["10", "25", "50", "100"], // options for page size
        defaultPageSize: 10,          // default items per page
        total: dataSource.length,     // total items
        showTotal: (total, range) =>
          `${range[0]}-${range[1]} of ${total} items`,
        itemRender: itemRender,       // custom "Previous" / "Next"
        onShowSizeChange: onShowSizeChange, // handle page size change
      }}
    />
  );
};

export default Datatable;
