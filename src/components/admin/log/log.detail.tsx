import { Descriptions, Drawer, Typography } from "antd";
import { ILog } from "../../../api/log.api";

interface ILogDetailProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  log: ILog | null;
  setLog: (log: ILog | null) => void;
}

const LogDetail = ({ open, setOpen, log, setLog }: ILogDetailProps) => {
  return (
    <>
      <Drawer
        title="Log Detail"
        placement="right"
        onClose={() => {
          setOpen(false);
          setLog(null);
        }}
        open={open}
        width={"50%"}
      >
        <Descriptions
          bordered
          column={1}
          labelStyle={{ fontWeight: "bold" }}
          contentStyle={{ fontSize: 16 }}
        >
          <Descriptions.Item label="Id">{log?.id}</Descriptions.Item>
          <Typography.Text strong>Device</Typography.Text>
          <Descriptions.Item label="Device Id">
            {log?.deviceId.id}
          </Descriptions.Item>
          <Descriptions.Item label="Device Name">
            {log?.deviceId.name}
          </Descriptions.Item>
          <Descriptions.Item label="Device Type">
            {log?.deviceId.device_type_id.name}
          </Descriptions.Item>
          <Descriptions.Item label="Device Room">
            {log?.deviceId.room_id.name}
          </Descriptions.Item>
          <Typography.Text strong>Attribute</Typography.Text>
          <Descriptions.Item label="Attribute Id">
            {log?.changedAttribute.id}
          </Descriptions.Item>
          <Descriptions.Item label="Attribute Name">
            {log?.changedAttribute.name}
          </Descriptions.Item>
          <Descriptions.Item label="Old Value">
            {log?.oldValue}
          </Descriptions.Item>
          <Descriptions.Item label="New Value">
            {log?.newValue}
          </Descriptions.Item>
        </Descriptions>
      </Drawer>
    </>
  );
};

export default LogDetail;
