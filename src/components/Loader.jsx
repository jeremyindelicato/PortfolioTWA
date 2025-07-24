import React from 'react';
import styled, { keyframes } from 'styled-components';
import '@fontsource/fira-code';

const Loader = () => {
  return (
    <Overlay>
      <DynamicBg />
      <CardWrapper>
        <CardContainer className="glass">
          <div className="terminal_toolbar">
            <div className="butt">
              <button className="btn btn-red" />
              <button className="btn btn-yellow" />
              <button className="btn btn-green" />
            </div>
            <p className="user">jeremyindelicato ~</p>
            <div className="add_tab">+</div>
          </div>
          <div className="terminal_body">
            <div className="terminal_promt">
              <span className="terminal_user">TaciturnWebArt:</span>
              <span className="terminal_location">~</span>
              <span className="terminal_bling">$ Bienvenue sur mon portfolio 👨‍💻</span>
              <span className="terminal_cursor" />
            </div>
          </div>
        </CardContainer>
      </CardWrapper>
    </Overlay>
  );
};

const dynamicBg = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DynamicBg = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;
  background: linear-gradient(270deg, #1a1a1a, #232526, #414345, #232526, #1a1a1a);
  background-size: 400% 400%;
  animation: ${dynamicBg} 6s ease-in-out infinite;
  opacity: 0.95;
`;

const CardWrapper = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CardContainer = styled.div`
  width: 280px;
  height: 260px;
  font-family: 'Fira Code', monospace;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(33, 33, 33, 0.75);
  .terminal_toolbar {
    display: flex;
    height: 30px;
    align-items: center;
    padding: 0 8px;
    box-sizing: border-box;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    background: linear-gradient(145deg, #2c2c2c, #1a1a1a);
    justify-content: space-between;
    box-shadow: inset 0 -1px 0 rgba(255, 255, 255, 0.05);
  }
  .butt {
    display: flex;
    align-items: center;
  }
  .btn {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;
    margin-right: 5px;
    font-size: 8px;
    height: 12px;
    width: 12px;
    box-sizing: border-box;
    border: none;
    border-radius: 100%;
    background: radial-gradient(circle at 30% 30%, #6c6c6c, #3b3b3b);
    text-shadow: 0px 1px 0px rgba(255, 255, 255, 0.2);
    box-shadow:
      0px 0px 1px 0px #41403a,
      0px 1px 1px 0px #474642;
    transition: transform 0.2s ease;
  }
  .btn-red {
    background: radial-gradient(circle at 30% 30%, #3C3C3D, #040F11);
  }
  .btn-yellow {
    background: radial-gradient(circle at 30% 30%, #FDFDFD, #1F1F1F);
  }
  .btn-green {
    background: radial-gradient(circle at 30% 30%, #3F8391, #13434D);
  }
  .btn:hover {
    cursor: pointer;
    transform: scale(1.1);
  }
  .btn:focus {
    outline: none;
  }
  .add_tab {
    border: 1px solid #fff;
    color: #fff;
    padding: 0 6px;
    border-radius: 4px 4px 0 0;
    border-bottom: none;
    cursor: pointer;
    background-color: rgba(255, 255, 255, 0.05);
    transition: background 0.2s;
  }
  .add_tab:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
  .user {
    color: #d5d0ce;
    margin-left: 6px;
    font-size: 14px;
    line-height: 15px;
  }
  .terminal_body {
    background: rgba(0, 0, 0, 0.4);
    height: calc(100% - 30px);
    padding-top: 8px;
    margin-top: -1px;
    font-size: 13px;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    border-top: 1px solid rgba(255, 255, 255, 0.05);
    line-height: 1.4;
  }
  .terminal_promt {
    display: flex;
    flex-wrap: wrap;
  }
  .terminal_promt span {
    margin-left: 4px;
  }
  .terminal_user {
    color: #3F8391;
    text-shadow: 0 0 4px #3F8391;
  }
  .terminal_location {
    color: #3d9df6;
    text-shadow: 0 0 4px #3d9df6;
  }
  .terminal_bling {
    color: #ffffff;
    text-shadow: 0 0 3px #ffffff;
  }
  .terminal_cursor {
    display: block;
    height: 14px;
    width: 5px;
    margin-left: 10px;
    background: #ffffff;
    animation: curbl 800ms steps(2) infinite;
    border-radius: 1px;
  }
  @keyframes curbl {
    0%, 49% { background: #ffffff; }
    60%, 99% { background: transparent; }
    100% { background: #ffffff; }
  }
`;

export default Loader; 