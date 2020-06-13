import { shade } from 'polished';
import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  header {
    margin-top: 48px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    h1 {
      font-family: 'Titillium Web', sans-serif;
      font-weight: 600;
      font-size: 44px;
      color: var(--primary-color);
    }
    a {
      color: var(--title-color);
      font-weight: bold;
      text-decoration: none;
      display: flex;
      align-items: center;
      svg {
        margin-right: 16px;
        color: var(--primary-color);
      }
    }
  }
`;

export const Form = styled.form`
  margin: 80px auto;
  padding: 64px;
  width: 100%;
  max-width: 730px;
  background: #fff;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  h1 {
    font-size: 36px;
  }
  button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 260px;
    height: 56px;
    background: var(--primary-color);
    border: 0;
    border-radius: 8px;
    color: #fff;
    font-weight: bold;
    font-size: 16px;
    align-self: flex-end;
    margin-top: 40px;
    transition: background-color 0.2s;
    &:hover {
      background: ${shade(0.1, '#0abf53')};
    }
    svg {
      margin-right: 8px;
    }
  }
`;

export const FormFieldset = styled.fieldset`
  margin-top: 64px;
  min-inline-size: auto;
  border: 0;
  legend {
    width: 100%;
    div {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 32px;
      h2 {
        font-size: 24px;
      }
      span {
        font-size: 14px;
        font-weight: normal;
        color: var(--text-color);
      }
    }
  }
`;

export const FormField = styled.div`
  flex: 1;
  margin-bottom: 16px;
  &:last-child {
    margin-left: 24px;
  }
  label {
    flex: 1;
    font-size: 14px;
    display: flex;
    flex-direction: column;
    margin-bottom: 8px;
    input[type='text'],
    input[type='email'],
    input[type='number'] {
      flex: 1;
      background: #f0f0f5;
      border: 0;
      border-radius: 8px;
      padding: 16px 24px;
      font-size: 16px;
      color: #6c6c80;
      margin-top: 8px;
      &::placeholder {
        color: #a0a0b2;
      }
    }
    select {
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      flex: 1;
      background: #f0f0f5;
      border: 0;
      margin-top: 8px;
      border-radius: 8px;
      padding: 16px 24px;
      font-size: 16px;
      color: #6c6c80;
    }
  }
`;

export const FormFieldGroup = styled.div`
  flex: 1;
  display: flex;
`;

export const FormItemsGrid = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  li {
    background: #f5f5f5;
    border: 2px solid #f5f5f5;
    height: 180px;
    border-radius: 8px;
    padding: 32px 24px 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    text-align: center;
    cursor: pointer;
    img {
      width: 64px;
      height: 64px;
    }
    span {
      flex: 1;
      margin-top: 12px;
      display: flex;
      align-items: center;
      color: var(--title-color);
    }
    &.selected {
      background: #e1faec;
      border: 2px solid #34cb79;
    }
  }
`;
