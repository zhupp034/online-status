import { Button, Input, message } from 'antd'
import React, { useState } from 'react'

function InputOnline() {
    
  return (
    <div
        style={{
          width: '500px',
          padding: 16
        }}>
        <div className="content">
          <label>输入online</label>
          <Input onChange={changeOnline}/>
        </div>
        <Button type="primary">解析</Button>
      </div>
  )
}

export default InputOnline