import React from 'react';
import {Row, Col} from 'antd';
import {Tabs, Carousel} from 'antd';
const TabPane = Tabs.TabPane;
import PCNewsBlock from './pc_news_block';
import PCNewsImageBlock from './pc_news_image_block';
import PCProduct from './pc_product';
export default class PCNewsContainer extends React.Component {
  render(){
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      autoplay: true
    }
    return (
      <div>
        <Row>
          <Col span = {2}></Col>
          <Col span = {20} class="container">
            <div class="leftContainer">
              <div class="carousel">
                <Carousel {...settings}>
                  <div>
                    <img src="./src/images/carousel_1.jpg" />
                  </div>
                  <div>
                    <img src="./src/images/carousel_2.jpg" />
                  </div>
                  <div>
                    <img src="./src/images/carousel_3.jpg" />
                  </div>
                  <div>
                    <img src="./src/images/carousel_4.jpg" />
                  </div>
                </Carousel>
              </div>
              <PCNewsImageBlock count={6} type="guoji" width="400px" cartTitle="International Headline" imageWidth="112px"/>
            </div>
            <Tabs class="tabs_news">
            <TabPane tab="Headline" key="1">
              <PCNewsBlock count={22} type="top" width="100%" bordered="false"/>
            </TabPane>
            <TabPane tab="International" key="2">
              <PCNewsBlock count={22} type="guoji" width="100%" bordered="false"/>
            </TabPane>
            <TabPane tab="Sports" key="3">
              <PCNewsBlock count={22} type="tiyu" width="100%" bordered="false"/>
            </TabPane>
            <TabPane tab="Technology" key="4">
              <PCNewsBlock count={22} type="keji" width="100%" bordered="false"/>
            </TabPane>
            </Tabs>
              <Tabs class="tabs_product">
                  <TabPane tab="React News" key="1">
                    <PCProduct />
                  </TabPane>
              </Tabs>
            <div>
            <PCNewsImageBlock count={9} type="guonei" width="100%" cartTitle="China Headline" imageWidth="132px"/>
            <PCNewsImageBlock count={18} type="yule" width="100%" cartTitle="Entertainment News" imageWidth="132px"/>
            </div>
          </Col>
          <Col span = {2}></Col>
        </Row>
      </div>
    );
  }
}
