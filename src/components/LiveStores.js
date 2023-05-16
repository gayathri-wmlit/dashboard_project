import React from 'react'
import { Table,Button } from 'antd';
import { useState,useEffect } from 'react';
import { getLiveStoresService } from '../services/livestores/livestoresServices';
import { Spin } from 'antd';
import { useSelector } from 'react-redux';
import { CSVLink} from 'react-csv';
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'UID',
      dataIndex: 'uid',
      key: 'uid',
    },
    {
      title: 'Domain',
      dataIndex: 'domain',
      key: 'domain',
    },
    {
        title: 'StartDate',
      dataIndex: 'startdate',
      key: 'startdate',
    }
  ];


  
  
 
  
  export default function LiveStores() {
    const dataSource = [
  
    ];
   

    const csvHeaders = columns.map((column) => ({
      label: column.title,
      key: column.dataIndex,
    }));
    const [assignData, setData] = useState([]);
   
    const [load,setLoad]=useState(true);
    const { accessToken } = useSelector(state => state.user);
    const getLiveStoresData = async () => {
      setLoad(true)
      const { data, errors } = await getLiveStoresService(accessToken);
      
      if (errors) {
        console.log(errors);
      } else {
        
        
        setData(data.live_stores);
       setLoad(false)
      }
    };

  useEffect(()=>{
    getLiveStoresData();
   
  },[])
    return (
      <div>
        <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
        <h1>Live Stores</h1><br></br>
        <CSVLink data={dataSource} headers={csvHeaders} filename="live-store-export.csv">
        <Button type="primary" >
        Export
        </Button>
      </CSVLink>
        </div><br/>
        {
          
 assignData.map((props)=>{
  
  dataSource.push({name:props.name,uid:props.uid,domain:(
    <a href={`http://${props.domain}`} style={{ color: "#00BFFF" }}>
      {props.domain}
    </a>
  ),startdate:props.start_date})
  
 })
        }
         
        <Table dataSource={dataSource} columns={columns} loading={{ indicator: <div><Spin /></div>, spinning:load}}/>
        </div>
    )
  }
  

  