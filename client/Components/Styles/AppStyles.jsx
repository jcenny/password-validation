import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
*:focus {
  outline: none;
}

body {
  font-family: 'Roboto', sans-serif;
  font-weight: 300;
}
`;
export {
  GlobalStyle,
}