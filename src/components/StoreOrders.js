import React, { useEffect } from 'react';
import { useState } from 'react';
import { format} from 'date-fns';
import { Spin } from 'antd';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { useRouter } from "next/router";
import { useSelector } from 'react-redux';
import { Select ,Button} from 'antd';
const options=[{value:'Today',label:'Today'},{value:'Yesterday',label:'Yesterday'},{value:'Last 7 days',label:'Last 7 days'},{value:'Last 28 days',label:'Last 28 days'},{value:'Last 90 Days',label:'Last 90 Days'},{value:'Custom',label:'Custom'}];
const { RangePicker } = DatePicker;
import { DatePicker, Space } from 'antd';
import { getStoreOrdersService } from '../services/storeorders/storeorders';
import qs from 'qs';
const date = new Date();
const onSearch = (value) => {
  console.log('search:', value);
};
let data1 = [
];

export default function StoreOrders() {
  let query={start_date:''};


  const [graphData,setGraphData]=useState([]);
  var [statusVar,setStatusVar]=useState('');
  
var today = new Date();
var [cond,setCond]=useState(false);
var result0 = format(today,'yyyy-MM-dd');
query['start_date']=result0;
  const router = useRouter();
 
  const [loading, setLoading] = useState(false); 
  const { accessToken } = useSelector(state => state.user);
  const [dates, setDates] = useState(null);
  const [value, setValue] = useState(null);
  const [assignData, setData] = useState([]);
  let load=true;
  const [selectedRange, setSelectedRange] = useState([]);

  const handleClear = () => {
    setSelectedRange([]);
  };
  const CustomDate = (props) => {
    let count = 0;
    

    if (props) {
      props.map((val) => {
        if (val != null) {
          count = count + 1;
        }
      });
  
      if (count === 2) {
        setLoading(true);
        let startDate = format(props[0].$d, 'yyyy-MM-dd');
        let endDate = format(props[1].$d, 'yyyy-MM-dd');
        console.log(startDate, endDate);
  
        if (startDate === endDate) {
          
          alert('Start and end dates are the same. Please select different dates');
          handleClear();
         setStatusVar('error');
        
        } else {
          delete query.start_date;
    delete query.end_date;
          query['start_date'] = startDate;
          query['end_date'] = endDate;
          setSelectedRange(props);
          getStoreOrdersData();
          
          setStatusVar(' ');
        }
        
      }
    }
  };
       
  const handleChange = (value) => {
    console.log(`selected ${value}`);
    
  if(value=='Today')
  {
    
    setLoading(true);
    query['start_date']=result0;
    setCond(false);
    delete query.end_date;
  
    getStoreOrdersData();
  }
  if(value=='Yesterday')
  {
    setLoading(true);
    var oneDayAgo = new Date(today);
    oneDayAgo.setDate(today.getDate() - 1);
    var result1 =format(oneDayAgo,'yyyy-MM-dd');
    query['start_date']=result1;
    setCond(false);
    delete query.end_date;
    getStoreOrdersData();
  }
  if(value=='Last 7 days')
  {
    setLoading(true);
    var sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(today.getDate() - 7);
    var result2 = format(sevenDaysAgo,'yyyy-MM-dd');
    query['start_date']=result2;
    setCond(false);
    delete query.end_date;
    getStoreOrdersData();
  }
  if(value=='Last 28 days')
  {
    setLoading(true);
    var twentyEightDaysAgo = new Date(today);
    twentyEightDaysAgo.setDate(today.getDate() - 28);
    var result3 =format(twentyEightDaysAgo,'yyyy-MM-dd');
    query['start_date']=result3;
    setCond(false);
    delete query.end_date;
    getStoreOrdersData();
  }
  if(value=='Last 90 Days')
  {
    setLoading(true);
    var nintyDaysAgo = new Date(today);
    nintyDaysAgo.setDate(today.getDate() - 90);
    var result4 = format(nintyDaysAgo,'yyyy-MM-dd');
    query['start_date']=result4;
    setCond(false);
    delete query.end_date;
    getStoreOrdersData();
  }
  if(value=='Custom')
  {
    handleClear();
    setCond(true);
    
    console.log(dates);
    getStoreOrdersData();
    
  }
  };

  const getStoreOrdersData = async () => {
    const query2 = qs.stringify(query);
   
    router.push(`/dashboard/store-orders?${query2}`);
    const { data, errors } = await getStoreOrdersService(query,accessToken);
    setLoading(false);
    if (errors) {
      console.log(errors);
    } else {
      
      
      setData(data);
      
      if(data.num_orders>0){
        data1=[]
      data1.push({
        store:data.by_store['12453f61'].domain ,
        amount:data.by_store['12453f61'].amount,
        
      })
      setGraphData(data1);
    }
    else{
      setGraphData([]);
    }
     
       console.log(data)
    }
  };

useEffect(()=>{
 getStoreOrdersData();
 
},[])
  return (
    <div>
        <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
        <h1>Store orders</h1><br></br>
 </div><br/>
          <div style={{display:'flex',flexDirection:'column',justifyContent:'space-between'}}>
          <h1 style={{textAlign:"initial",fontSize:'14px'}}>Select TimeFrame*</h1><br/>
          <div style={{display:'flex',flexDirection:'row',gap: '20px'}}>
         <Select
         style={{width:'150px'}}
     showSearch
     defaultValue="Today"
     placeholder="Select a person"
     optionFilterProp="children"
     onChange={handleChange}
     onSearch={onSearch}
     filterOption={(input, option) =>
       (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
     }
    options={options}
  />
   <div style={{textAlign:"initial"}}>{cond?<div><RangePicker value={selectedRange} status={statusVar} onCalendarChange={(val) => CustomDate(val)} /></div> :<h1></h1>}</div> </div>
  </div><br/>
   <Spin spinning={loading}>
    <h1>Total Orders Amount:{assignData.num_orders?assignData.by_store['12453f61'].amount:0}</h1>
   <h1>Total orders:{assignData.num_orders}</h1>
   <div style={{alignContent:'center'}}>
    
   <BarChart width={900} height={700} data={graphData}  >

   <CartesianGrid strokeDasharray="3 3" />
   <XAxis dataKey="store" angle={-90}
    textAnchor="end"
    interval={0}
    height={150}
   label={{ value: 'Stores', position: 'insideBottom', offset: -5 }} />
   <YAxis label={{ value: 'Orders Amount', angle: -90, position: 'insideLeft', offset: 1 }}/><br/>
   <Tooltip /><br/>
   
  
   <Bar dataKey="amount" fill="#8884d8"  />
 </BarChart>



    </div>
      </Spin>

  

    </div>
  )
}
