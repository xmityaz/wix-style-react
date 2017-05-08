import React from 'react';
import {Button} from 'wix-style-react/Backoffice';
import Input from '../../src/Input';
import {Container, Row, Col, Card} from '../../src/Grid';
import {FadeAnimation, ScaleAnimation} from '../../src/Animations';

class AnimatedExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {showComponents: true};
  }

  render() {
    return (
      <div style={{height: '250px'}}>
        <Container>
          <Row>
            <Col span="2">
              <ScaleAnimation>
                <Button onClick={() => this.setState({showComponents: !this.state.showComponents})}>{this.state.showComponents ? 'Animate out' : 'Animate in'}</Button>
              </ScaleAnimation>
            </Col>
          </Row>
          <Row>
            <Col span="3">
              <Card>
                <Card.Content>
                  <ScaleAnimation>
                    {
                      this.state.showComponents &&
                      (
                        <Row>
                          <Row>
                            <Button disabled>Scale animated button</Button>
                          </Row>
                          <Row>
                            <Input disabled placeholder="Scale animated input"/>
                          </Row>
                        </Row>
                      )
                    }
                  </ScaleAnimation>
                </Card.Content>
              </Card>
            </Col>
            <Col span="3">
              <Card>
                <Card.Content>
                  <FadeAnimation>
                    {
                      this.state.showComponents &&
                      (
                        <Row>
                          <Row>
                            <Button disabled>Fade animated input</Button>
                          </Row>
                          <Row>
                            <Input disabled placeholder="Fade animated input"/>
                          </Row>
                        </Row>
                      )
                    }
                  </FadeAnimation>
                </Card.Content>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default () =>
  <AnimatedExample/>
