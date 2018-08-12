import React from "react";
import styled from "styled-components";
import { Collapse, Alert, List, Avatar,Icon  } from 'antd';
import io from 'socket.io-client';

const Panel = Collapse.Panel;

const AboutContainer = styled.div`
  margin:10px;
  .ant-collapse{
    border-radius: 0;
  }
  .privacyInfo{
    padding:12px;
    background: #f7f7f7;
    border-radius: 0;
    border: 0;
  }
`;
const customPanelStyle = {
  background: '#f7f7f7',
  borderRadius: 0,
  border: 0,
  padding:0,
  overflow: 'hidden',
};
const privacyData =[
  {
    title: i18n("about_privacy_message_0"),
    description : i18n("about_privacy_message_1"),
    type :"1"
  },
  {
    title: i18n("about_privacy_message_2"),
    description : i18n("about_privacy_message_3"),
    type :"1"
  },
  {
    title: i18n("about_privacy_message_4"),
    description : i18n("about_privacy_message_5"),
    type :"1"
  },
  {
    title: i18n("about_privacy_message_6"),
    description : i18n("about_privacy_message_7"),
    type :"2"
  },
];
export default class About extends React.Component{
  constructor(props) {
    super(props);
    this.socket = io('https://ainoob.com:443/');
    this.setupSocket();
    this.state = {
      imageSearch: 0,
      extractImage: 0,
      screenshotSearch: 0,
      videoControl: 0,
      autoRefresh: 0,
    };
  }
  setupSocket() {
    this.socket.on('connect', () => {
      console.log('wut');
      this.getData();
    });
    this.socket.on('imageSearch', type => {
      this.setState({ imageSearch: this.state.imageSearch + 1 });
    });
    this.socket.on('extractImage', type => {
      this.setState({ extractImage: this.state.extractImage + 1 });
    });
    this.socket.on('screenshotSearch', type => {
      this.setState({ screenshotSearch: this.state.screenshotSearch + 1 });
    });
    this.socket.on('videoControl', type => {
      this.setState({ videoControl: this.state.videoControl + 1 });
    });
    this.socket.on('autoRefresh', type => {
      this.setState({ autoRefresh: this.state.autoRefresh + 1 });
    });
  }
  getData() {
    let request = new XMLHttpRequest();
    request.open('GET', 'https://ainoob.com/api/public/data/?x=' + Math.random(), true);
    request.onload = () => {
      if (request.status >= 200 && request.status < 400) {
        let { imageSearch, extractImage, screenshotSearch, videoControl, autoRefresh } = JSON.parse(request.responseText);
        this.setState({ imageSearch, extractImage, screenshotSearch, videoControl, autoRefresh });
      }
    };
    request.send();
  }
  render(){
    console.log(i18n("about_what"));
    return(
      <AboutContainer>
        <Collapse>
          <Panel header = {i18n("about_what")} key="1">
            <h3>{i18n("about_what_message_0")}</h3>
            <ul>
              <li>{i18n("about_what_message_1")}</li>
              <li>{i18n("about_what_message_2")}</li>
              <li>{i18n("about_what_message_3")}</li>
            </ul>
          </Panel>
          <Panel header = {i18n("about_privacy")} key="2">
            <List
              itemLayout="horizontal"
              dataSource={privacyData}
              renderItem={item => (
              <List.Item>
                <List.Item.Meta
                  avatar={item.type == "1" ? <Avatar ><Icon type="exclamation" /></Avatar> :<Avatar><Icon type="check" /></Avatar>}
                  title={item.title}
                  description={item.description}
                />
                </List.Item>
              )}
            />
          </Panel>
          <Panel header = {i18n("about_data")} key="3">
              <p>{i18n("about_data_reason")}</p>
              <ul>
                <li>{i18n('imageSearch')} : {this.state.imageSearch}</li>
                <li>{i18n('extractImages')} : {this.state.extractImage}</li>
                <li>{i18n('screenshotSearch')} : {this.state.screenshotSearch}</li>
                <li>{i18n('videoControl')} : {this.state.videoControl}</li>
                <li>{i18n('autoRefresh')} : {this.state.autoRefresh}</li>
              </ul>
          </Panel>
          <Panel header = {i18n("about_feedback")} key="4">
            test4
          </Panel>
        </Collapse>
      </AboutContainer>
    )
  }
}