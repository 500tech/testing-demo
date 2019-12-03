import React from 'react';
import styled from 'styled-components';
import { Flex, Box } from 'reflexbox/styled-components';
import { TodoList } from './TodoList';

const Page = styled(Flex).attrs({
  height: '100%',
  width: '100%',
  flexDirection: 'column',
  alignItems: 'center',
})`
  background-color: ${props => props.theme.palette.background};
  color: ${props => props.theme.palette.text};
  font-family: monospace;
`;

const Title = styled.h1`
  text-transform: uppercase;
  text-align: center;
`;

export function App() {
  return (
    <Page>
      <Box as="header" width="700px">
        <Title>Today's Tasks</Title>
        <hr />
      </Box>
      <Flex as="section" width="700px" flexDirection="column">
        <TodoList />
      </Flex>
    </Page>
  );
}

export default App;
