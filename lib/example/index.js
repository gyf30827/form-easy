import ReactDom from 'react-dom';
import React from 'react';
import Component from '../../build/js/main';
import schema from './config';
import { Form, Button } from 'antd';
import './index.less';
import 'antd/dist/antd.css';

@Form.create()
class App extends React.Component {
    validate = () => {
        const { validateFields } = this.props.form;
        validateFields((err, value) => {
        })
    }
    render() {
        return <div className="component">
            <Component 
                layout="inline"
                form={this.props.form} schema={schema} 
            />
            <div>
                <Button onClick={this.validate}>校验</Button>
            </div>
        </div>
    }
}

ReactDom.render(<App/>, document.getElementById('stage'));