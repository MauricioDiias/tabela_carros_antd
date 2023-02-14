import React, { useState } from 'react';
import { Table, Button, Form, Input, Modal } from 'antd';

function Pedra2() {
    const origemData = [
        {
            key: '1',
            name: 'John Doe',
            age: 32,
        },
        {
            key: '2',
            name: 'Jane Doe',
            age: 42,
        },
    ];
    const columns = [
        {
            title: 'Nome',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Idade',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Ação',
            key: 'action',
            render: (text, record) => (
                <>
                <span>
                    <Button onClick={() => handleEdit(record)}>Editar</Button>
                </span>
                </>
            ),
        },
    ];

    function handleEdit(record) {
        setEditing(true);
        setCurrentData(record);

        setOpenModal(true);
    }

    function handleSave(values) {
        const updatedData = data.map((item) => {
            if (item.key === currentData.key) {
                return { ...item, ...values };
            }
            return item;
        }
        );
        setData(updatedData);
        setEditing(false);
    }


    const [editing, setEditing] = useState(false);
    const [currentData, setCurrentData] = useState({});
    const [data, setData] = useState(origemData);
    
    const[openModal,setOpenModal]=useState(false)

    return (
        <div>
            {editing ? (
                <Modal title="Basic Modal" open={openModal}>

                    <Form
                        initialValues={currentData}
                        onFinish={handleSave}
                    >
                        <Form.Item
                            label="Nome"
                            name="name"
                            rules={[{ required: true, message: 'Please input your name!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Idade"
                            name="age"
                            rules={[{ required: true, message: 'Please input your age!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Salvar
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
            ) : (
                <Table columns={columns} dataSource={data} />
            )}
        </div>
    );
}

export default Pedra2;
