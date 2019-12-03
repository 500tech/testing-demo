import React from 'react';
import { ThemeProvider } from 'styled-components';
import { render as _render, fireEvent } from '@testing-library/react';
import { lightTheme } from '../../theme';
import { TodoAdder } from '.';

const render = instance =>
  _render(<ThemeProvider theme={lightTheme}>{instance}</ThemeProvider>);

describe('TodoAdder', () => {
  it('changes state when updated', () => {
    const { queryByPlaceholderText } = render(<TodoAdder />);
    const input = queryByPlaceholderText(/enter/i);
    expect(input).not.toBeNull();
    expect(input).toHaveValue('');
    fireEvent.change(input, {
      target: {
        value: 'foo bar',
      },
    });
    expect(input).toHaveValue('foo bar');
  });

  it('clears text when typing "clear"', () => {
    const { getByPlaceholderText } = render(<TodoAdder />);
    const input = getByPlaceholderText(/enter/i);
    fireEvent.change(input, {
      target: {
        value: 'foo bar',
      },
    });
    fireEvent.change(input, {
      target: {
        value: 'foo barclear',
      },
    });
    expect(input).toHaveValue('');
  });

  it('submitting calls add function', () => {
    const onAdd = jest.fn();
    const { getByPlaceholderText } = render(<TodoAdder onAdd={onAdd} />);
    const input = getByPlaceholderText(/enter/i);
    fireEvent.change(input, {
      target: {
        value: 'foo bar',
      },
    });
    fireEvent.submit(input);
    expect(onAdd).toHaveBeenCalledWith('foo bar');
    expect(input).toHaveValue('');
  });

  it('does not allow submitting when there is no text', () => {
    const onAdd = jest.fn();
    const { getByPlaceholderText, getByText } = render(
      <TodoAdder onAdd={onAdd} />
    );
    const input = getByPlaceholderText(/enter/i);
    const btn = getByText(/add/i);
    expect(btn).not.toBeVisible();
    fireEvent.submit(btn);
    expect(onAdd).not.toHaveBeenCalled();

    fireEvent.change(input, {
      target: {
        value: 'foo bar',
      },
    });
    expect(btn).toBeVisible();
    fireEvent.submit(btn);
    expect(onAdd).toHaveBeenCalled();
  });

  it('autofocuses on input', () => {
    const { getByPlaceholderText } = render(<TodoAdder />);
    const input = getByPlaceholderText(/enter/i);
    expect(input).toHaveFocus();
  });
});
