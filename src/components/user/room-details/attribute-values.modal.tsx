import {
  Button,
  Checkbox,
  Col,
  Form,
  FormProps,
  Input,
  Modal,
  Row,
  Select,
  Space,
  Typography,
} from "antd";
import { IRoom } from "../../../api/room.api";
import { IDevice } from "../../../api/device.api";
import {
  DeviceAttributeApi,
  IDeviceAttribute,
  IDeviceAttributeResponse,
} from "../../../api/device-attribute.api";
import { use, useEffect, useState } from "react";
import {
  DeviceAttributeValueApi,
  IDeviceAttributeValue,
} from "../../../api/device-attribute-value";
import { toast } from "react-toastify";

const { Text, Link } = Typography;

interface IProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onSuccess: () => void;
  room: IRoom | null;
  device?: IDevice | null;
}

const AttributeValuesModal = ({
  open,
  setOpen,
  onSuccess,
  room,
  device,
}: IProps) => {
  const [deviceAttributes, setDeviceAttributes] = useState<IDeviceAttribute[]>(
    []
  );
  const [deviceAttributeValues, setDeviceAttributeValues] = useState<
    IDeviceAttributeValue[]
  >([]);

  let originalDeviceAttributeValues: IDeviceAttributeValue[] = [];

  useEffect(() => {
    const fetchDeviceAttributes = async () => {
      try {
        // Fetch device attributes based on the device ID
        const response = await DeviceAttributeApi.getAllDeviceAttributes(
          device?.device_type_id.id
        );
        setDeviceAttributes(response.data.data?.message.attributes || []);
        console.log(response.data.data?.message.attributes || []);
      } catch (error) {
        console.error("Error fetching device attributes:", error);
      }
    };

    const fetchDeviceAttributeValues = async () => {
      try {
        const response =
          await DeviceAttributeValueApi.getAllDeviceAttributeValues(
            device?.id!
          );
        setDeviceAttributeValues(response.data.data?.message.items || []);
        originalDeviceAttributeValues = response.data.data?.message.items || [];
      } catch (error) {
        console.error("Error fetching device attribute values:", error);
      }
    };

    if (device) {
      fetchDeviceAttributes();
      fetchDeviceAttributeValues();
    }
  }, [device]);

  const handleSubmit = async () => {
    deviceAttributes.forEach(async (attribute) => {
      try {
        const attributeValue = deviceAttributeValues.find(
          (item) => item.deviceAttributeId.id === attribute.id
        );

        if (attributeValue) {
          const data = {
            deviceId: device?.id!,
            deviceAttributeId: attribute.id,
            value: attributeValue.value,
          };

          const originalValue = originalDeviceAttributeValues.find(
            (item) => item.deviceAttributeId.id === attribute.id
          );
          if (originalValue) {
            await DeviceAttributeValueApi.updateDeviceAttributeValue(
              originalValue.id,
              data
            );
          } else {
            await DeviceAttributeValueApi.createDeviceAttributeValue(data);
          }
        }
        onSuccess();
        setOpen(false);
        toast.success("Cập nhật thành công!");
      } catch (error) {
        console.error("Error updating device attribute value:", error);
      }
    });
  }

  return (
    <div>
      <Modal
        title="Thông số thiết bị"
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
        width={800}
      >
        <Row gutter={16}>
          {deviceAttributes.map((attribute) => (
            <Col span={12} key={attribute.id}>
              <div style={{ marginBottom: 16 }}>
                <label
                  style={{ display: "block", marginBottom: 4, fontWeight: 500 }}
                >
                  {attribute.name}
                </label>
                <Input
                  value={deviceAttributeValues.find(value => value.deviceAttributeId.id === attribute.id)?.value}
                  onChange={(e) => {
                    const value = e.target.value;
                    setDeviceAttributeValues((prev) => {
                      const existingValue = prev.find(
                        (item) => item.deviceAttributeId.id === attribute.id
                      );
                      if (existingValue) {
                        return prev.map((item) =>
                          item.deviceAttributeId.id === attribute.id
                            ? { ...item, value }
                            : item
                        );
                      } else {
                        const newValue: IDeviceAttributeValue = {
                          id: "", // Set to empty string for new values
                          deviceId: device!,
                          deviceAttributeId: attribute,
                          value,
                        };

                        return [...prev, newValue];
                      }
                    });
                  }}
                  placeholder={`Nhập ${attribute.name}`}
                  addonAfter={<Text italic>{attribute.unit}</Text>}
                />
              </div>
            </Col>
          ))}
        </Row>

        <div style={{ textAlign: "right", marginTop: 24 }}>
          <Button onClick={handleSubmit} type="primary">
            Submit
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default AttributeValuesModal;