import React from 'react';
import {
  pageSchemaToReact
} from 'martingale-page-schema';
import Components from '../../../components';
const COMPONENT_NAMES = Object.keys(Components);
const {
  HeaderPage,
  PageHeader,
  Panel,
  Row,
  Col
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
    children: 'Hello World!'
  }
}`;

const getComponentDescription = (componentName)=>{
  const component = Components[componentName];
  const propNames = Object.keys(component.propTypes||{});
  const props = <ul>{propNames.map(n=><li key={n}>{n}</li>)}</ul>
  return [
    <dt key={componentName}>{componentName}</dt>,
    <dd>{props}</dd>
  ];
};

class Editor extends React.Component{
  sourceChanged(e){
    e.preventDefault();
    const value = this.editor.value;
    this.props.onChange && this.props.onChange(value);
  }

  render(){
    const style={
      width: '100%',
      minHeight: '200px'
    };
    const {
      source
    } = this.props;
    return <textarea ref={(editor)=>this.editor=editor} onChange={this.sourceChanged.bind(this)} style={style} defaultValue={source} />;
  }
};

class Designer extends React.Component{
  constructor(){
    super();
    this.state = {
      source: SAMPLE_SOURCE,
      params: {}
    };
  }

  editorChanged(source){
    this.setState({source});
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
    return this.evalSource(this.state.source);
  }

  parametersChanged(newParams){
    const params = this.evalSource(newParams);
    if(params instanceof Error){
      return;
    }
    this.setState({params});
  }

  render(){
    const layout = this.getLayout();
    const preview = layout instanceof Error?`${layout.toString()}`:pageSchemaToReact({
              layout,
              components: Components,
              props: this.state.params
            });
    const components = <dl>{COMPONENT_NAMES.sort().map(getComponentDescription)}</dl>
    return (
      <div>
        <HeaderPage title="Pack Designer">
          <Row>
            <Col md={10}>
              <Panel header="Parameters" inset={true}>
                <Editor source={JSON.stringify(this.state.params, null, 2)} onChange={this.parametersChanged.bind(this)}/>
              </Panel>
              <Panel header="Source" inset={true}>
                <Editor source={this.state.source} onChange={this.editorChanged.bind(this)}/>
              </Panel>
            </Col>
            <Panel header="Available Components" inset={true} md={2} maxHeight={500}>
              {components}
            </Panel>
          </Row>
        </HeaderPage>
        <PageHeader>Preview</PageHeader>
        {preview}
      </div>
    );
  }
}

const settings = {
  path: '/designer',
  icon: 'Kitchensink',
  sideNav: true,
  caption: 'Designer'
};

Object.keys(settings).forEach((key)=>Designer[key]=settings[key])

export default Designer;
