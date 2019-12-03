import React, { Component, useState, useEffect } from 'react';
import styled from 'styled-components';
import { Flex, Box } from 'reflexbox/styled-components';
import { Input, Button } from '../common';

const FormButton = styled(Button)`
  :disabled {
    visibility: hidden;
  }
`;

export function TodoAdder({ onAdd }) {
  const [text, setText] = useState('');
  useEffect(() => {
    if (text.match(/clear/i)) {
      setText('');
    }
  }, [text]);
  const onChangeText = e => setText(e.target.value);
  const canSubmit = text.length > 0;
  const onSubmit = e => {
    e.preventDefault();
    if (canSubmit) {
      if (onAdd) {
        onAdd(text);
      }
      setText('');
    }
  };
  return (
    <Flex onSubmit={onSubmit} as="form" width="100%">
      <Input autoFocus placeholder="Enter task" value={text} onChange={onChangeText} />
      <Box ml="10px">
        <FormButton disabled={!canSubmit}>Add</FormButton>
      </Box>
    </Flex>
  );
}

export class LegacyTodoAdder extends Component {
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
        <Input autoFocus placeholder="Enter task" value={text} onChange={this.onChangeText} />
        <Box ml="10px">
          <FormButton disabled={!this.canSubmit()}>Add</FormButton>
        </Box>
      </Flex>
    );
  }
}
