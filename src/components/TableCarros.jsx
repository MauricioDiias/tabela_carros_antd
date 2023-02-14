import { Form, Input, Tag, Table, Modal, Button, Option, Select } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import { useState } from 'react';
import './Lista'
import { carros } from './Lista';

const originData = carros;

const TableCarros = () => {

    const columns = [
        {
            title: 'Modelo',
            dataIndex: 'modelo',
            width: '10%',
            fixed: 'left',
            editable: true,
            sorter: (a, b) => a.modelo.localeCompare(b.modelo),
        },
        {
            title: 'Marca',
            dataIndex: 'marca',
            width: '10%',
            editable: true,
        },
        {
            title: 'Ano',
            dataIndex: 'ano',
            width: '10%',
            editable: true,
        },
        {
            title: 'Potência',
            dataIndex: 'potencia',
            width: '10%',
            editable: true,
        },
        {
            title: 'Cor',
            dataIndex: 'cor',
            width: '10%',
            editable: true,
        },
        {
            title: 'Combustivel',
            dataIndex: 'combustivel',
            width: '10%',
            editable: true,
        },
        {
            title: 'Acessórios',
            dataIndex: 'acessorios',
            width: 100,
            editable: true,
            render: (_, { acessorios }) => (
                <>
                    {acessorios.map((acessorio) => {
                        let color = 'geekblue';
                        return (
                            <Tag color={color} key={acessorio} style={{ margin: '3px' }}>
                                {acessorio.toUpperCase()}
                            </Tag>
                        );
                    })}
                </>
            ),
        },
        {
            title: 'Operation',
            dataIndex: 'operation',
            width: '10%',
            render: (_, record) => {
                return (
                    <span>
                        <Button onClick={() => handleEdit(record)}>Editar</Button>
                    </span>
                );
            },
        },
    ];


    const [editing, setEditing] = useState(false)
    const [openModal, setOpenModal] = useState(false)
    const [data, setData] = useState(originData);
    const [currentData, setCurrentData] = useState({})
    function handleEdit(record) {
        setEditing(true);
        setCurrentData(record);
        setOpenModal(true);

    }

    // function handleChange(value)  {
    //     console.log(`selected ${value}`)
    //     console.log(value)

    // }

    


    function handleSave(values) {
        console.log(values)
        console.log(currentData)

        const updatedData = data.map((item) => {
            if (item.key === currentData.key) {
                return { ...item, ...values }
            }
            return item
        });
        setData(updatedData)
        setEditing(false)
    }

    return (<>
        {editing ? (
            <Modal footer={null} onCancel={handleSave} open={openModal} >
                <Form style={{ marginTop: '30px' }}
                    initialValues={{ ...currentData }}
                    onFinish={handleSave}
                >
                    <FormItem
                        label='Modelo'
                        name='modelo'
                        rules={[{ required: true, message: 'Por Favor Digite um Modelo!' }]} >
                        <Input />
                    </FormItem>
                    <FormItem
                        label='Marca'
                        name='marca'
                        rules={[{ required: true, message: 'Por Favor Digite uma Marca!' }]}>
                        <Input />
                    </FormItem>
                    <FormItem
                        label='Ano'
                        name='ano'
                        rules={[{ required: true, message: 'Por Favor Digite um Ano!' }]}>
                        <Input />
                    </FormItem>
                    <FormItem
                        label='Potência'
                        name='potencia'
                        rules={[{ required: true, message: 'Por Favor Digite o valor da Potência!' }]}>
                        <Input />
                    </FormItem>
                    <FormItem
                        label='Cor'
                        name='cor'
                        rules={[{ required: true, message: 'Por Favor Digite uma Cor' }]}>
                        <Input />
                    </FormItem>
                    <FormItem
                        label='Combustível'
                        name='combustivel'
                        rules={[{ required: true, message: 'Por Favor Digite um Tipo de Combutível' }]}>
                        <Input />
                    </FormItem>

                    <FormItem
                        label='Acessorios'
                        name='acessorios'
                        rules={[{ required: true, message: 'Por Favor Digite os acessorios do carro!' }]}>
                        <Select
                            mode="tags"
                            style={{ width: '100%' }}
                            placeholder="Please select"
                        />
                    </FormItem>
                   


                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Salvar
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        ) : (
            <Table
            scroll={{
                x: 1500,
                y: 410,}}
                dataSource={data}
                columns={columns}
                rowClassName="editable-row"
            />
        )}
    </>
    );
};
export default TableCarros;