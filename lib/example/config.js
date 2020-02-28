import React from 'react';

export default [
    {
        field: 'name',
        label: '输入框',
        widget: 'Input',
        options: {
            initialValue: '',
            rules: [
                {
                    required: true,
                    message: '此项必填'
                }
            ]
        },
    },
    {
        field: 'type',
        label: '下拉',
        widget: 'Select',
        childWidget: 'Option',
        props: {
            style: {
                width: '200px',
            },
        },
        dataSource: [
            {
                label: '全部',
                value: '',
            },
            {
                label: '下拉一',
                value: '1',
            },
        ],
        options: {
            initialValue: '',
        },
    },
];
