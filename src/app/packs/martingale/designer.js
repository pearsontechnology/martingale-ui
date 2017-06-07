import React from 'react';
import {
  pageSchemaToReact
} from 'martingale-page-schema';
import Components from '../../../components';
const {
  HeaderPage,
  PageHeader,
  Panel
} = Components;

class Editor extends React.Component{
  sourceChanged(e){
    e.preventDefault();
    const value = this.editor.value;
    this.props.onChange && this.props.onChange(value);
  }

  render(){
    const style={
      width: '100%',
      minHeight: '100px'
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
    this.state = {source: `{
  $type: 'Panel',
  children: 'Hello World!'
}`, params: {}};
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
    return (
      <div>
        <HeaderPage title="Pack Designer">
          <Panel header="Parameters" inset={true}>
            <Editor source={JSON.stringify(this.state.params, null, 2)} onChange={this.parametersChanged.bind(this)}/>
          </Panel>
          <Panel header="Source" inset={true}>
            <Editor source={this.state.source} onChange={this.editorChanged.bind(this)}/>
          </Panel>
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
