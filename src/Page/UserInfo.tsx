import React, { useEffect } from "react";
import "./UserInfo.less";
import { Form, Input, Select, Switch } from "antd";
import { RoleIdMap } from "~src/utils";
import { useForm } from "antd/es/form/Form";
function UserInfo({ info }) {
  console.log({ info });

  useEffect(() => {
    infoForm.setFieldsValue({...info});
  }, [info]);

  const [infoForm] = Form.useForm();

  return (
    <div className="user-info">
      <p>{JSON.stringify(info)}</p>
      <Form
        // initialValues={{canDraw: 1}}
        form={infoForm}
        disabled
        size="small"
        // layout="inline"
        name="basic"
        labelCol={{ flex: "110px" }}
        // labelAlign="left"
        labelWrap
        wrapperCol={{ flex: 1 }}
        style={{ maxWidth: 600 }}
        autoComplete="off"
      >
        <Form.Item label="用户名" name="userName">
          <Input />
        </Form.Item>
        <Form.Item label="用户id" name="userId">
          <Input />
        </Form.Item>
        <Form.Item label="角色" name="roleId">
          <Select
            options={[
              { value: RoleIdMap.master, label: "主持人" },
              { value: RoleIdMap.participant, label: "参会人" },
              { value: RoleIdMap.audience, label: "列席旁听" },
            ]}
          />
        </Form.Item>
        <Form.Item label="是否在线" name="online" valuePropName="checked">
          <Switch />
        </Form.Item>
        <Form.Item label="麦克风状态" name="canAudio" valuePropName="checked">
        <Switch />
        </Form.Item>
        <Form.Item label="摄像头状态" name="canVideo" valuePropName="checked">
          <Switch />
        </Form.Item>
        <Form.Item label="连线状态" name="personPermission" valuePropName="checked">
          <Switch />
        </Form.Item>
        <Form.Item label="画笔授权状态" name="canDraw" valuePropName="checked">
          <Switch />
        </Form.Item>

        <Form.Item label="举手状态" name="isHandUp" valuePropName="checked">
          <Switch />
        </Form.Item>

        <Form.Item label="邀请连线状态" name="connecting" valuePropName="checked">
          <Switch />
        </Form.Item>
        <Form.Item label="邀请视频状态" name="videoInvite" valuePropName="checked">
          <Switch />
        </Form.Item>
        <Form.Item label="禁言状态" name="banned" valuePropName="checked">
          <Switch />
        </Form.Item>
      </Form>
    </div>
  );
}

export default UserInfo;
