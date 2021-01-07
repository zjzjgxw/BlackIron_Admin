import React, {useEffect, useState} from 'react';
import {Select} from 'antd';
import {queryAllVips} from "@/pages/Customer/Vip/service";
import {isSuccess} from "@/utils/utils";



const VipSelect = (props) => {

  const [vips,setVips] = useState([]);

  const queryAllVipData = async () => {
    const res = await queryAllVips({});
    if (isSuccess(res)) {
      return res.data.vips
    }
    return [];
  };

  useEffect(()=>{
    queryAllVipData().then(res=>{
     setVips(res);
   })
  },[]);


  return (
    <Select value={props.value} onChange={props.onChange}>
      {vips.length >0 && vips.map(item=>{
        return (<Select.Option key={item.id} value={item.id} >{item.name}</Select.Option>)
      })}
    </Select>
  );
};

export default VipSelect;
