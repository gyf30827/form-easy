import React from 'react';
import { Select } from 'antd';
import { debounce } from '../../utils';

const { Option } = Select;

class AsyncSelect extends React.Component {
    state = {
        dataSource: [],
        _dataSource: [],
    };
    updateDataSource = async (value, props) => {
        const { dataSource, form } = props;
        if (dataSource instanceof Function) {
            const data = (await dataSource(value, form)) || [];
            this.setState({
                dataSource: data,
            });
        } else if (dataSource instanceof Array) {
            this.setState({
                dataSource,
            });
        }
    };
    selectChange = (value, el) => {
        this.props.onChange(value, el ? el.props.data : null, this.props.form);
    };
    componentDidUpdate(preProps) {
        if (this.props.dataChangeUpdata && preProps.dataSource !== this.props.dataSource) {
            this.updateDataSource('', this.props);
        }
    }
    componentDidMount() {
        this.updateDataSource('', this.props);
    }
    render() {
        const { value, onChange, form, delay = 300, ...other } = this.props;
        return (
            <Select
                style={{ width: 200 }}
                {...other}
                value={value}
                onChange={this.selectChange}
                onSearch={debounce(value => {
                    if (this.props.onSearch) {
                        this.props.onSearch(value, form);
                    } else {
                        this.updateDataSource(value, this.props);
                    }
                }, delay)}
            >
                {(this.state.dataSource || []).map(item => {
                    return (
                        <Option key={item.value} value={item.value} data={item.data || {}}>
                            {item.label}
                        </Option>
                    );
                })}
            </Select>
        );
    }
}

export default AsyncSelect;
