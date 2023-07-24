import { Input, Space, message } from "antd";
import Button from "antd/es/button";

import { ThemeProvider } from "~src/theme";
import "./pupup.less";
import { useEffect, useState } from "react";
import { formatUser } from "~src/utils";
import UserInfo from "~src/Page/UserInfo";
import { useStorage } from "@plasmohq/storage/hook";
function IndexPopup() {
  const [checked, setChecked] = useStorage("userInfo");

  const [onlineString, setOnlineString] = useState([]);

  const [userInfo, setUserInfo] = useState("");

  const [inputValue, setInputValue] = useState('')

  

  useEffect(() => {
    chrome.storage.sync.get(["userInfo",'inputValue'], function (result) {
      setUserInfo(result?.userInfo);
      setInputValue(result?.inputValue);
      console.log(
        { result }
      );
    });
  }, []);

  function startParse() {
    
    let arr = [];
    try {
      arr = JSON.parse(inputValue);
    } catch (error) {
      // message.error('格式错误')
    }

    console.log({arr, inputValue});
    
    
    if (Array.isArray(arr)) {
      const info = formatUser(arr, {isMeeting: true});
      setUserInfo(info);
      // setChecked(info);
    chrome.storage.sync.set({ userInfo: info }, function () {
      console.log("Value is set to " + info);
    });
      
    }
    
  }

  function inputChange(v) {
    const value = v.target.value
    console.log({value});
    
    setInputValue(value)
    chrome.storage.sync.set({ inputValue: v.target.value }, function () {
    });
  }

  function resetInput() {
    setInputValue('')
  }

  function resetInfo() {
    setUserInfo("");
    chrome.storage.sync.clear();
  }

  return (
    <ThemeProvider>
      <div
        style={{
          width: "500px",
          padding: 16,
        }}
      >
        <div className="content">
          <label>输入online</label>
          <Input.TextArea autoSize value={inputValue} onChange={inputChange} allowClear />
          <Space>
            <Button type="primary" onClick={startParse}>
              解析
            </Button>
            <Button type="primary" onClick={resetInput}>
              重置输入
            </Button>
          </Space>
        </div>
      
        {userInfo && <UserInfo info={userInfo} />}

        <Space>
          <Button type="primary" onClick={resetInfo}>
            清除缓存
          </Button>
        </Space>
      </div>
    </ThemeProvider>
  );
}

export default IndexPopup;
