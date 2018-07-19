import React from 'react';
import {
  pageSchemaToReact
} from '@martingale/page-schema';
import pathToRegexp from 'path-to-regexp';
import Components from '../../../components';

const COMPONENT_NAMES = Object.keys(Components);
const {
  HeaderPage,
  Panel,
  Row,
  Form,
  Button,
  Alert
} = Components;

const SAMPLE_SOURCE=`{
  $type: 'HeaderPage',
  props: {
    title: 'Sample page'
  },
  children: {
    $type: 'Panel',
    props: {
      inset: true
    },
    children: {$map: '\`Hello \${params.name||"world"}!\`'}
  }
}`;

const UI_SCHEMA = {
  params: {
    'ui:widget': 'textarea'
  },
  layout: {
    'ui:widget': 'textarea'
  }
};

const FORM_SCHEMA = {
  type: 'object',
  required: ['path', 'layout'],
  properties: {
    path: {type: 'string'},
    params: {type: 'string'},
    sideNav: {type: 'boolean', default: false},
    icon: {type: 'string'},
    caption: {type: 'string'},
    layout: {type: 'string'}
  }
};

const getComponentDescription = (componentName)=>{
  const component = Components[componentName];
  const propNames = Object.keys(component.propTypes||{});
  const props = <ul>{propNames.map(n=><li key={n}>{n}</li>)}</ul>
  return [
    <dt key={componentName}>{componentName}</dt>,
    <dd>{props}</dd>
  ];
};

const components = <dl>{COMPONENT_NAMES.sort().map(getComponentDescription)}</dl>;

class Editor extends React.Component{
  render(){
    const {
      onChange,
      ...data
    } = this.props;
    return (
      <Row>
        <Panel md={10} inset={true}>
          <Form schema={FORM_SCHEMA} uiSchema={UI_SCHEMA} data={data} onChange={onChange} />
        </Panel>
        <Panel header="Available Components" inset={true} md={2} maxHeight={500}>
          {components}
        </Panel>
      </Row>
    );
  }
};

class Preview extends React.Component{
  constructor(props){
    super();
    this.state = {path: props.path};
  }

  evalSource(source){
    try{
      // eslint-disable-next-line
      const f = new Function('', `return ${source}`);
      return f();
    }catch(e){
      try{
        // eslint-disable-next-line
        const f = new Function('', source);
        return f();
      }catch(e2){
        return e2;
      }
    }
  }

  getLayout(){
    return this.evalSource(this.props.layout);
  }

  getProps(){
    const keys = [];
    const path = this.state.path;
    const re = pathToRegexp(this.props.path, keys);
    const args = re.exec(path)||[];
    let props = {};
    for(let i = 0; i<keys.length; i++){
      const key = keys[i].name;
      const value = args[i+1];
      props = Object.assign({}, props, {[key]: value});
    }
    return props;
  }

  updateView(e){
    e.preventDefault();
    const path = this.editor.value;
    this.setState({path});
  }

  getPreview(){
    const props = this.getProps();
    const layout = this.getLayout();
    try{
      return layout instanceof Error?<div>{layout.toString()}</div>:pageSchemaToReact({
        layout,
        components: Components,
        props
      });
    }catch(e){
      const message = e.toString();
      const args = e.args;
      const source = e.source;
      const data = e.data;
      return (
        <Panel inset={true}>
          <Alert type="danger"><strong>Error:</strong> {message}</Alert>
          <p><strong>Args:</strong> <pre>{args.join(', ')}</pre></p>
          <p><strong>Data:</strong> <pre>{JSON.stringify(data, null, 2)}</pre></p>
          <p><strong>Source:</strong> <pre>{source}</pre></p>
        </Panel>
      );
    }
  }

  render(){
    const preview = this.getPreview();

    return (
      <div>
        <Panel inset={true}>
          <div className="form-group">
            <label>Test URL:</label>
            <input className="form-control" ref={(editor)=>this.editor=editor} defaultValue={this.state.path} />
          </div>
          <Button className="btn-primary" onClick={this.updateView.bind(this)}>Update</Button>
        </Panel>
        {preview}
      </div>
    );
  }
};

class Designer extends React.Component{
  constructor(){
    super();
    this.state = {
      mode: 'edit',
      path: '/hello/:name',
      layout: SAMPLE_SOURCE
    };
  }

  formUpdated({errors, formData}){
    if(errors && errors.length){
      return;
    }
    this.setState(formData);
  }

  switchMode(e){
    e.preventDefault();
    this.setState({mode: this.state.mode === 'edit'?'preview':'edit'});
  }

  render(){
    const {
      mode,
      ...options
    } = this.state;
    const editing = mode === 'edit';
    const actionCaption = editing?'Preview':'Edit';
    const titlebar = <span>Pack Page Designer <Button onClick={this.switchMode.bind(this)}>{actionCaption}</Button></span>;
    const view = editing?<Editor onChange={this.formUpdated.bind(this)} {...options} />:<Preview {...options} />;
    return (
      <div>
        <HeaderPage title={titlebar}>
          {view}
        </HeaderPage>
      </div>
    );
  }
}

const settings = {
  path: '/designer',
  icon: 'Logo',
  sideNav: true,
  caption: 'Designer'
};

Object.keys(settings).forEach((key)=>Designer[key]=settings[key])

export default Designer;
