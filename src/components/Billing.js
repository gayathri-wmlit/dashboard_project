import React from "react";
import { useRouter } from "next/router";
import Dropdown from "antd";
import { useRef } from 'react';
import { useSelector } from "react-redux";
import { Button, Table, Radio, ResetButton, Input, Menu } from "antd";
import { FilterOutlined, DownOutlined ,SearchOutlined} from "@ant-design/icons";
import { useState } from "react";
import { useEffect } from "react";
import { getBillingService } from "../../src/services/billing/billingServices";
import { CheckCircleOutlined, CloseOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { CSVLink} from 'react-csv';
import {Modal,Form,DatePicker} from "antd";
import qs from "qs";
let firstData = [];
let listOfStores = [];
let value;
let uniqueSet;
let uniqueArray=[];
const createFilterDropdown = (column) => {
 
  return ({
    setSelectedKeys,
    selectedKeys,
    confirm,
    clearFilters,
     dropdownRef,
  }) => {
    const containerRef2 = useState(null);
     
  const handleConfirmClick = () => {
    confirm();
    if (dropdownRef && dropdownRef.current) {
      dropdownRef.current.click();
    }
  };
    const filterItems = uniqueArray;
    const menuItems = selectedKeys[0]
      ? filterItems.filter((filter) =>
          filter.text.toLowerCase().includes(selectedKeys[0]?.toLowerCase())
        )
      : filterItems;
    const menu = menuItems.map((filter) => (
      <Menu.Item key={filter.value}>
        <Radio
          key={filter.value}
          value={filter.value}
          onClick={() => setSelectedKeys([filter.value])}
        >
          {filter.text}
        </Radio>
      </Menu.Item>
    ));

    return (
      <div ref={containerRef2}>
        <Input
          placeholder="Search..."
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={confirm}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Radio.Group
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys([e.target.value])}
        >
          <Menu>{menu}</Menu>
        </Radio.Group>
        <div
          style={{
            paddingLeft: 50,
            paddingBottom:10,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Button.Group >
          <Button
            onClick={() => {
              setSelectedKeys([]);
              clearFilters();
            }}
          >
            Reset
          </Button>
          <Button type="primary" onClick={handleConfirmClick}  >
            OK
          </Button>
          </Button.Group>
        </div>
      </div>
    );
  };
}

const getFilterDropdown = (column) => {
  
  return ({ setSelectedKeys, selectedKeys, confirm, clearFilters, dropdownVisible, dropdownRef }) => {
    const containerRef = useState(null);
    const handleConfirmClick = () => {
      confirm();
      if (dropdownRef && dropdownRef.current) {
        dropdownRef.current.click();
      }
    };

    return (
      <div ref={containerRef}>
        <Radio.Group onChange={(e) => setSelectedKeys([e.target.value])} value={selectedKeys[0]}>
          <Menu>
            {column.filters.map((filter) => (
              <Menu.Item key={filter.value} selectedKeys={selectedKeys} style={{ backgroundColor: "transparent !important" }}>
                <Radio key={filter.value} value={filter.value}>
                  <span>
                    {filter.text}
                    <br />
                  </span>
                </Radio>
              </Menu.Item>
            ))}
          </Menu>
        </Radio.Group>
        <div style={{ padding: 8, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Button.Group>
          <Button
            onClick={() => {
              setSelectedKeys([]);
              clearFilters();
            }}
          >
            Reset
          </Button>
          <Button type="primary" onClick={handleConfirmClick}>
            OK
          </Button>
          </Button.Group>
        </div>
      </div>
    );
  };
};
const columns = [
  {
    title: "Bill#",
    dataIndex: "bill",
    key: "bill",
  },
  {
    title: "Store",
    dataIndex: "store",
    key: "store",
    filters: (listOfStores || []).map(val => ({ text: val, value: val })),
    filterMode: "menu",
    filterSearch: true,
    width: "30%",
    filterDropdown:createFilterDropdown({
      key: "store",
      
    }),
      
    filterReset: true,
  },
  {
    title: "Due Date",
    dataIndex: "dueDate",
    key: "dueDate",
    render: (text) => <div className="due-date-cell">{text}</div>,
  },
  {
    title: "Total",
    dataIndex: "Total",
    key: "Total",
  },
  {
    title: "Pending",
    dataIndex: "pending",
    key: "pending",
  },
  {
    title: "Published",
    dataIndex: "published",
    key: "published",
    filters: [
      { text: "Yes", value: "true" },
      { text: "No", value: "false" },
    ],
    filterMode: "menu",
    filterDropdown:getFilterDropdown({ filters: [{ text: "Yes", value: "true" }, { text: "No", value: "false" }] }),
    width: "30%",
    
  },
  {
    title: "Received",
    dataIndex: "Received",
    key: "Received",
    filters: [
      { text: "Yes", value: "true" },
      { text: "No", value: "false" },
    ],

    filterMode: "menu",
    filterDropdown: getFilterDropdown({ filters: [{ text: "Yes", value: "true" }, { text: "No", value: "false" }] }),

    width: "30%",
  },
  {
    title: "Notifications",
    dataIndex: "notifications",
    key: "notifications",
  },
  {
    title: "Actions",
    dataIndex: "actions",
    key: "actions",
  },
];

let urlQuery = { page: 1 };
export const Billing = () => {
  let dataSource = [];
  const [visible, setVisible] = useState(false);

  const handleButtonClick = () => {
    setVisible(true);
  };

  const handleModalCancel = () => {
    setVisible(false);
  };

  const handleFormSubmit = (values) => {
    console.log('Form values:', values);
    setVisible(false);
  };
  const [load, setLoad] = useState(true);

  const router = useRouter();
  console.log(uniqueArray);
  const { accessToken } = useSelector((state) => state.user);
  const csvHeaders = columns.map((column) => ({
    label: column.title,
    key: column.dataIndex,
  }));

  const onChange = (pagination, filters, sorter, extra) => {
    Object.keys(filters).forEach(key => {
      if (key === 'published') {
        const value = filters.published?.toString();
        if (value === 'false') {
          urlQuery.bill_verified = 'false';
        } else if (value === 'true') {
          urlQuery.bill_verified = 'true';
        } else {
          delete urlQuery.bill_verified;
        }
      } else if (key === 'Received') {
        const value = filters.Received?.toString();
        if (value === 'true') {
          urlQuery.payment_verified = 'true';
        } else if (value === 'false') {
          urlQuery.payment_verified = 'false';
        } else {
          delete urlQuery.payment_verified;
        }
      } else if (key === 'store') {
        if (filters.store != null) {
          value = filters.store;
    
          firstData.map((props) => {
            if (value == props.store.primary_domain) {
              console.log(props.store.uid);
              urlQuery["store__uid"] = props.store.uid;
             
            }
          
           
          });
        }
        else{
          delete urlQuery.store__uid;
        }
       
      }
    });
  
    if (
      filters.store == null &&
      filters.Received == null &&
      filters.published == null
    ) {
      delete urlQuery.store__uid;
      delete urlQuery.bill_verified;
      delete urlQuery.payment_verified;
    }
    const query = qs.stringify(urlQuery);
    router.push(`/dashboard/billing?${query}`);
    getBillingData();
  };
  
  const [assignData, setData] = useState([]);

 

  const getBillingData = async () => {
    dataSource = [];
    

    setLoad(true);
    const { data, errors } = await getBillingService(urlQuery, accessToken);

    if (errors) {
      console.log(errors);
    } else {
      setData(data.results);
      setLoad(false);
    }
  };

  useEffect(() => {
    getBillingData();
  }, []);

  return (
    <div>
      
      {assignData.map((props) => {
        if (assignData.length == 6) {
          firstData = assignData;
          listOfStores.push({
            text: props.store.primary_domain,
            value: props.store.primary_domain,
          });
          let jsonObject = listOfStores.map(JSON.stringify);
          uniqueSet = new Set(jsonObject);
          uniqueArray = Array.from(uniqueSet).map(JSON.parse);
          columns[1].filters=uniqueArray;
          console.log(columns[1].filters);
        }
        dataSource.push({
          bill: props.store.uid,
          store: (
            <a href={`http://${props.store.primary_domain}`} style={{ color: "#00BFFF" }}>
              {props.store.primary_domain}
            </a>
          ),
          dueDate: props.due_date,
          Total: props.total,
          pending: props.pending_amount,
          published: (
            <div>
              {props.bill_verified ? (
                <CheckCircleOutlined style={{ color: "green" }} />
              ) : (
                <CloseOutlined style={{ color: "red" }} />
              )}
            </div>
          ),
          Received: (
            <div>
                   {" "}
              {props.payment_verified ? (
                <CheckCircleOutlined style={{ color: "green" }} />
              ) : (
                <CloseOutlined style={{ color: "red" }} />
              )}
            </div>
          ),
        });
      })}
      
      {
        
        <div>
           <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between',paddingRight:'800px'}}>
           <Button type="primary" onClick={handleButtonClick}>
       Create Bill
      </Button>

      <Modal
        width={340}
        visible={visible}
        onCancel={handleModalCancel}
        footer={null}
        height={100}
      >
        <Form >
          <Form.Item label="Store UID" name="field1" rules={[{ required: true }]}>
            <Input style={{width:'160px'}} />
          </Form.Item>
          <Form.Item label="Due Date" name="field2" rules={[{ required: true }]}>
          <DatePicker  />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
           
        
          <CSVLink data={dataSource} headers={csvHeaders} filename="billing-export.csv">
        <Button type="primary" >
        Export
        </Button>
      </CSVLink></div><br/>
          <div style={{ width: '1000px' }}>
          <Table
            dataSource={dataSource}
            columns={columns}
            onChange={onChange}
            loading={{
              indicator: (
                <div>
                  <Spin />
                </div>
              ),
              spinning: load,
            }}
         
          />
          </div>
        </div>
      }
    </div>
  );
};
