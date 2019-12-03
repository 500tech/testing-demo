import React from 'react';
import { ThemeProvider } from 'styled-components';
import { shallow, mount } from 'enzyme';
import { lightTheme } from '../../theme';
import { TodoAdder } from '.';

const render = instance =>
  mount(<ThemeProvider theme={lightTheme}>{instance}</ThemeProvider>);

describe('TodoAdder', () => {
  it('changes state when updated', () => {
    const wrapper = shallow(<TodoAdder />);
    wrapper.instance().onChangeText({
      target: {
        value: 'foo bar',
      },
    });
    const { text } = wrapper.instance().state;
    expect(text).toBe('foo bar');
  });

  it('clears text when typing "clear"', () => {
    const wrapper = shallow(<TodoAdder />);
    wrapper.instance().onChangeText({
      target: {
        value: 'foo bar',
      },
    });
    wrapper.instance().onChangeText({
      target: {
        value: 'foo bar clear',
      },
    });
    const { text } = wrapper.instance().state;
    expect(text).toBe('');
  });

  it('submitting calls add function', () => {
    const onAdd = jest.fn();
    const preventDefault = jest.fn();
    const wrapper = shallow(<TodoAdder onAdd={onAdd} />);
    wrapper.instance().onChangeText({
      target: {
        value: 'foo bar',
      },
    });
    const e = { preventDefault };
    wrapper.instance().onSubmit(e);
    expect(onAdd).toHaveBeenCalledWith('foo bar');
    expect(preventDefault).toHaveBeenCalled();
    expect(wrapper.instance().state.text).toBe('');
  });

  it('does not allow submitting when there is no text', () => {
    const onAdd = jest.fn();
    const wrapper = render(<TodoAdder onAdd={onAdd} />);
    wrapper.find('button').simulate('submit');
    expect(onAdd).not.toHaveBeenCalled();
    wrapper
      .find(TodoAdder)
      .instance()
      .onChangeText({
        target: {
          value: 'foo bar',
        },
      });
    wrapper.find('button').simulate('submit');
    expect(onAdd).toHaveBeenCalled();
  });

  it('autofocuses on input', () => {
    const wrapper = render(<TodoAdder />);
    const input = wrapper.find('input');
    expect(document.activeElement).toBe(input.getDOMNode());
  });
});
