import { Checkbox, Col, Form, FormProps, Input, Modal, Row, Select } from "antd";
import { IRoom } from "../../../api/room.api";
import { IDevice } from "../../../api/device.api";
import { DeviceAttributeApi, IDeviceAttribute, IDeviceAttributeResponse } from "../../../api/device-attribute.api";
import { use, useEffect, useState } from "react";

interface IProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onSuccess: () => void;
  room: IRoom | null;
  device?: IDevice | null;
}

const AttributeValuesModal = ({ open, setOpen, onSuccess, room, device }: IProps) => {
    const [deviceAttributes, setDeviceAttributes] = useState<IDeviceAttribute[]>([]);

    useEffect(() => {
        const fetchDeviceAttributes = async () => {
            try {
                // Fetch device attributes based on the device ID
                const response = await DeviceAttributeApi.getAllDeviceAttributes(device?.id!);
                setDeviceAttributes(response.data.data?.message.attributes || []);
            } catch (error) {
                console.error("Error fetching device attributes:", error);
            }
        };

        if (device) {
            fetchDeviceAttributes();
        }
    }, [device]);

    return (
        <div>
        <h2>Attribute Values Modal</h2>
        {/* Add your modal content here */}
        </div>
    );
};

export default AttributeValuesModal;