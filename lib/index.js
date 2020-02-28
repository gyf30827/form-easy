import React, { useEffect, useState } from 'react';
import { Form } from 'antd';
import * as Antd from 'antd';
import { isFunction } from './utils';
import CustomerComponent from './components';
import './index.less';

const FormItem = Form.Item;

const FormEasy = props => {
    const { schema, form, ...formProps } = props;
    const { getFieldDecorator } = form;
    const [_options, setOptions] = useState({});
    useEffect(() => {
        schema.forEach(async item => {
            let { dataSource, field } = item;
            if (!_options[field] && isFunction(dataSource)) {
                dataSource = await dataSource();
            }
            _options[field] = dataSource;
            setOptions(JSON.parse(JSON.stringify(_options)));
        });
    }, [schema]);
    return (
        <Form className="form-easy" {...formProps}>
            <div className="form-item-wrap">
                {(schema || []).reduce((all, item) => {
                    const {
                        field,
                        widget = 'Input',
                        options = {},
                        label,
                        props,
                        itemProps,
                        required,
                        childWidget,
                    } = item;
                    const Com = Antd[widget] || CustomerComponent[widget] || widget;
                    let visible = item.visible === undefined ? true : item.visible;
                    if (isFunction(visible)) {
                        visible = visible(form);
                    }
                    if (visible) {
                        all.push(
                            <FormItem
                                key={field}
                                {...(itemProps || {})}
                                label={label}
                                required={required}
                            >
                                {getFieldDecorator(
                                    field,
                                    options
                                )(
                                    isFunction(Com) ? (
                                        <Com {...(props || {})} form={form}>
                                            {_options[field] &&
                                                _options[field].map(item => {
                                                    const ChildWidget = Com[childWidget];
                                                    return (
                                                        <ChildWidget
                                                            key={item.value}
                                                            value={item.value}
                                                        >
                                                            {item.label}
                                                        </ChildWidget>
                                                    );
                                                })}
                                        </Com>
                                    ) : (
                                        Com
                                    )
                                )}
                            </FormItem>
                        );
                    }
                    return all;
                }, [])}
            </div>
            {props.children}
        </Form>
    );
};

export default FormEasy;
