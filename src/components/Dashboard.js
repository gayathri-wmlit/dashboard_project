import { useEffect, useState } from 'react';
import { Button, Layout, Menu, theme } from 'antd';
import Link from 'next/link';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { createFromIconfontCN } from '@ant-design/icons';
  import React from 'react';


import { useSelector } from 'react-redux';


  const { Header, Content, Footer, Sider } = Layout;
  
  const IconFont = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js',
  });
 
export const Dashboard = () => {
  
  const [current, setCurrent] = useState('0');

  const { accessToken } = useSelector(state => state.user);

  console.log(accessToken,"accessToken");
  
      return (
      
        <Layout>
        <Sider
         
        >
          <div  />
          <Menu
            
           
            
            items={[UserOutlined, VideoCameraOutlined, UploadOutlined, UserOutlined]}
      
          />
        </Sider>
        <Layout>
        
        
    
        </Layout>
      </Layout>
      
      );
}
