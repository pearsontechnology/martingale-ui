import React from 'react';
import Components from '../../components';

const {
  BaseDialog,
} = Components;

import {
  Modal,
  Button,
} from 'react-bootstrap';

import {
  pageSchemaToReact
} from 'martingale-page-schema';

//*
const creaetActionHandler = (actionName, action, dialog)=>{
  if(!action){
    throw new Error(`Malformed action ${actionName}`);
  }
  const handler = action.handler || action;
  if(typeof(handler)==='function'){
    return (e)=>{
      e&&e.preventDefault();
      handler(dialog);
    };
  }
  throw new Error(`No handler specified on action: ${actionName}`);
};

const getDialogFooter = (footer, actions, dialog)=>{
  if(footer){
    return (
      <Modal.Footer>
        {footer}
      </Modal.Footer>
    );
  }
  if(actions){
    const actionButtons = Object.keys(actions).map((actionName)=>{
      const action = actions[actionName];
      return (
        <button key={actionName} onClick={creaetActionHandler(actionName, action, dialog)} className={`btn btn-${action.btnStyle||'primary'}`}>{actionName}</button>
      );
    });
    return (
      <Modal.Footer>
        {actionButtons}
      </Modal.Footer>
    );
  }
  return '';
};

class Dialog extends React.Component{
  constructor({
      visible = false,
      title,
      message,
      children,
      footer,
      actions,
      onHide
    }){
    super();
    this.contents = message || children;
    this.state = {visible};
    this.footer = getDialogFooter(footer, actions, this);
  }

  close(){
    return this.setState({visible: false});
  }

  open(){
    return this.setState({visible: true});
  }

  render(){
    const {
      title
    } = this.props;
    const {
      visible
    } = this.state;
    const {
      contents,
      footer
    } = this;
    return (
      <Modal show={visible} onHide={this.close.bind(this)}>
        <Modal.Header>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {contents}
        </Modal.Body>
        {footer}
      </Modal>
    );
  }
};
//*/

const TEST_ACTIONS={
  Ok(dialog){
    dialog.close();
  }
};

class Example extends React.Component{
  open(){
    this.dialog.open();
  }

  render() {
    return (
      <span>
        <Button
          bsStyle="primary"
          onClick={this.open.bind(this)}
        >
          Launch demo modal
        </Button>

        <Dialog
          ref={(dialog)=>this.dialog=dialog}
          title="Dialog Title"
          visible={false}
          actions={TEST_ACTIONS}
          >
            Hello world Dialog!
        </Dialog>
      </span>
    );
  }
};

const panelChildren = ()=>{
  return (
    <Example />
  );
};

const Page = ()=>pageSchemaToReact({
  layout: {
    type: 'HeaderPage',
    props: {
      title: 'Dashboard'
    },
    children: {
      type: 'Panel',
      props: {
        inset: true,
        title: 'Title',
        footer: 'Footer'
      },
      children: [
        'Hello World!',
        panelChildren(),
        {
          type: 'InfoButton',
          props: {
            btnStyle: 'primary',
            caption: 'Info Button',
            dialogTitle: 'Something Interesting',
            dialogMessage: 'Some information about something interesting.',
            onOk(dialog){console.log('User clicked ok'); dialog.hide()},
          }
        }
      ]
      /*
      children: [
        'Hello World!',
        {
          type: 'InfoButton',
          props: {
            btnStyle: 'primary',
            caption: 'Info Button',
            dialogTitle: 'Something Interesting',
            dialogMessage: 'Some information about something interesting.',
            onOk(dialog){console.log('User clicked ok'); dialog.hide()},
          }
        }
      ]*/
    }
  }, components: Components});

Page.path = '/';

export default Page;
