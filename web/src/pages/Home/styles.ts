import homeBackground from 'assets/home-background.svg';
import { shade } from 'polished';
import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  padding: 0 30px;
  display: flex;
  align-items: stretch;
  background: #fff;
`;

export const Content = styled.div`
  max-width: 600px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  header {
    margin: 48px 0 0;
    h1 {
      font-family: 'Titillium Web', sans-serif;
      font-weight: 600;
      font-size: 64px;
      color: var(--primary-color);
    }
  }
  main {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    h1 {
      font-size: 54px;
      color: var(--title-color);
    }
    p {
      font-size: 24px;
      margin-top: 24px;
      line-height: 38px;
    }
    a {
      width: 100%;
      max-width: 360px;
      height: 72px;
      background: var(--primary-color);
      border-radius: 8px;
      text-decoration: none;
      display: flex;
      align-items: center;
      overflow: hidden;
      margin-top: 40px;
      span {
        display: block;
        background: rgba(0, 0, 0, 0.08);
        width: 72px;
        height: 72px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background-color 0.2s;
        svg {
          color: #fff;
          width: 20px;
          height: 20px;
        }
      }
      strong {
        flex: 1;
        text-align: center;
        color: #fff;
      }
      &:hover {
        background: ${shade(0.1, '#0abf53')};
      }
    }
  }
  @media (max-width: 900px) {
    align-items: center;
    text-align: center;
    header {
      margin: 48px auto 0;
    }
    main {
      align-items: center;
      h1 {
        font-size: 42px;
      }
      p {
        font-size: 24px;
      }
    }
  }
`;

export const Background = styled.div`
  flex: 1;
  background: url(${homeBackground}) no-repeat center;
  background-size: contain;
`;
