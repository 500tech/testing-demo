import styled from 'styled-components';

export const Input = styled.input`
  flex: 1;
  font-size: 20px;
  line-height: 1;
  padding: 10px;
  border-radius: 10px;
  border: none;
  box-shadow: inset ${props => props.theme.palette.shadow(2)};
  outline: none;

  :focus {
    box-shadow: 0 0 5px ${props => props.theme.palette.positive};
  }
`;

export const Button = styled.button`
  height: 43px;
  font-size: 20px;
  border-radius: 10px;
  outline: none;
  border: none;
  background-color: ${props => props.theme.palette.positive};
  color: white;
  cursor: pointer;

  :active {
    box-shadow: inset ${props => props.theme.palette.shadow(2)};
  }
`;
