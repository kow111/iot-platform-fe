import { Checkbox, Col, Form, FormProps, Input, Modal, Row, Select } from "antd";
import { IRoom } from "../../../api/room.api";
import { DeviceApi, ICreateDevice, IDevice } from "../../../api/device.api";
import { DeviceTypeApi, IDeviceType } from "../../../api/device-type.api";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface IProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onSuccess: () => void;
  room: IRoom | null;
  device?: IDevice | null;
}

const CreateDeviceModal = ({ room, open, setOpen, onSuccess, device }: IProps) => {
  const [form] = Form.useForm<ICreateDevice>();
  const [deviceTypes, setDeviceTypes] = useState<IDeviceType[]>([]);

  useEffect(() => {
    const fetchDeviceTypes = async () => {
      try {
        const response = await DeviceTypeApi.getAllDeviceTypes();
        setDeviceTypes(response.data.data || []);
      } catch (error) {
        console.error("Error fetching device types:", error);
      }
    };

    fetchDeviceTypes();
  }, []);

  useEffect(() => {
    if (device) {
      form.setFieldsValue({
        name: device.name,
        position: device.position,
        deviceTypeId: device.device_type_id.id,
      });
    } else {
      form.resetFields();
    }
  }, [device, form]);

  const handleSubmit = async () => {
    const values = await form.validateFields();
    if (!values) return;
    const data: ICreateDevice = {
      name: values.name,
      position: Number(values.position),
      deviceTypeId: values.deviceTypeId,
      roomId: room?.id!,
    };
    try {
      let response;
      if (device) {
        response = await DeviceApi.updateDevice(device.id, data);
      }
      else {
        response = await DeviceApi.createDevice(data);
      }
      form.resetFields();
      setOpen(false);
      onSuccess();
      toast.success((device ? "Cập nhật" : "Thêm") + " thiết bị thành công!");
    } catch (error) {
      console.error("Error creating or updating device:", error);
    }
  }

  return (
    <Modal
      title={device ? "Cập nhật thiết bị" : "Thêm thiết bị"}
      cancelText="Hủy"
      open={open}
      onOk={() => {
        form.submit();
      }}
      onCancel={() => {
        form.resetFields();
        setOpen(false);
      }}
      width={"50%"}
    >
      <Form
        name="layout-multiple-horizontal"
        layout="vertical"
        form={form}
        onFinish={() => {
          handleSubmit();
        }}
      >
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              label="Tên thiết bị"
              name="name"
              rules={[{ required: true, message: "Please input device name!" }]}
            >
              <Input placeholder="Nhập tên thiết bị" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Vị trí"
              name="position"
              rules={[{ required: true, message: "Please input position!" }]}
            >
              <Input type="number" placeholder="Nhập vị trí" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Loại thiết bị"
              name="deviceTypeId"
              rules={[{ required: true, message: "Please select device type!" }]}
            >
              <Select placeholder="Chọn loại thiết bị">
                {deviceTypes.map((type) => (
                  <Select.Option key={type.id} value={type.id}>
                    {type.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default CreateDeviceModal;
