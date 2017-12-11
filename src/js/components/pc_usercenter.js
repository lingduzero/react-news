import React from 'react';
import {Row, Col} from 'antd';
import {
  Menu,
  Icon,
  Tabs,
  message,
  Form,
  Input,
  Card,
  CheckBox,
  Button,
  notification,
  Upload,
  Modal
} from 'antd';
const FormItem = Form.Item;
const SubMenu = Menu.SubMenu;
const TabPane = Tabs.TabPane;
const MenuItemGroup = Menu.ItemGroup;
import PCHeader from './pc_header';
import PCFooter from './pc_footer';
import {Router, Route, Link, browserHistory} from 'react-router'
export default class PCUserCenter extends React.Component {
  constructor(){
    super();
    this.state = {
      usercollection: '',
      usercomments:'',
      previewImage:'',
      previewVisible: false
    };
  };
  componentDidMount() {
		var myFetchOptions = {
			method: 'GET'
		};
		fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getuc&userid=" + localStorage.userid, myFetchOptions)
		.then(response=>response.json())
		.then(json=>{
			this.setState({usercollection:json});
		});

    fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getusercomments&userid=" + localStorage.userid, myFetchOptions)
		.then(response=>response.json())
		.then(json=>{
			this.setState({usercomments:json});
		});
	};
  render() {
    const props = {
	action: 'http://newsapi.gugujiankong.com/handler.ashx',
	headers: {
		"Access-Control-Allow-Origin":"*"
	},
	listType: 'picture-card',
	defaultFileList:[
		{
			uid:-1,
			name:'xxx.png',
			state: 'done',
			url:'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png',
			thumbUrl:'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png'
		}
	],
	onPreview: (file)=>{
		this.setState({previewImage:file.url,previewVisible:true});
	}
};
  const {usercollection, usercomments} = this.state;
  const usercollectionList = usercollection.length ?
  usercollection.map((uc, index) => (
    <Card key = {index} title={uc.uniquekey} extra={<a target="_blank" href= {`/#/details/${uc.uniquekey}`}>look up</a>}>
      <p>{uc.Title}</p>
    </Card>
  ))
  :
  'No like news, please add some news';

  const usercommentsList = usercomments.length ?
  usercomments.map((comment, index) => (
    <Card key = {index} title={`commented on ${comment.datetime} for ${comment.uniquekey}`} extra={<a target="_blank" href= {`/#/details/${comment.uniquekey}`}>look up</a>}>
      <p>{comment.Comments}</p>
    </Card>
  ))
  :
  'No Comments, please add some comments';
    return (<div>
      <PCHeader/>
      <Row>
        <Col span={2}></Col>
        <Col span={20}>
          <Tabs>
            <TabPane tab="My Like List" key="1">
              <div class="comment">
                <Row>
                  <Col span={24}>
                    {usercollectionList}
                  </Col>
                </Row>
                </div>
            </TabPane>
            <TabPane tab="My Comments List" key="2">
            <div class="comment">
              <Row>
                <Col span={24}>
                  {usercommentsList}
                </Col>
              </Row>
              </div>
            </TabPane>
            <TabPane tab="Photo Config" key="3">
              <div class="clearfix">
                <Upload {...props}>
                  <Icon type="plus" />
                  <div className="ant-upload-text">Upload Photo</div>
                </Upload>
                <Modal visible = {this.state.previewVisible} footer = {null}
                onCancel = {this.handleCancel}>
                <img alt = "preview" src= {this.state.previewImage} />
                </Modal>
              </div>
            </TabPane>
          </Tabs>
        </Col>
        <Col span={2}></Col>
      </Row>

      <PCFooter/>
    </div>);
  };
}
