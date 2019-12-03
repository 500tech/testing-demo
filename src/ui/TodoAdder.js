import React, { Component } from 'react';
import styled from 'styled-components';
import { Flex, Box } from 'reflexbox/styled-components';
import { Input, Button } from './common';

const FormButton = styled(Button)`
  :disabled {
    visibility: hidden;
  }
`;

export class TodoAdder extends Component {
  state = {
    text: '',
  };

  shouldAutoClear() {
    return this.state.text.match(/clear/i);
  }

  onChangeText = e => {
    this.setState({ text: e.target.value }, () => {
      if (this.shouldAutoClear()) {
        this.setState({ text: '' });
      }
    });
  };

  canSubmit() {
    return this.state.text.length > 0;
  }

  onSubmit = e => {
    e.preventDefault();
    if (this.canSubmit()) {
      if (this.props.onAdd) {
        this.props.onAdd(this.state.text);
      }
      this.setState({ text: '' });
    }
  };

  render() {
    const { text } = this.state;
    return (
      <Flex onSubmit={this.onSubmit} as="form" width="100%">
        <Input autoFocus value={text} onChange={this.onChangeText} />
        <Box ml="10px">
          <FormButton disabled={!this.canSubmit()}>Add</FormButton>
        </Box>
      </Flex>
    );
  }
}
